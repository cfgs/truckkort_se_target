import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTruckutbildningar } from "@/lib/getTruckutbildningar";
import { GB, SE } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { Button } from "./ui/button";

export interface Course {
  available_seats: string;
  city: string;
  collectionId: string;
  collectionName: string;
  county: string;
  course_description: string;
  course_id: string;
  course_name: string;
  created: string;
  date_end: string;
  date_start: string;
  id: string;
  language: string;
  language_code: string;
  maximum_participants: string;
  price: string;
  provider: string;
  time: string;
  updated: string;
}

// Utility to normalize city names for comparison
function normalizeCityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o");
}

function groupByCityAndSort(courses: Course[]) {
  // Filter so course_name contains "truck" (case-insensitive)
  const filtered = courses.filter(
    (course) =>
      course.course_name.toLowerCase().includes("truck") &&
      Number(course.available_seats) > 0
  );

  // Sort by city (A-Ö), then by date_start (earliest first)
  const sorted = [...filtered].sort((a, b) => {
    const cityCompare = a.city.localeCompare(b.city, "sv");
    if (cityCompare !== 0) return cityCompare;
    return new Date(a.date_start).getTime() - new Date(b.date_start).getTime();
  });

  // Group by city
  const cityMap: Record<string, Course[]> = {};
  for (const course of sorted) {
    if (!cityMap[course.city]) cityMap[course.city] = [];
    cityMap[course.city].push(course);
  }
  return cityMap;
}

function formatDateSwedish(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("sv-SE", { month: "long" });
  const year = date.getFullYear();
  return { day, month, year };
}

function LanguageSpan({ language }: { language: string }) {
  if (language.toLowerCase() === "svenska") {
    return (
      <span className="inline-flex items-center gap-1">
        <SE title="Svenska" className="w-3 h-auto rounded-sm" />
        Svenska
      </span>
    );
  }
  if (language.toLowerCase() === "engelska") {
    return (
      <span className="inline-flex items-center gap-1">
        <GB title="English" className="w-3 h-auto rounded-sm" />
        Engelska
      </span>
    );
  }
  // fallback
  return <span>{language}</span>;
}

const educator = (course: Course) => {
  switch (course.provider.toLowerCase()) {
    case "truckutbildarna":
      return `https://www.truckutbildarna.se/?gad_source=1&gad_campaignid=2049549506&gbraid=0AAAAACty9YSzVM7HqrKRP46RxSd4KVZAO&gclid=Cj0KCQjwu7TCBhCYARIsAM_S3NiBDCnKH2umGpbQggprBBHVIYP-wZX60QtU3tTlpeByutNhrtbmDqUaAt7XEALw_wcB#boka`;
    default:
      return "";
  }
};

interface ForkliftCoursesProps {
  city?: string; // lowercase, å/ä = a, ö = o
}

export default async function ForkliftCourses({
  city,
}: ForkliftCoursesProps = {}) {
  const courses: Course[] = (await getTruckutbildningar()) as Course[];
  const cityMap = groupByCityAndSort(courses);

  // If city prop is provided, filter to only that city (normalize for comparison)
  let filteredEntries = Object.entries(cityMap);
  if (city) {
    // Special case for Stockholm: include multiple cities
    if (city === "stockholm") {
      const stockholmCities = ["stockholm", "hagersten", "jordbro"];
      filteredEntries = filteredEntries.filter(([cityName]) =>
        stockholmCities.includes(normalizeCityName(cityName))
      );
    }
    // Special case for Jönköping: include Jönköping and Taberg
    else if (city === "jonkoping") {
      const jonkopingCities = ["jonkoping", "taberg"];
      filteredEntries = filteredEntries.filter(([cityName]) =>
        jonkopingCities.includes(normalizeCityName(cityName))
      );
    } else {
      filteredEntries = filteredEntries.filter(([cityName]) => {
        return normalizeCityName(cityName) === city;
      });
    }
  }

  // Check if there are any courses to show
  const hasCourses =
    filteredEntries.filter(([, cityCourses]) => cityCourses.length > 0).length >
    0;

  return (
    <div id="lediga-kursdatum">
      {hasCourses ? (
        filteredEntries
          .filter(([, cityCourses]) => cityCourses.length > 0)
          .map(([city, cityCourses]) => (
            <div key={city} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{city}</h2>
              <ul className="grid gap-6 p-0 list-none md:grid-cols-3">
                {cityCourses.map((course) => {
                  const { day, month, year } = formatDateSwedish(
                    course.date_start
                  );
                  return (
                    <li key={course.id}>
                      <Card className="flex flex-col md:flex-row shadow-lg border border-orange-200 py-0! gap-0!">
                        {/* Date badge */}
                        <div className="flex flex-col items-center justify-center bg-orange-100 px-4 py-4 rounded-t-md md:rounded-l-md md:rounded-tr-none md:rounded-br-none min-w-[100px]">
                          <div className="md:flex flex-rows md:flex-col inline-block align-bottom">
                            <span className="md:text-center md:font-extrabold text-xl md:text-3xl text-orange-600 leading-tight">
                              {day}{" "}
                            </span>
                            <span className=" uppercase text-xl text-orange-700">
                              {month}
                            </span>
                          </div>
                          <span className="hidden md:block text-xs text-orange-500">
                            {year}
                          </span>
                          <span className="uppercase text-base text-orange-700">
                            {course.time}
                          </span>
                        </div>
                        {/* Main content */}
                        <div className="flex-1 flex flex-col justify-between p-4">
                          <div className="mb-2">
                            <CardHeader className="p-0! mb-2 gap-0!">
                              <CardTitle className="text-xl text-orange-900">
                                <h4>{course.course_name}</h4>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0!">
                              <div className="mb-2 text-gray-700 text-lg leading-5.5">
                                {course.course_description}
                              </div>
                              <div className="flex flex-wrap text-base text-gray-700">
                                <span>
                                  <strong>Pris:</strong>{" "}
                                  <span className="text-orange-700 font-semibold">
                                    {course.price} kr
                                  </span>
                                </span>
                              </div>
                            </CardContent>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-block bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">
                              {course.city}
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              <LanguageSpan language={course.language} />
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {course.available_seats} platser kvar
                            </span>
                          </div>
                          <Button asChild variant={"orange"}>
                            <Link
                              href={educator(course)}
                              target="_blank"
                              style={{ border: "none" }}
                            >
                              BOKA HÄR
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
      ) : (
        <div className="my-8 flex justify-center">
          <Card className="w-full border-orange-200 shadow-lg bg-orange-50">
            <CardHeader>
              <CardTitle>Inga planerade kurstillfällen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Just nu finns det inga planerade kurstillfällen.
              </p>
              <p>
                Vill du utbilda din personal på ditt företag? Kontakta oss så
                kan vi göra en specialanpassad utbildning för er.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

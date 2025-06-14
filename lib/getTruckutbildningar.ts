import PocketBase from "pocketbase";

// Byt ut till din Pocketbase-url om du kör remote
const pb = new PocketBase(process.env.POCKETBASE_URL);

/**
 * Hämtar alla truckutbildningar som skapats idag från Pocketbase
 */
export const getTruckutbildningar = async () => {
  // Hämta dagens datum i formatet YYYY-MM-DD
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // PocketBase använder ISO8601, så vi kan söka på created >= idag 00:00 och < imorgon 00:00
  const startOfDay = `${todayStr} 00:00:00`;
  const endOfDay = `${todayStr} 23:59:59`;

  // Hämtar alla poster i tabellen "truckutbildningar" skapade idag
  const records = await pb.collection("truckutbildningar").getFullList({
    filter: `updated >= "${startOfDay}" && updated <= "${endOfDay}"`,
    sort: "-updated",
  });

  // Returnera posterna (array av objekt)
  return records;
};

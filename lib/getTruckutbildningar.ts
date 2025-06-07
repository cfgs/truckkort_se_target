import PocketBase from "pocketbase";

// Byt ut till din Pocketbase-url om du kör remote
const pb = new PocketBase(process.env.POCKETBASE_URL);

/**
 * Hämtar alla truckutbildningar från Pocketbase
 */

export const getTruckutbildningar = async () => {
  // Hämtar alla poster i tabellen "truckutbildningar"
  const records = await pb.collection("truckutbildningar").getFullList({
    sort: "-created", // sortera nyaste först (valfritt)
  });

  // Returnera posterna (array av objekt)
  return records;
};

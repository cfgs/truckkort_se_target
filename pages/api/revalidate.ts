import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Revalidera startsidan och andra viktiga paths
    await res.revalidate("/");
    // Lägg till fler paths om du vill:
    // await res.revalidate('/din-andra-sida');
    return res.json({ revalidated: true });
  } catch (err: unknown) {
    return res.status(500).send(err);
  }
}

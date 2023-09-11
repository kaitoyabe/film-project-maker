import type { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.TMDB_BASE_URL ?? "";
const apiKey = process.env.TMDB_API_KEY ?? "";
const accessToken = process.env.TMDB_ACCESS_TOKEN ?? "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const subUrl = `&include_adult=true&language=${
    req.query.lang as string
  }&page=1?api_key=${apiKey}`;
  const query = req.query.title as string;

  const response = await fetch(
    `${baseUrl}/search/movie?query=${query}${subUrl}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  res.status(200).json(data);
};

export default handler;

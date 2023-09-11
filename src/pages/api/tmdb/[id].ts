import type { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.TMDB_BASE_URL ?? "";
const apiKey = process.env.TMDB_API_KEY ?? "";
const accessToken = process.env.TMDB_ACCESS_TOKEN ?? "";
const subUrl = `?language=ja-JP?api_key=${apiKey}`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const movieId = req.query.id as string;

  const response = await fetch(`${baseUrl}/movie/${movieId}${subUrl}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  res.status(200).json(data);
};

export default handler;

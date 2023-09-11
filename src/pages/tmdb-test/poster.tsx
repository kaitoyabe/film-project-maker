import { useEffect, useState } from "react";

import SearchMovieInput from "components/SearchMovieInput";
import { useTmdbInfo } from "hooks/tmdb/use-tmdb-info";
import { TmdbInfo } from "types/tmdb";

const Poster = () => {
  const imageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "";
  const { getTmdbInfo } = useTmdbInfo();

  const [movie, setMovie] = useState<TmdbInfo>();

  useEffect(() => {
    void (async () => {
      const { tmdbInfo } = await getTmdbInfo("155");
      setMovie(tmdbInfo);
    })();
  }, [getTmdbInfo]);

  console.log(movie);

  return (
    <main className="">
      <SearchMovieInput setMovie={setMovie} />
      <h4>{movie?.title}</h4>
      <img
        src={`${imageUrl}/original${movie?.poster_path ?? ""}`}
        width={100}
        alt=""
      />
      <p>{movie?.overview}</p>
    </main>
  );
};

export default Poster;

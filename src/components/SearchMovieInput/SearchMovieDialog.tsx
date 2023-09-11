import { Button, Grid } from "@mui/material";
import { Dispatch, FC, SetStateAction, memo, useCallback } from "react";

import CustomDialog from "components/common/dialog/CustomDialog";
import useTierList from "hooks/useTierList";
import { Types } from "types/TypesReducer";
import { TmdbInfo } from "types/tmdb";

import SearchMovieInput from ".";

const SearchMovieDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
  movie?: TmdbInfo;
  setMovie: Dispatch<SetStateAction<TmdbInfo | undefined>>;
}> = ({ isOpen, onClose, movie, setMovie }) => {
  const { dispatch } = useTierList();
  const imageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "";
  const onAddButtonClick = useCallback(() => {
    if (movie) {
      dispatch({
        type: Types.Add_To_Without_Tier,
        payload: {
          filmData: {
            id: movie.id,
            name: movie.title,
            image: `${imageUrl}/original${movie.poster_path}`,
          },
        },
      });
      onClose();
    }
  }, [dispatch, imageUrl, movie, onClose]);

  return (
    <CustomDialog
      open={isOpen}
      onClose={onClose}
      title="追加する映画タイトルを入力"
      maxWidth="md"
    >
      <Grid container>
        <Grid item container>
          <SearchMovieInput setMovie={setMovie} />
        </Grid>
        <Grid item>
          <img
            src={`${imageUrl}/original${movie?.poster_path ?? ""}`}
            width={100}
            alt=""
          />
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button onClick={onAddButtonClick} disabled={!movie}>
            決定
          </Button>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default memo(SearchMovieDialog);

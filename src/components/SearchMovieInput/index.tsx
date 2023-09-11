import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton } from "@mui/material";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import CustomAutocomplete from "components/common/form/CustomAutocomplete";
import { Language, useTmdbInfo } from "hooks/tmdb/use-tmdb-info";
import { FilmOptionType } from "types";
import { TmdbInfo } from "types/tmdb";
import { checkJapaneseChar } from "utils/checkJapaneseChar";

const SearchMovieInput: FC<{
  setMovie: Dispatch<SetStateAction<TmdbInfo | undefined>>;
}> = ({ setMovie }) => {
  const { searchTmdbInfo } = useTmdbInfo();

  const searchMovieForm = useForm<{
    movieTitle: string;
  }>();
  const [options, setOptions] = useState<readonly FilmOptionType[]>([]);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      searchMovieForm.handleSubmit(async (form) => {
        if (form.movieTitle) {
          const { tmdbInfos } = await searchTmdbInfo({
            title: form.movieTitle,
            lang: Language.JA,
          });

          setMovie(tmdbInfos[0]);
        } else {
          setMovie(undefined);
        }
      })(e),
    [searchMovieForm, searchTmdbInfo, setMovie]
  );

  const getOptionLabel = useCallback((option: FilmOptionType) => {
    if (typeof option === "string") {
      return option ?? "";
    }
    if (option.inputValue) {
      return option.inputValue ?? "";
    }

    return option.label;
  }, []);

  const onChangeValue = useCallback(
    async (
      _e: SyntheticEvent<Element, Event>,
      selectedOption: string | FilmOptionType | null
    ) => {
      if (selectedOption) {
        if (typeof selectedOption === "string") {
          const { tmdbInfos } = await searchTmdbInfo({
            title: selectedOption,
            lang: checkJapaneseChar(selectedOption) ? Language.JA : Language.EN,
          });
          setOptions(
            tmdbInfos.map((item) => ({
              value: item.original_title,
              label: item.title,
            }))
          );
          searchMovieForm.setValue("movieTitle", selectedOption);
        } else if (typeof selectedOption === "object") {
          const { tmdbInfos } = await searchTmdbInfo({
            title: selectedOption.value as string,
            lang: checkJapaneseChar(selectedOption.value as string)
              ? Language.JA
              : Language.EN,
          });
          setOptions(
            tmdbInfos.map((item) => ({
              value: item.original_title,
              label: item.title,
            }))
          );
          searchMovieForm.setValue(
            "movieTitle",
            selectedOption.value as string
          );
        }
      }
    },
    [searchMovieForm, searchTmdbInfo]
  );

  return (
    <Grid item xs={12}>
      <form onSubmit={onSubmit} noValidate>
        <Grid item container>
          <Grid item xs={11}>
            <CustomAutocomplete
              label="映画タイトル"
              name="movieTitle"
              control={searchMovieForm.control}
              options={options}
              onChange={onChangeValue}
              onInputChange={onChangeValue}
              getOptionLabel={getOptionLabel}
              required
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default SearchMovieInput;

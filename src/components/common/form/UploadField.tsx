import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent, FC, SetStateAction, useCallback } from "react";

type UploadFieldProps = TextFieldProps & {
  setSelectedFile: (value: SetStateAction<File | undefined>) => void;
  selectedFile: File | undefined;
  setSelectedSecondFile?: (value: SetStateAction<File | undefined>) => void;
  selectedSecondFile?: File | undefined;
  label: string;
  secondLabel?: string;
  isDisabled?: boolean;
};
const UploadField: FC<UploadFieldProps> = (props) => {
  const { setSelectedFile, selectedFile, label, isDisabled, ...other } = props;

  const selectCsv = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files !== null) {
        const file = e.currentTarget.files[0];
        if (file) {
          if (file.type === "text/csv") {
            setSelectedFile(file);
            e.target.value = "";
          }
        }
      }
    },
    [setSelectedFile]
  );

  return (
    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={9}>
          <TextField
            autoFocus
            disabled
            size="medium"
            value={selectedFile ? selectedFile.name : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {selectedFile && (
                    <IconButton onClick={() => setSelectedFile(undefined)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            label={label}
            {...other}
          />
        </Grid>
        <Grid item xs alignSelf="center">
          <Button
            variant="contained"
            component="label"
            disabled={!!selectedFile || isDisabled}
          >
            ファイル選択
            <input type="file" accept="text/csv" hidden onChange={selectCsv} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default UploadField;

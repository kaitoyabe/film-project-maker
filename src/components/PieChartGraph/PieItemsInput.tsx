import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import { FC, memo } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";

import CustomNumberFormat from "components/common/form/CustomNumberFormat";
import CustomTextField from "components/common/form/CustomTextField";
import { PieChartFormType } from "types/PieChart";

const PieItemsInput: FC<{
  fields: FieldArrayWithId<PieChartFormType, "pieItems", "id">[];
  pieChartForm: UseFormReturn<PieChartFormType>;
  append: UseFieldArrayAppend<PieChartFormType, "pieItems">;
  remove: UseFieldArrayRemove;
}> = ({ fields, pieChartForm, append, remove }) => (
  <Grid item container>
    <Grid
      item
      container
      xs
      sx={{
        marginTop: "0px",
      }}
    >
      {fields?.map((field, i) => (
        <Grid item container xs={12} rowSpacing={2} key={field.id}>
          <Grid item xs={6}>
            <CustomTextField
              name={`pieItems.${i}.name`}
              control={pieChartForm.control}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomNumberFormat
              name={`pieItems.${i}.value`}
              control={pieChartForm.control}
              inputProps={{
                maxLength: 3,
                inputMode: "numeric",
              }}
              allowNegative={false}
              thousandSeparator={false}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {i > 0 && i === fields.length - 1 && (
                      <IconButton onClick={() => remove(fields.length - 1)}>
                        <RemoveCircleOutlineIcon fontSize="small" />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item container>
        <Grid item xs="auto">
          <IconButton
            onClick={() =>
              append({
                name: "",
                value: 0,
              })
            }
          >
            <AddCircleOutlineIcon color="primary" fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default memo(PieItemsInput);

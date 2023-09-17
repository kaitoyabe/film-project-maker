import { Grid, Typography } from "@mui/material";
import { FC, memo } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";

import { PieChartFormType } from "types/PieChart";

import PieItemsInput from "./PieItemsInput";

const PieItemForm: FC<{
  pieChartForm: UseFormReturn<PieChartFormType>;
  fields: FieldArrayWithId<PieChartFormType, "pieItems", "id">[];
  append: UseFieldArrayAppend<PieChartFormType, "pieItems">;
  remove: UseFieldArrayRemove;
}> = ({ pieChartForm, fields, append, remove }) => (
  <Grid
    container
    sx={{
      color: "white",
    }}
  >
    <Grid item>
      <Grid item container>
        <Grid item>
          <Typography variant="h5">アイテム入力</Typography>
        </Grid>
      </Grid>
      <PieItemsInput
        pieChartForm={pieChartForm}
        fields={fields}
        append={append}
        remove={remove}
      />
    </Grid>
  </Grid>
);

export default memo(PieItemForm);

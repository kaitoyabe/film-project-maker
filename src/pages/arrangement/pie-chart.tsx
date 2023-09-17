import { FC, memo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import PieChart from "components/PieChartGraph";
import Layout from "components/common/Layout";
import { PieChartFormType } from "types/PieChart";
import { TmdbInfo } from "types/tmdb";

const PieChartPage: FC = () => {
  const [movie, setMovie] = useState<TmdbInfo>();
  const pieChartForm = useForm<PieChartFormType>({
    mode: "onSubmit",
    defaultValues: {
      pieItems: [
        {
          name: "",
          value: 0,
        },
      ],
    },
  });
  const fieldArray = useFieldArray;
  const { fields, append, remove } = fieldArray({
    control: pieChartForm.control,
    name: "pieItems",
  });
  console.log(fields);

  return (
    <Layout title="円グラフ">
      <PieChart
        movie={movie}
        setMovie={setMovie}
        pieChartForm={pieChartForm}
        fields={fields}
        append={append}
        remove={remove}
      />
    </Layout>
  );
};
export default memo(PieChartPage);

import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import {
  PieChart,
  Pie,
  Cell,
  Text,
  PieLabelRenderProps,
  ResponsiveContainer,
} from "recharts";

import SearchMovieDialog from "components/SearchMovieInput/SearchMovieDialog";
import ShareX from "components/ShareX";
import { CustomContainer } from "components/common/CustomContainer";
import { IPieItem, PieChartFormType } from "types/PieChart";
import { TmdbInfo } from "types/tmdb";

import PieItemForm from "./PieItemForm";

const PieChartGraph: FC<{
  movie: TmdbInfo | undefined;
  setMovie: Dispatch<SetStateAction<TmdbInfo | undefined>>;
  pieChartForm: UseFormReturn<PieChartFormType>;
  fields: FieldArrayWithId<PieChartFormType, "pieItems", "id">[];
  append: UseFieldArrayAppend<PieChartFormType, "pieItems">;
  remove: UseFieldArrayRemove;
}> = ({ movie, setMovie, pieChartForm, fields, append, remove }) => {
  const imageUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "";

  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const [pieItems, setPieItems] = useState<IPieItem[]>([
    {
      name: "アイテム1",
      value: 50,
    },
    {
      name: "アイテム2",
      value: 50,
    },
  ]);

  const label = ({ name, value, cx, x, y, index }: PieLabelRenderProps) => {
    const cxAsNumber = cx as number;
    const textAnchor = x > cxAsNumber ? "start" : "end";

    return (
      <>
        <Text
          x={x}
          y={y - 3}
          dominantBaseline="auto"
          textAnchor={textAnchor}
          fill={COLORS[(index as number) % COLORS.length]}
        >
          {name}
        </Text>
        <Text
          x={x}
          y={y + 3}
          dominantBaseline="hanging"
          textAnchor={textAnchor}
          fill={COLORS[(index as number) % COLORS.length]}
        >
          {`${value as number}％`}
        </Text>
      </>
    );
  };

  const onCreateClick = useCallback(() => {
    setPieItems(pieChartForm.watch().pieItems);
  }, [pieChartForm]);

  const onChangeTitleClick = useCallback(() => {
    setIsOpenAddDialog(true);
  }, []);

  useEffect(() => {
    if (!movie) {
      onChangeTitleClick();
    }
  }, [movie, onChangeTitleClick]);

  return (
    <CustomContainer
      id="PieChartContainer"
      customStyle={{
        marginTop: "32px",
        h1: {
          fontSize: "2.8rem",
          fontWeight: "700",
        },
        hr: {
          margin: "24px auto",
          borderColor: "#2e2e2e",
          width: "98%",
        },
      }}
    >
      <Grid container>
        <Grid item>
          <Typography variant="h1">{movie?.title}</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={onChangeTitleClick}
            variant="outlined"
            startIcon={<EditIcon />}
          >
            変更
          </Button>
        </Grid>
      </Grid>

      <Box
        id="PieChartDiv"
        component="div"
        sx={{
          marginTop: "16px",
          borderRadius: "4px",
          backgroundColor: "#2e2e2e",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          border: "0 solid #404040",
          borderWidth: "0 0 2px 2px",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "35%",
            },
          }}
        >
          <PieItemForm
            pieChartForm={pieChartForm}
            fields={fields}
            append={append}
            remove={remove}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onCreateClick}>作成</Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "50%",
            },
            position: "relative",
          }}
        >
          <img
            className="img-center"
            src={`${imageUrl}/original${movie?.poster_path ?? ""}`}
            width={140}
            alt=""
          />
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={650} height={350}>
              <Pie
                data={pieItems}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={120}
                outerRadius={140}
                fill="#8884d8"
                labelLine
                label={label}
                startAngle={90}
                endAngle={-270}
              >
                {pieItems.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <ShareX />
      {isOpenAddDialog && (
        <SearchMovieDialog
          isOpen={isOpenAddDialog}
          onClose={() => setIsOpenAddDialog(false)}
          movie={movie}
          setMovie={setMovie}
        />
      )}
    </CustomContainer>
  );
};

export default memo(PieChartGraph);

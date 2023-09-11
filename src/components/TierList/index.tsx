/* eslint-disable no-param-reassign */
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import type { Identifier } from "dnd-core";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";

import FilmItems from "components/FilmItems";
import ItemToDrag from "components/ItemToDrag";
import SearchMovieDialog from "components/SearchMovieInput/SearchMovieDialog";
import ShareX from "components/ShareX";
import { CustomContainer } from "components/common/CustomContainer";
import useTierList from "hooks/useTierList";
import IItemToDrag from "types/ItemToDrag";
import { Types } from "types/TypesReducer";
import { TmdbInfo } from "types/tmdb";

const TierList: React.FC = () => {
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [movie, setMovie] = useState<TmdbInfo>();

  const { tierListData, dispatch } = useTierList();
  const [{ handlerId, didDrop }, drop] = useDrop<
    IItemToDrag,
    void,
    { handlerId: Identifier | null; didDrop: boolean }
  >({
    accept: "ITEM_IN_TIER",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      didDrop: monitor.isOver(),
    }),

    drop: (item) => {
      if (!item.indexList) return;

      dispatch({
        type: Types.Move_To_Without_Tier,
        payload: {
          indexFrom: item.index,
          indexFromList: item.indexList,
        },
      });

      item.indexList = null;
      item.type = "WITHOUT_ITEM";
      item.index = tierListData.withoutTiers.length;
    },
  });

  const onAddClick = useCallback(() => {
    setIsOpenAddDialog(true);
  }, []);

  return (
    <CustomContainer
      id="TierListContainer"
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
      <Typography variant="h1">{tierListData.title}</Typography>

      <Box
        id="TierListUl"
        component="ul"
        sx={{
          marginTop: "16px",
          borderRadius: "4px",
          backgroundColor: "#2e2e2e",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          border: "0 solid #404040",
          borderWidth: "0 0 2px 2px",
        }}
      >
        {tierListData.tiers.map((tier, index) => (
          <FilmItems key={tier.id} {...tier} index={index} />
        ))}
      </Box>

      <hr />

      <Box
        id="TierListDiv"
        component="div"
        ref={drop}
        data-handler-id={handlerId}
        sx={{
          border: "1px solid #2e2e2e",
          background: didDrop ? `#2e2e2e` : `transparent`,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "8px",
          borderRadius: "4px",
          minHeight: "78px",
          marginBottom: "30px",
          transition: "background 200ms ease",
        }}
      >
        {tierListData.withoutTiers.map((item, index: number) => (
          <ItemToDrag
            key={item.id}
            {...item}
            indexList={null}
            index={index}
            type="WITHOUT_ITEM"
          />
        ))}
        <Button variant="outlined" onClick={onAddClick} startIcon={<AddIcon />}>
          追加
        </Button>
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

export default TierList;

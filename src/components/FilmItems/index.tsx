/* eslint-disable no-param-reassign */
import { Box, List, ListItem } from "@mui/material";
import type { Identifier } from "dnd-core";
import React from "react";
import { useDrop } from "react-dnd";

import ItemToDrag from "components/ItemToDrag";
import useTierList from "hooks/useTierList";
import IItemToDrag from "types/ItemToDrag";
import { IList } from "types/TierItem";
import { Types } from "types/TypesReducer";
import colorContrast from "utils/colorContrast";

interface IProps extends IList {
  index: number;
}

const FilmItems: React.FC<IProps> = ({ color, items, name, index }) => {
  const { dispatch } = useTierList();

  const [{ handlerId, didDrop }, drop] = useDrop<
    IItemToDrag,
    void,
    { handlerId: Identifier | null; didDrop: boolean }
  >({
    accept: ["ITEM_IN_TIER", "WITHOUT_ITEM"],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      didDrop: monitor.isOver(),
    }),

    drop: (item) => {
      if (item.type === "WITHOUT_ITEM") {
        dispatch({
          type: Types.Move_Without_Tier,
          payload: { indexFrom: item.index, indexTo: index },
        });

        item.type = "ITEM_IN_TIER";
        item.index = items.length;
        item.indexList = index;
      }
    },

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    hover(item: IItemToDrag) {
      if (item.type !== "ITEM_IN_TIER" || item.indexList === null) return;
      if (item.indexList === index) return;

      dispatch({
        type: Types.Move_Item_In_Tier,
        payload: {
          indexFrom: item.index,
          indexFromList: item.indexList,
          indexTo: index,
        },
      });

      item.indexList = index;
      item.index = items.length;
    },
  });

  return (
    <List
      id="FilmItemsList"
      sx={{
        display: "grid",
        gridTemplateColumns: "70px 1fr 60px",
        minHeight: "70px",
        border: "0 solid #404040",
        borderWidth: "2px 2px 0 0",
        padding: 0,
        "&:first-child": {
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          span: {
            borderTopLeftRadius: "4px",
          },
        },
        "&:last-child": {
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          span: {
            borderBottomLeftRadius: "4px",
          },
        },
      }}
    >
      <Box
        component="span"
        bgcolor={color}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="1.6rem"
        borderRight="2px solid #404040"
        padding="8px"
        sx={{
          cursor: "text",
          color: colorContrast(color) ? "#0E0E0E" : "#F7F7F7",
          wordBreak: "break-all",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Box>
      <ListItem
        ref={drop}
        data-handler-id={handlerId}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexWrap: "wrap",
          gap: "10px",
          padding: "4px 8px",
          transition: "background-color 150ms ease",
          backgroundColor: didDrop ? "#1A1A1A" : "transparent",
        }}
      >
        {items.map((item, indexItem: number) => (
          <ItemToDrag
            key={item.id}
            {...item}
            indexList={index}
            index={indexItem}
            type="ITEM_IN_TIER"
          />
        ))}
      </ListItem>
    </List>
  );
};

export default FilmItems;

/* eslint-disable no-param-reassign */
import { Box } from "@mui/material";
import type { Identifier } from "dnd-core";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { CSSTransition } from "react-transition-group";

import useTierList from "hooks/useTierList";
import IItemToDrag from "types/ItemToDrag";
import { ITierItem } from "types/TierItem";
import { Types } from "types/TypesReducer";

interface IProps extends ITierItem {
  index: number;
  indexList: number | null;
  type: "ITEM_IN_TIER" | "WITHOUT_ITEM";
}

const ItemToDrag: React.FC<IProps> = ({
  id,
  image,
  name,
  index,
  indexList,
  type,
}) => {
  const initialIndex = index;
  const initialIndexList = indexList;

  const dropRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer>();
  const [tooltipItem, setTooltipItem] = useState(false);
  const { dispatch } = useTierList();

  const handleMouseEnter = () => {
    intervalRef.current = setTimeout(() => {
      setTooltipItem(true);
    }, 350);
  };

  const handleMouseLeave = () => {
    if (!intervalRef.current) return;

    clearInterval(Number(intervalRef.current));
    setTooltipItem(false);
  };

  const [{ monitorDrag, isDragging }, drag] = useDrag({
    type,
    item: () => ({
      index,
      name,
      type,
      indexList,
      id,
      initial: {
        index: initialIndex,
        indexList: initialIndexList,
      },
    }),
    collect: (monitor) => ({
      monitorDrag: monitor.getItem(),
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => monitor.getItem<{ id: string }>()?.id === id,

    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        // move to initial position
        dispatch({
          type: Types.Move_TierItem_To_OtherTier,
          payload: {
            indexFrom: item.index,
            indexFromList: item.indexList,
            indexTo: item.initial.index,
            indexToList: item.initial.indexList,
          },
        });
      }
    },
  });

  const [{ handlerId }, drop] = useDrop<
    IItemToDrag,
    void,
    { handlerId: Identifier | null }
  >({
    accept: type,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    hover(item, monitor) {
      if (!dropRef.current) return;

      const dragIndex = item.index;
      const dragIndexList = item.indexList;
      const hoverIndex = index;
      const hoverIndexList = indexList;

      if (dragIndexList === hoverIndexList && dragIndex === hoverIndex) return;

      const { x: itemDragX } = monitor.getClientOffset() as XYCoord;
      const itemHover = {
        x: dropRef.current.offsetLeft,
        y: dropRef.current.offsetTop,
      };
      const middleItemHover = dropRef.current.offsetWidth / 2 + itemHover.x;

      if (itemDragX < middleItemHover && dragIndex < hoverIndex) return;
      if (itemDragX > middleItemHover && dragIndex > hoverIndex) return;

      dispatch({
        type: Types.Move_TierItem_To_OtherTier,
        payload: {
          indexFrom: dragIndex,
          indexFromList: dragIndexList,
          indexTo: hoverIndex,
          indexToList: hoverIndexList,
        },
      });

      item.index = hoverIndex;
      item.indexList = hoverIndexList;
    },
  });

  useEffect(() => {
    if (!isDragging) return;

    setTooltipItem(false);
    if (intervalRef.current) clearInterval(Number(intervalRef.current));

    // eslint-disable-next-line consistent-return
    return () => {
      if (intervalRef.current) clearInterval(Number(intervalRef.current));
    };
  }, [isDragging]);

  // clear interval when unmount
  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(Number(intervalRef.current));
    },
    []
  );

  drop(dropRef);

  return (
    <Box
      component="div"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropRef}
      data-handler-id={handlerId}
      sx={{
        position: "relative",
        background: "#0e0e0e",
        borderRadius: "4px",
        transition: "opacity 250ms ease, filter 250ms ease",
        opacity: isDragging ? 0.5 : undefined,
        boxShadow: isDragging ? "0px 0px 5px rgba(0, 0, 0, 0.5)" : undefined,
        pointerEvents: isDragging ? "none" : undefined,
      }}
    >
      <Box
        component="div"
        ref={drag}
        sx={{
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          overflow: "hidden",
          img: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <img src={image} alt={name} />
      </Box>

      <CSSTransition
        in={tooltipItem && !isDragging && !monitorDrag}
        classNames="tooltip"
        unmountOnExit
        nodeRef={tooltipRef}
        timeout={350}
      >
        <Box
          component="div"
          ref={tooltipRef}
          sx={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2e2e2e",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "4px 8px",
            minWidth: "50px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            boxShadow: "0 0px 8px -2px rgba(0, 0, 0, 0.5)",
            fontSize: "1.0rem",
            color: "#dedede",
            border: "1px solid #0e0e0e",
            "&::after": {
              content: `""`,
              display: "block",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",

              borderTop: "10px solid #2e2e2e",
              position: "absolute",
              bottom: "-10px",
            },

            "&.tooltip-enter": {
              opacity: 0,
              transform: "translate(-50%, 10px)",
            },
            "&.tooltip-enter-active": {
              opacity: "initial",
              transform: "translate(-50%, 0)",
              transition: "opacity 350ms, transform 350ms",
              transitionTimingFunction: "ease",
            },

            // exit animation
            "&.tooltip-exit": {
              opacity: 1,
            },
            "&.tooltip-exit-active": {
              opacity: 0,
              transform: "translate(-50%, 5px)",
              transition: "opacity 350ms, transform 350ms",
              transitionTimingFunction: "ease-in-out",
            },
          }}
        >
          {name}
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default ItemToDrag;

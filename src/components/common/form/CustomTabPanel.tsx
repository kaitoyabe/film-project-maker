import { Box } from "@mui/material";
import { FC, memo, ReactNode } from "react";

type CustomTabPanelProps = {
  children?: ReactNode;
  value: number;
  index: number;
  isFullHeight?: boolean;
  pt?: number;
};

const CustomTabPanel: FC<CustomTabPanelProps> = (props) => {
  const { children, value, index, isFullHeight, pt } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      style={{ ...(isFullHeight && { height: "100%" }) }}
    >
      {value === index && (
        <Box pt={pt || 3} sx={{ ...(isFullHeight && { height: "100%" }) }}>
          {children}
        </Box>
      )}
    </div>
  );
};
export default memo(CustomTabPanel);

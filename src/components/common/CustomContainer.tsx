import { Container, SxProps, Theme } from "@mui/material";
import { FC, ReactNode } from "react";

export const CustomContainer: FC<{
  children: ReactNode;
  customStyle?: SxProps<Theme>;
  id?: string;
}> = ({ children, customStyle, id }) => (
  <Container
    maxWidth="xl"
    sx={{
      ...customStyle,
      paddingX: "20px",
      marginX: "auto",
    }}
    id={id}
  >
    {children}
  </Container>
);

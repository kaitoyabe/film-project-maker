import { Typography } from "@mui/material";
import Link from "next/link";
import React, { memo } from "react";

import { CustomContainer } from "components/common/CustomContainer";

const Header: React.FC = () => (
  <header className="">
    <CustomContainer
      customStyle={{
        backgroundColor: "#0e0e0e",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography
        variant="h1"
        fontSize="2.2rem"
        fontWeight="bold"
        color="#EDEDED"
        marginLeft="25%"
      >
        <Link href="/">FILLOOM</Link>
      </Typography>
      <Typography
        variant="h5"
        fontSize="1.0rem"
        fontWeight="bold"
        color="#EDEDED"
      >
        <Link href="/arrangement/tier-list">ティアーを作成</Link>
      </Typography>
      <Typography
        variant="h5"
        fontSize="1.0rem"
        fontWeight="bold"
        color="#EDEDED"
      >
        <Link href="/arrangement/pie-chart">円グラフを作成</Link>
      </Typography>
    </CustomContainer>
  </header>
);

export default memo(Header);

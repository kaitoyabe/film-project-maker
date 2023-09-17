import { Typography } from "@mui/material";
import Link from "next/link";

import styles from "styles/Footer.module.css";

const Footer = () => (
  <Typography component="footer" className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.column}>
        <Typography variant="subtitle1" className={styles.heading}>
          Filloomトップ
        </Typography>
        <Link href="#">
          <Typography variant="body1" className={styles.link}>
            ティアーを作成
          </Typography>
        </Link>
        <Link href="#">
          <Typography variant="body1" className={styles.link}>
            円グラフを作成
          </Typography>
        </Link>
        <Link href="#">
          <Typography variant="body1" className={styles.link}>
            ボードを作成
          </Typography>
        </Link>
      </div>
      <div className={styles.column}>
        <Typography variant="subtitle1" className={styles.heading}>
          Filloomについて
        </Typography>
        <Typography variant="body1" className={styles.link} />
      </div>
    </div>
    <div className={styles.copy}>
      <Typography variant="body2" className={styles.copyText}>
        © 2023 by Filloom
      </Typography>
    </div>
  </Typography>
);

export default Footer;

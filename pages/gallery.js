import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/gallery.module.css";

import { VintageTV } from "../components/tv/VintageTV";
import { galleryDriveImages } from "../components/Gallery/galleryDriveImages";

export default function GalleryPage() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFadeOut(scrollPosition > window.innerHeight / 9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Anwesha 2024 Glimpse</title>
      </Head>
      <div className="text-red-500 text-6xl font-bold">TAILWIND OK</div>

      <div className={styles.container}>
        {/* Fullscreen Text with Fading Effect */}
        <div
          className={`${styles.fullscreenText} ${fadeOut ? styles.fadeOut : ""}`}
        >
          <div className={styles.glimpse}>GLIMPSE</div>
          <div className={styles.anwesha}>
            <span className={styles.anweshaA}>A</span>
            NWESHA
            <span className={styles.anwesha24}>&apos;24</span>
          </div>
        </div>

        {/* ✅ TV ONLY (Drive Images from file) */}
        <div className={styles.tvWrapper}>
          <VintageTV images={galleryDriveImages} />
        </div>
      </div>
    </>
  );
}

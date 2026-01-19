import style from "./Gallery.module.css";
import { useInView } from "react-intersection-observer";

import { VintageTV } from "../tv/VintageTV";
import { galleryDriveImages } from "./galleryDriveImages";

const Gallery = (props) => {
  const { ref: h1ref } = useInView();
  const { ref: pref } = useInView();

  return (
    <div className={style.gallery}>
      <h1 ref={h1ref}>{props.eventName}</h1>
      <p ref={pref}>{props.desc}</p>

      {/* ✅ REPLACED IMAGE GRID WITH TV */}
      <div className={style.tvContainer}>
        <VintageTV images={galleryDriveImages} />
      </div>
    </div>
  );
};

export default Gallery;

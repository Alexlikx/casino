import React from "react";
import slide1 from "../../public/slide1.jpg";
import slide2Part1 from "../../public/slide2-1.jpg";
import styles from "../../styles/Hero.module.scss";
import slide2Part2 from "../../public/slide2-2.png";
import slide4Part2 from "../../public/slide4-2.png";
import slide4Part1 from "../../public/slide4-1.jpg";
import slide3Part1 from "../../public/slide3-1.jpg";
import slide3Part2 from "../../public/slide3-2.png";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

const Hero = () => {
  return (
    <Swiper
      // install Swiper modules
      spaceBetween={0}
      scrollbar={{ draggable: true }}
      Autoplay
    >
      <SwiperSlide className={styles.slide}>
        <Image src={slide1} alt="" className={styles.firstImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <Image src={slide2Part1} alt="" className={styles.firstImage} />
        <Image src={slide2Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <Image src={slide3Part1} alt="" className={styles.firstImage} />
        <Image src={slide3Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <Image src={slide4Part1} alt="" className={styles.firstImage} />
        <Image src={slide4Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;

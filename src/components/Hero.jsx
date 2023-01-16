import React, { useRef } from "react";
import slide1 from "../../public/slide1.jpg";
import slide1Part2 from "../../public/slide1-2.png";
import slide2Part1 from "../../public/slide2-1.jpg";
import styles from "../../styles/Hero.module.scss";
import slide2Part2 from "../../public/slide2-2.png";
import slide4Part2 from "../../public/slide4-2.png";
import slide4Part1 from "../../public/slide4-1.jpg";
import slide3Part1 from "../../public/slide3-1.jpg";
import slide3Part2 from "../../public/slide3-2.png";
import arrow from "../../public/arrow.svg";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Navigation } from "swiper";
import Link from "next/link";

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Swiper
      modules={[Navigation]}
      // install Swiper modules
      spaceBetween={0}
      scrollbar={{ draggable: true }}
      Autoplay
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      loop={true}
    >
      <div ref={prevRef} className={styles.slider__btn}>
        <Image src={arrow} alt="" />
      </div>
      <div ref={nextRef} className={styles.slider__btn_next}>
        <Image src={arrow} alt="" />
      </div>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>Welcome pack</h2>
          <h3 className={styles.slider__h3}>325%+150FS</h3>
          <h3 className={styles.slider__h3}>Cleopatra or Fruit Party</h3>
          <Link href="/registration" className={styles.registration__btn}>
            РЕГИСТРАЦИЯ
          </Link>
        </div>
        <Image src={slide1} alt="" className={styles.firstImage} />
        <Image src={slide1Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>Кешбэк до 10%</h2>
          <h3 className={styles.slider__h3}>Каждый понедельник</h3>
          <Link href="/registration" className={styles.registration__btn}>
            РЕГИСТРАЦИЯ
          </Link>
        </div>
        <Image src={slide2Part1} alt="" className={styles.firstImage} />
        <Image src={slide2Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>Бонус Четверга</h2>
          <h3 className={styles.slider__h3}>FS-20,80,200 VIP</h3>
          <h3 className={styles.slider__h3}>От 4-го депозита</h3>
          <Link href="/registration" className={styles.registration__btn}>
            РЕГИСТРАЦИЯ
          </Link>
        </div>
        <Image src={slide3Part1} alt="" className={styles.firstImage} />
        <Image src={slide3Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>Уникальный Пре-Релиз</h2>
          <h3 className={styles.slider__h3}>Game of Gladiators</h3>
          <Link href="/registration" className={styles.registration__btn}>
            РЕГИСТРАЦИЯ
          </Link>
        </div>
        <Image src={slide4Part1} alt="" className={styles.firstImage} />
        <Image src={slide4Part2} alt="" className={styles.secondImage__past} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;

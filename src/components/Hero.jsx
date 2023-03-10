import React, { useRef } from "react";
import slide1 from "../../public/slide1.jpg";
import slide1Part2 from "../../public/slide1-2.png";
import slide2Part1 from "../../public/slide2-1.jpg";
import styles from "../../styles/Hero.module.scss";
import slide2Part2 from "../../public/slide2-2.png";
import slide4Part2 from "../../public/slide4-2.png";
import slide4Part1 from "../../public/slide4-1.jpg";
import slide3Part1 from "../../public/slide3-1.jpg";
import { useSession } from "next-auth/react";
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
  const { status } = useSession();

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}
      threshold={true}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
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
          {status == "unauthenticated" ? (
            <Link href="/registration" className={styles.registration__btn}>
              ??????????????????????
            </Link>
          ) : (
            <Link href="/deposit" className={styles.registration__btn}>
              ??????????????????
            </Link>
          )}
        </div>
        <Image src={slide1} alt="" className={styles.firstImage} />
        <Image src={slide1Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>???????????? ???? 10%</h2>
          <h3 className={styles.slider__h3}>???????????? ??????????????????????</h3>
          <h3 className={styles.slider__h3}>???????????????? ?????????? ??????????</h3>
          {status == "unauthenticated" ? (
            <Link href="/registration" className={styles.registration__btn}>
              ??????????????????????
            </Link>
          ) : (
            <Link href="/deposit" className={styles.registration__btn}>
              ??????????????????
            </Link>
          )}
        </div>
        <Image src={slide2Part1} alt="" className={styles.firstImage} />
        <Image src={slide2Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>?????????? ????????????????</h2>
          <h3 className={styles.slider__h3}>???????????? 20,40,60% VIP</h3>
          <h3 className={styles.slider__h3}>???? 4-???? ????????????????</h3>
          {status == "unauthenticated" ? (
            <Link href="/registration" className={styles.registration__btn}>
              ??????????????????????
            </Link>
          ) : (
            <Link href="/deposit" className={styles.registration__btn}>
              ??????????????????
            </Link>
          )}
        </div>
        <Image src={slide3Part1} alt="" className={styles.firstImage} />
        <Image src={slide3Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <div className={styles.slider__title}>
          <h2 className={styles.slider__h2}>Game of Gladiators</h2>
          <h3 className={styles.slider__h3}>???????????? 20,40,200FS</h3>
          <h3 className={styles.slider__h3}>?????? ???????????? ????????????????????</h3>
          {status == "unauthenticated" ? (
            <Link href="/registration" className={styles.registration__btn}>
              ??????????????????????
            </Link>
          ) : (
            <Link href="/deposit" className={styles.registration__btn}>
              ??????????????????
            </Link>
          )}
        </div>
        <Image src={slide4Part1} alt="" className={styles.firstImage} />
        <Image src={slide4Part2} alt="" className={styles.secondImage} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Hero;

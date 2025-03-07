"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";

import slide1 from "/public/banner/bannerone.png";
import slide2 from "/public/banner/bannertwo.png";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Slider: FC = () => {
  return (
    <>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
          EffectCoverflow,
        ]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
        loop={true}
        effect="fade"
        className="mySwiper"
        style={{
          "--swiper-pagination-bullet-inactive-opacity": "1",
        }}
      >
        <SwiperSlide className="relative w-full h-[500px]">
          {/* Image must have a relative parent */}
          <Image
            src={slide1}
            alt={"sss"}
            width={600}
            className="object-cover w-full h-[348px]"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-[500px]">
          {/* Image must have a relative parent */}
          <Image
            src={slide2}
            alt={"sss"}
            width={600}
            height={348}
            className="object-cover w-full h-[348px]"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-[500px]">
          {/* Image must have a relative parent */}
          <Image
            src={slide1}
            alt={"sss"}
            width={600}
            height={348}
            className="object-cover w-full h-[348px]"
          />
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-[500px]">
          {/* Image must have a relative parent */}
          <Image
            src={slide2}
            alt={"sss"}
            width={600}
            height={348}
            className="object-cover w-full h-[348px]"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;

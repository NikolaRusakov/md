import React, { useState } from 'react';
import { Global } from '@emotion/core';
import Swiper from 'react-id-swiper';
import SwiperInstance from 'swiper';

type Props = {};

export const Carousel: React.FC<Props> = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
  return (
    <>
      <Global
        styles={{
          '.carousel-item': {
            width: '100% !important',
          },
        }}
      />
      <div>
        <Swiper getSwiper={setSwiper} slidesPerView={'auto'}>
          {/*// @ts-ignore*/}
          {children}
        </Swiper>
        <button onClick={goPrev}>Prev</button>
        <button onClick={goNext}>Next</button>
      </div>
    </>
  );
};

export default Carousel;

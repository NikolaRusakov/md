/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import SwiperInstance from 'swiper';
import PreviousIcon from '../../../static/svg/previous.svg';
import NextIcon from '../../../static/svg/next.svg';

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
        <button css={{ border: 'none', margin: 2 }} onClick={goPrev}>
          <div>
            {/*// @ts-ignore*/}
            <PreviousIcon viewBox="0 -4 6 24" width={36} height={36} />
          </div>
        </button>
        <button css={{ border: 'none', margin: 2 }} onClick={goNext}>
          <div>
            {/*// @ts-ignore*/}
            <NextIcon viewBox="0 -4 6 24" width={36} height={36} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Carousel;

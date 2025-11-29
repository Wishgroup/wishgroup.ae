import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

function Partners() {
  return (
    <div className="mil-soft-bg">
      <div className="container mil-p-0-120">
        <Swiper
          className="mil-infinite-show mil-up"
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={true}
          breakpoints={{
            992: {
              slidesPerView: 4,
            },
          }}
        >
          <SwiperSlide>
            <a href="#." className="mil-partner-frame" style={{ width: '60px' }}>
              <img src="/img/partners/1.svg" alt="logo" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#." className="mil-partner-frame" style={{ width: '100px' }}>
              <img src="/img/partners/2.svg" alt="logo" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#." className="mil-partner-frame" style={{ width: '60px' }}>
              <img src="/img/partners/1.svg" alt="logo" />
            </a>
          </SwiperSlide>
          <SwiperSlide>
            <a href="#." className="mil-partner-frame" style={{ width: '100px' }}>
              <img src="/img/partners/2.svg" alt="logo" />
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Partners


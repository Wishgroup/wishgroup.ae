import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

function Partners() {
  const partners = [
    { name: '1 Bond', image: '/img/Logos/Logos/1bond.png' },
    { name: 'One Apparel', image: '/img/Logos/Logos/oneapparel.png' },
    { name: 'Prime Wish', image: '/img/Logos/Logos/primewish.jpeg' },
    { name: 'WCC', image: '/img/Logos/Logos/wcc.png' },
    { name: 'Wish Capital', image: '/img/Logos/Logos/wishcapital.jpeg' },
    { name: 'Wish Harbour', image: '/img/Logos/Logos/wishharbour.jpeg' },
    { name: 'Wish Hospitality', image: '/img/Logos/Logos/wishhospitality.jpeg' },
    { name: 'Wish Tuna', image: '/img/Logos/Logos/wishtuna.jpeg' },
    { name: 'Wish Wow', image: '/img/Logos/Logos/wishwow.png' },
    { name: 'WWC', image: '/img/Logos/Logos/wwc.png' },
  ]

  return (
    <div className="mil-soft-bg" style={{ position: 'relative', overflow: 'hidden', width: '100%', padding: '40px 0' }}>
      <Swiper
        className="mil-infinite-show mil-up"
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={60}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        loopedSlides={partners.length}
        freeMode={true}
        centeredSlides={false}
        allowTouchMove={false}
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <SwiperSlide 
              key={index} 
              style={{ 
                width: '180px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
              }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%',
                  height: '100px'
                }}
              >
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Partners


import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function Reviews() {
  const reviews = [
    {
      name: 'Sarah Newman',
      company: 'Envato market',
      text: 'This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work.',
    },
    {
      name: 'Emma Trueman',
      company: 'Envato market',
      text: 'I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.',
    },
  ]

  const menu = [
    '<div class="mil-custom-dot mil-slide-1"></div>',
    '<div class="mil-custom-dot mil-slide-2"></div>',
    '<div class="mil-custom-dot mil-slide-3"></div>',
    '<div class="mil-custom-dot mil-slide-4"></div>',
    '<div class="mil-custom-dot mil-slide-5"></div>',
    '<div class="mil-custom-dot mil-slide-6"></div>',
    '<div class="mil-custom-dot mil-slide-7"></div>',
  ]

  return (
    <section className="mil-soft-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.3
        }}
      >
        <source src="/video_2.mp4" type="video/mp4" />
      </video>
      
      <div className="container mil-p-120-120" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-10">
            <span className="mil-suptitle mil-suptitle-right mil-suptitle-dark mil-up">
              Customer reviews are a valuable source <br />
              of information for both businesses and consumers.
            </span>
          </div>
        </div>

        <h2 className="mil-center mil-up mil-mb-60">
          Customer <span className="mil-thin">Voices:</span> <br />
          Hear What <span className="mil-thin">They Say!</span>
        </h2>

        <div className="mil-revi-pagination mil-up mil-mb-60"></div>

        <div className="row mil-relative justify-content-center">
          <div className="col-lg-8">
            <div className="mil-slider-nav mil-soft mil-reviews-nav mil-up">
              <div className="mil-slider-arrow mil-prev mil-revi-prev mil-arrow-place"></div>
              <div className="mil-slider-arrow mil-revi-next mil-arrow-place"></div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="mil-quote-icon mil-up">
              <path d="M 13.5 10 A 8.5 8.5 0 0 0 13.5 27 A 8.5 8.5 0 0 0 18.291016 25.519531 C 17.422273 29.222843 15.877848 31.803343 14.357422 33.589844 C 12.068414 36.279429 9.9433594 37.107422 9.9433594 37.107422 A 1.50015 1.50015 0 1 0 11.056641 39.892578 C 11.056641 39.892578 13.931586 38.720571 16.642578 35.535156 C 19.35357 32.349741 22 27.072581 22 19 A 1.50015 1.50015 0 0 0 21.984375 18.78125 A 8.5 8.5 0 0 0 13.5 10 z M 34.5 10 A 8.5 8.5 0 0 0 34.5 27 A 8.5 8.5 0 0 0 39.291016 25.519531 C 38.422273 29.222843 36.877848 31.803343 35.357422 33.589844 C 33.068414 36.279429 30.943359 37.107422 30.943359 37.107422 A 1.50015 1.50015 0 1 0 32.056641 39.892578 C 32.056641 39.892578 34.931586 38.720571 37.642578 35.535156 C 40.35357 32.349741 43 27.072581 43 19 A 1.50015 1.50015 0 0 0 42.984375 18.78125 A 8.5 8.5 0 0 0 34.5 10 z" fill="#000000" />
            </svg>

            <Swiper
              className="mil-reviews-slider"
              modules={[Pagination, Navigation, Parallax]}
              spaceBetween={0}
              slidesPerView={1}
              speed={800}
              effect="fade"
              parallax={true}
              pagination={{
                el: '.mil-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + '">' + menu[index] + '</span>'
                },
              }}
              navigation={{
                nextEl: '.mil-revi-next',
                prevEl: '.mil-revi-prev',
              }}
            >
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <SwiperSlide key={index}>
                  <div className="mil-review-frame mil-center" data-swiper-parallax="-200" data-swiper-parallax-opacity="0">
                    <h5 className="mil-up mil-mb-10">{review.name}</h5>
                    <p className="mil-mb-5 mil-upper mil-up mil-mb-30">{review.company}</p>
                    <p className="mil-text-xl mil-up">{review.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews


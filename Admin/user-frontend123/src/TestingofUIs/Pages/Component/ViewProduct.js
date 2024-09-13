import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import { useTheme } from '@emotion/react';
// import './index12.css'; // Assuming this is your CSS file
import { Link } from 'react-router-dom';
import { Theme } from '../../../Theme';

const ViewProduct = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1415/product');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="containers">
      <h1 className="heading">Product Carousel</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} >
            <Link to={`/viewproduct/${product._id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <img src={product.img1} alt={product.product_name} />
              <div className="product-info" style={{color:colors.grey[100]}}>
                <h3 style={{fontSize:'25px'}}>{product.product_name}</h3>
                <p style={{fontSize:'15px'}}>{product.desc.length > 100 ? `${product.desc.slice(0, 100)}...` : product.desc}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
      <style>
        {`
        *,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
}

:root {
  --primary: #6a59ff;
  --white: #ffffff;
  --bg: #f5f5f5;
}


.containers {
  max-width: 124rem;
  // padding: 4rem 1rem;
  margin: 0 auto;
}

.heading {
  padding: 1rem 0;
  font-size: 3.5rem;
  text-align: center;
}

.swiper_container {
  height: 50rem;
  padding: 2rem 0;
  position: relative;
}

.swiper-slide {                         /* -------------------------- Set Image Height/Width --------------------- */
  width: 37rem;
  height: 32rem;
  position: relative;
}

@media (max-width: 500px) {
  .swiper_container {
    height: 40rem;
  }
  .swiper-slide {
    width: 28rem !important;
    height: 36rem !important;
  }
  .swiper-slide img {
    width: 22rem !important;
    height: 15rem !important;
    margin-left:50px;
  }
  .container h1{
    font-size:1rem
  }
  .product-info{
    margin-left:50px;
  }
}

 .swiper-slide img {                         /* -------------------------- Set Image Height/Width --------------------- */
  width: 32rem;
  height: 22rem;
  border-radius: 2rem;
  object-fit: cover;
}

.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}

.slider-controler {
  position: relative;
  bottom: 16rem;                         /*------------------------- set arroew ------------------------------*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-controler .swiper-button-next {
  left: 58% !important;
  transform: translateX(-58%) !important;
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-next {
    left: 70% !important;
    transform: translateX(-70%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-next {
    left: 80% !important;
    transform: translateX(-80%) !important;
  }
}

@media (max-width: 990px) {
  .slider-controler .swiper-button-prev {
    left: 30% !important;
    transform: translateX(-30%) !important;
  }
}

@media (max-width: 450px) {
  .slider-controler .swiper-button-prev {
    left: 20% !important;
    transform: translateX(-20%) !important;
  }
}

.slider-controler .slider-arrow {
  background: var(--white);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 42%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.slider-controler .slider-arrow ion-icon {
  font-size: 2rem;
  color: #222224;
}

.slider-controler .slider-arrow::after {
  content: '';
}

.swiper-pagination {
  position: relative;
  width: 15rem !important;
  bottom: 1rem;
}

.swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: var(--primary);
}`}
      </style>
    </div>
  );
};

export default ViewProduct;

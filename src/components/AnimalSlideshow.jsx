import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AnimalSlideshow = () => {
  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Lista de fotos de animais
  const animalPhotos = [
    'https://cdn.folhape.com.br/upload/dn_arquivo/2021/07/abrigo1.jpeg',
    'https://s2-g1.glbimg.com/rM74kup91RMJxRLlUWrDfs2g6dY=/0x0:1600x1200/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/R/S/vzmB7CRTGopAnFxod1AA/whatsapp-image-2021-12-21-at-09.43.28.jpeg',
    'https://s2-g1.glbimg.com/vZ7VOh7NRk0C9LQ3UB1-ccRhYag=/0x0:735x983/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/r/4/CBF3KURmuW7jRD6QzRlw/whatsapp-image-2021-12-21-at-09.43.25.jpeg',
    'https://s2-g1.glbimg.com/gPR9CUbzXbXE2X-mfYvK17O5fJY=/0x0:1600x1200/600x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/i/v/4V3I1aQbAk3WeBXumkcA/whatsapp-image-2021-12-21-at-09.43.29.jpeg'
  ];

  return (
    <Slider {...settings}>
      {animalPhotos.map((photo, index) => (
        <div key={index}>
          <img
            src={photo}
            alt={`Animal ${index + 1}`}
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default AnimalSlideshow;
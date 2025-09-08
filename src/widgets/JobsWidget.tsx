'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Flavor, flavorConfigs } from '@/types/flavors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function JobsWidget({ selectedFlavor }: { selectedFlavor: Flavor }) {
  const config = flavorConfigs[selectedFlavor];
  
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .jobs-swiper-mobile {
          margin-left: 20px !important;
          margin-right: 20px !important;
        }
        .swiper-button-prev {
          left: 50% !important;
          top: auto !important;
          bottom: -60px !important;
          transform: translateX(-60px) !important;
        }
        .swiper-button-next {
          right: 50% !important;
          top: auto !important;
          bottom: -60px !important;
          transform: translateX(60px) !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const jobs = [
    {
      id: 1,
      title: 'Electric Engineer 1',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Senior Level'
    },
    {
      id: 2,
      title: 'Electric Engineer 2',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Senior Level'
    },
    {
      id: 3,
      title: 'Electric Engineer 3',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Senior Level'
    },
    {
      id: 4,
      title: 'Solar Engineer',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Mid Level'
    },
    {
      id: 5,
      title: 'Wind Energy Specialist',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Europe',
      level: 'Senior Level'
    },
    {
      id: 6,
      title: 'Energy Storage Engineer',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Senior Level'
    },
    {
      id: 7,
      title: 'Grid Integration Expert',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'North America',
      level: 'Senior Level'
    },
    {
      id: 8,
      title: 'Sustainability Consultant',
      description: 'We offer a range of services to help you take advantage of renewable energy and reduce your carbon footprint.',
      location: 'Global',
      level: 'Mid Level'
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        pb: { xs: 5, md: 0 }
      
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Box sx={{
          px: { xs: 2, sm: 4, md: 8, lg: 15 },
          py: { xs: 5, md: 10 },
        
        }}>
        {/* Título */}
        <Box sx={{ mb: {xs: 3, md: 6}, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: config.textColor,
              mb: {xs: 0, md: 2}
            }}
          >
            {config.jobsTitle}
          </Typography>
        </Box>

        {/* Carrusel Swiper */}
        <Box sx={{ position: 'relative' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}

            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            style={{
              padding: '7px',
              marginLeft: '80px',
              marginRight: '80px',
            }}
            className="jobs-swiper-mobile"

          >
            {jobs.map((job) => (
              <SwiperSlide key={job.id}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid #D1D5DB`,
                    height: { xs: '250px', md: '300px' },
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  {/* Título del trabajo */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      color: config.textColor,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'flex-start',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.2
                    }}
                  >
                    {job.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: config.textColor + '80',
                      lineHeight: 1.4,
                      mb: 2,
                      flex: 1,
                      overflow: 'hidden',
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {job.description}
                  </Typography>

                  {/* Ubicación */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: config.textColor + '80',
                        fontWeight: 500,
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                      }}
                    >
                      {job.location}
                    </Typography>
                  </Box>

                  {/* Salario */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: config.primaryColor,
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                    $80,000 - $120,000 / year
                    </Typography>
                  </Box>

                  {/* Call to action */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: config.primaryColor,
                        fontWeight: 'medium',
                        cursor: 'pointer',
                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                        '&:hover': {
                          color: config.secondaryColor
                        }
                      }}
                    >
                      View job
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación personalizados - DENTRO del Box del Swiper */}
          <Box
            className="swiper-button-prev"
            sx={{
              position: 'absolute',
              left: 0,
              backgroundColor: config.primaryColor, // Fondo azul oscuro
              color: config.secondaryColor, // Flecha azul clara
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              borderRadius: '50%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: config.secondaryColor, // Hover: fondo azul claro
                color: 'white', // Hover: flecha blanca
                transition: 'all 0.3s ease'
              },
              '&::after': {
                display: 'none'
              }
            }}
            component="button"
          >
            <ArrowBackIcon sx={{ fontSize: 24, color: 'white' }} />
          </Box>

          <Box
            className="swiper-button-next"
            sx={{
              position: 'absolute',
              right: 0,
              backgroundColor: config.primaryColor, // Fondo azul oscuro
              color: config.secondaryColor, // Flecha azul clara
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              borderRadius: '50%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: config.secondaryColor, // Hover: fondo azul claro
                color: 'white', // Hover: flecha blanca
                transition: 'all 0.3s ease'
              },
              '&::after': {
                display: 'none'
              }
            }}
            component="button"
          >
            <ArrowForwardIcon sx={{ fontSize: 24, color: 'white' }} />
          </Box>
        </Box>
        </Box>
      </Container>
    </Box>
  );
}

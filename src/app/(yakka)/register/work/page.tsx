'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Routes } from '@/routes/Routes';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface WorkPageProps {
  flavor?: Flavor;
}

const WorkPage: React.FC<WorkPageProps> = ({ flavor = Flavor.LABOUR }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  const handleGoBack = () => {
    router.push(Routes.REGISTER);
  };

  // Crear gradiente basado en los colores del flavor
  const gradientStyle = {
    background: `linear-gradient(90deg, ${config.primaryColor}80 0%, ${config.backgroundColor} 50%, ${config.secondaryColor}80 100%)`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Box sx={gradientStyle}>
      {/* Flecha de regreso */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1
        }}
      >
        <IconButton
          onClick={handleGoBack}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 4
        }}
      >
        {/* Texto superior */}
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.primary,
            fontSize: isMobile ? '1rem' : '1.3rem',
            fontWeight: "bold"
          }}
        >
          To continue please use
        </Typography>

        {/* Texto principal */}
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.text.primary,
            mb: 1,
            fontSize: isMobile ? '1rem' : '1.3rem',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}
        >
          YAKKA app from your phone
        </Typography>

        {/* Texto de instrucción */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary,
            mb: 4,
            fontSize: isMobile ? '0.9rem' : '0.7rem',
            fontWeight: 400,
            opacity: 0.8
          }}
        >
          Scan this QR code with your phone
        </Typography>

        {/* QR Code */}
        <Box
          sx={{
            position: 'relative',
            width: isMobile ? 200 : 200,
            height: isMobile ? 200 : 200,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            p: 2
          }}
        >
          <Image
            src="/img/qr_work.png"
            alt="QR Code for Yakka App"
            fill
            style={{
              objectFit: 'contain',
            }}
            priority
          />
        </Box>
      </Container>
    </Box>
  );
};

export default WorkPage;

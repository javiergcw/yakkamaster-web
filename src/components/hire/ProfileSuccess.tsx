'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { Routes } from '@/routes/Routes';

interface ProfileSuccessProps {
  flavor?: Flavor;
  onStartUsing?: () => void;
  onLinkCompany?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

const ProfileSuccess: React.FC<ProfileSuccessProps> = ({ 
  flavor = Flavor.HOSPITALITY,
  onStartUsing,
  onLinkCompany,
  onBack,
  onClose
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  const handleStartUsing = () => {
    if (onStartUsing) {
      onStartUsing();
    } else {
      // Redirigir al dashboard o página principal
      window.location.href = Routes.HOME;
    }
  };

  const handleLinkCompany = () => {
    if (onLinkCompany) {
      onLinkCompany();
    } else {
      // Lógica para vincular empresa
      console.log('Link company clicked');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white', // Fondo blanco limpio
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: isMobile ? 0 : 2 // Sin padding horizontal en móvil
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: isMobile ? 2 : 0 // Padding horizontal solo en móvil
        }}
      >
        {/* Ícono de checkmark */}
        <Box sx={{ mb: 4 }}>
          <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="33" cy="33" r="33" fill="black"/>
            <path 
              d="M20 33L28 41L46 23" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </Box>

        {/* Título principal */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.8rem' : '2.2rem',
            mb: 3,
            lineHeight: 1.2
          }}
        >
          Profile created!
        </Typography>

        {/* Texto descriptivo */}
        <Typography
          variant="body1"
          sx={{
            color: 'black',
            fontSize: isMobile ? '1rem' : '1.1rem',
            mb: isMobile ? 30 : 6, // Más separación en móvil
            lineHeight: 1.5,
            maxWidth: 300
          }}
        >
          You're ready to get started. Post a job or link you account to a company
        </Typography>

        {/* Botones de acción */}
        <Stack spacing={2} sx={{ width: '100%', maxWidth: isMobile ? '100%' : 300 }}>
          {/* Botón principal */}
          <Button
            variant="contained"
            onClick={handleStartUsing}
            sx={{
              backgroundColor: config.primaryColor, // Color primario del flavor
              color: 'white',
              py: 2,
              px: 4,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              width: '100%',
              '&:hover': {
                backgroundColor: config.buttonHoverColor
              }
            }}
          >
            Start using Yakka
          </Button>

          {/* Enlace secundario */}
          <Button
            variant="text"
            onClick={handleLinkCompany}
            sx={{
              color: 'black',
              fontSize: '1rem',
              fontWeight: 'normal',
              textTransform: 'none',
              textDecoration: 'underline',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            Link a company
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfileSuccess;

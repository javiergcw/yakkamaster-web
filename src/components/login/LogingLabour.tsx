'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Container,
  Paper,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Email,
  Google,
  Apple,
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '../../types/flavors';
import { Routes } from '@/routes/Routes';
import CountrySelector from '../common/CountrySelector';

// Hook personalizado para manejar la hidratación
const useIsMobile = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(matches);
  }, [matches]);

  // Durante la hidratación, siempre retornar false para evitar diferencias
  return mounted ? isMobile : false;
};

interface LogingLabourProps {
  flavorConfig: any;
}

const LogingLabour: React.FC<LogingLabourProps> = ({ flavorConfig }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('AU');
  const [phoneInput, setPhoneInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const countryCodes: { [key: string]: string } = {
    'AU': '+61',
    'US': '+1',
    'GB': '+44',
    'ES': '+34',
    'MX': '+52',
    'CA': '+1',
    'FR': '+33',
    'DE': '+49',
    'IT': '+39',
    'BR': '+55',
    'AR': '+54',
    'CL': '+56',
    'CO': '+57',
    'PE': '+51',
    'VE': '+58',
    'JP': '+81',
    'KR': '+82',
    'CN': '+86',
    'IN': '+91',
    'RU': '+7',
    'ZA': '+27',
    'NG': '+234',
    'EG': '+20',
    'TR': '+90',
    'SA': '+966',
    'AE': '+971',
    'IL': '+972',
    'TH': '+66',
    'SG': '+65',
    'MY': '+60',
    'ID': '+62',
    'PH': '+63',
    'VN': '+84',
    'NL': '+31',
    'BE': '+32',
    'CH': '+41',
    'AT': '+43',
    'SE': '+46',
    'NO': '+47',
    'DK': '+45',
    'FI': '+358',
    'PL': '+48',
    'CZ': '+420',
    'HU': '+36',
    'RO': '+40',
    'BG': '+359',
    'GR': '+30',
    'PT': '+351',
    'IE': '+353',
    'NZ': '+64',
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (phoneInput) {
      const code = countryCodes[country] || '+61';
      setPhoneNumber(`${code} ${phoneInput}`);
    }
  };

  const handlePhoneInputChange = (value: string) => {
    setPhoneInput(value);
    const code = countryCodes[selectedCountry] || '+61';
    setPhoneNumber(`${code} ${value}`);
  };

  const handleContinue = () => {
    // Lógica para continuar con el número de teléfono
    console.log('Continuar con:', phoneNumber);
  };

  const handleEmailLogin = () => {
    // Redirigir a la página de email
    window.location.href = Routes.EMAIL;
  };

  const handleGoogleLogin = () => {
    // Lógica para login con Google
    console.log('Login con Google');
  };

  const handleAppleLogin = () => {
    // Lógica para login con Apple
    console.log('Login con Apple');
  };

  // Evitar renderizado hasta que el componente esté montado en el cliente
  if (!mounted) {
    return (
      <Container 
        maxWidth="md" 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '600px',
            p: 4,
            borderRadius: 2,
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Contenido de carga o placeholder */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: 'text.primary',
              mb: 2,
              textAlign: 'left',
              fontSize: '2rem',
            }}
          >
            G'day, mate.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 400,
              color: 'text.primary',
              mb: 3,
              textAlign: 'left',
              fontSize: '1rem',
            }}
          >
            Login with your phone number.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        py: 4,
        px: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '600px',
          p: isMobile ? 0 : 5,
          borderRadius: 2,
          backgroundColor: 'white',
          border: isMobile ? 'none' : '1px solid',
          borderColor: 'grey.200',
        }}
      >
        {/* Saludo */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: 'text.primary',
            mb: 4,
            textAlign: 'left',
            fontSize: isMobile ? '2rem' : '2rem',
            pt: isMobile ? 2 : 0,
          }}
        >
          G'day, mate.
        </Typography>

        {/* Título */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 400,
            color: 'text.primary',
            mb: 3,
            textAlign: 'left',
            fontSize: isMobile ? '0.875rem' : '1rem',
          }}
        >
          Login with your phone number.
        </Typography>

        {/* Campo de entrada de teléfono */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Campo izquierdo: Bandera + Código */}
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              minWidth={100}
              size="medium"
            />

            {/* Campo derecho: Para escribir número */}
            <TextField
              fullWidth
              placeholder="Phone number"
              value={phoneInput}
              onChange={(e) => {
                const value = e.target.value;
                // Solo permitir números
                const numbersOnly = value.replace(/[^0-9]/g, '');
                handlePhoneInputChange(numbersOnly);
              }}
              variant="outlined"
              size="medium"
              type="tel"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </Box>

        {/* Términos y condiciones */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            mb: 3,
            fontWeight: "bold",
            textAlign: 'left',
            fontSize: '0.875rem',
          }}
        >
          By registering, you accept our{' '}
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'none',
              }
            }}
          >
            Terms and Condition
          </Typography>
          {' '}and{' '}
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'none',
              }
            }}
          >
            Privacy Policy
          </Typography>
        </Typography>

        {/* Botón Continue */}
        <Box sx={{ mb: 6 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleContinue}
            sx={{
              backgroundColor: flavorConfig.buttonColor,
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: flavorConfig.buttonHoverColor,
              }
            }}
          >
            Continue
          </Button>
        </Box>

        {/* Separador */}
        <Box sx={{ position: 'relative', mb: 6, px: isMobile ? 2 : 0 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              color: 'text.secondary',
              fontSize: '0.875rem',
            
            }}
          >
            or login with
          </Typography>
        </Box>

        {/* Botones de login social */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: isMobile ? 2 : 0 }}>
          {/* Email */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleEmailLogin}
            startIcon={<Email />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: 'grey.300',
              color: 'text.primary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'grey.50',
              }
            }}
          >
            Continue with email
          </Button>

          {/* Google */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={
              <Box
                component="img"
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
            }
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: 'grey.300',
              color: 'text.primary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'grey.50',
              }
            }}
          >
            Continue with Google
          </Button>

          {/* Apple */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleAppleLogin}
            startIcon={
              <Apple sx={{ color: 'black' }} />
            }
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: 'grey.300',
              color: 'text.primary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'grey.50',
              }
            }}
          >
            Continue with Apple
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogingLabour;
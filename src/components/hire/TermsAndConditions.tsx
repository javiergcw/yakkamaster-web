'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import Image from 'next/image';

interface TermsAndConditionsProps {
  flavor?: Flavor;
  onAccept?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  flavor = Flavor.LABOUR,
  onAccept,
  onBack,
  onClose
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'center',
        px: isMobile ? 2 : 3,
        position: 'relative',
        pt: isMobile ? 10 : 0
      }}
    >
      {/* Navegación superior */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: isMobile ? 2 : 3
        }}
      >
        {/* Botón regresar */}
        <IconButton
          onClick={onBack}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: isMobile ? 350 : 550,
          width: '100%',
          flex: isMobile ? 1 : 'none',
          justifyContent: isMobile ? 'space-between' : 'center'
        }}
      >
        {/* Contenido superior */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            flex: isMobile ? 1 : 'none',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}
        >
          {/* Logo YAKKA */}
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              src="/img/Yakka_logo.png"
              alt="YAKKA Logo"
              width={isMobile ? 80 : 100}
              height={isMobile ? 80 : 100}
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Título */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              mb: 3,
              fontSize: isMobile ? '2rem' : '2.2rem',
              lineHeight: 1.2
            }}
          >
            Let's be clear
          </Typography>

          {/* Texto descriptivo */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              mb: 4,
              fontSize: isMobile ? '1.1rem' : '1rem',
              lineHeight: 1.5,
              width: '100%',
              textAlign: 'left',
              mt: 2
            }}
          >
            We connect people — we don't manage, hire, or supervise.
          </Typography>

          {/* Sección de responsabilidades - alineada a la izquierda */}
          <Box
            sx={{
              width: '100%',
              textAlign: 'left'
            }}
          >
            {/* Subtítulo */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                mb: 3,
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                textAlign: 'left'
              }}
            >
              YAKKA is not responsible for:
            </Typography>

            {/* Lista de responsabilidades */}
            <Box
              sx={{
                mb: isMobile ? 0 : 6
              }}
            >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  mr: 1,
                  minWidth: '20px'
                }}
              >
                1.
              </Box>
              Employment contracts or agreements between users.
            </Typography>

            <Divider sx={{ my: 2, borderColor: theme.palette.grey[300] }} />

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  mr: 1,
                  minWidth: '20px'
                }}
              >
                2.
              </Box>
              Work conditions, payments, safety, or disputes.
            </Typography>

            <Divider sx={{ my: 2, borderColor: theme.palette.grey[300] }} />

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  mr: 1,
                  minWidth: '20px'
                }}
              >
                3.
              </Box>
              Hiring decisions or outcomes — we do not employ workers.
            </Typography>
            </Box>
          </Box>
        </Box>

        {/* Botón de aceptación */}
        <Button
          variant="contained"
          onClick={onAccept}
          sx={{
            backgroundColor: config.primaryColor,
            color: 'white',
            py: 2,
            px: 4,
            borderRadius: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '100%',
            maxWidth: isMobile ? '100%' : 550,
            whiteSpace: 'nowrap',
            mt: isMobile ? 'auto' : 0,
            mb: isMobile ? 4 : 0,
            '&:hover': {
              backgroundColor: config.buttonHoverColor
            }
          }}
        >
          I understand and accept
        </Button>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;

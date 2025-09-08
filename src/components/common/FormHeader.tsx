'use client';

import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface FormHeaderProps {
  flavor: Flavor;
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onExit?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  nextButtonText?: string;
}

export default function FormHeader({
  flavor,
  currentStep,
  totalSteps,
  showProgress = true,
  onBack,
  onNext,
  onExit,
  canGoBack = true,
  canGoNext = true,
  nextButtonText = 'Next'
}: FormHeaderProps) {
  const router = useRouter();
  const config = flavorConfigs[flavor];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E0E0E0'
      }}
    >
      {/* Header con logo y X */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 4, md: 6 },
          py: 2
        }}
      >
        {/* Logo YAKKA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              backgroundColor: '#000000',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Casco amarillo */}
            <Box
              sx={{
                width: { xs: 16, sm: 20 },
                height: { xs: 12, sm: 16 },
                backgroundColor: '#FFD700',
                borderRadius: '50% 50% 40% 40%',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 2,
                  height: 8,
                  backgroundColor: '#000000',
                  borderRadius: '1px'
                }
              }}
            />
            {/* Letra Y */}
            <Typography
              sx={{
                position: 'absolute',
                bottom: 2,
                color: '#000000',
                fontWeight: 'bold',
                fontSize: { xs: '10px', sm: '12px' },
                lineHeight: 1
              }}
            >
              Y
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#000000',
              fontSize: { xs: '18px', sm: '24px' }
            }}
          >
            YAKKA
          </Typography>
        </Box>

        {/* Botón X para cerrar */}
        <IconButton
          onClick={onExit || (() => router.back())}
          sx={{
            color: '#000000',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Barra de progreso y navegación */}
      {showProgress && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: { xs: 2, sm: 3 },
            py: 2,
            gap: 2
          }}
        >
          {/* Botón Back */}
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            disabled={!canGoBack}
            sx={{
              color: '#000000',
              textDecoration: 'underline',
              textTransform: 'none',
              fontSize: { xs: '14px', sm: '16px' },
              minWidth: 'auto',
              px: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              },
              '&:disabled': {
                color: '#9E9E9E'
              }
            }}
          >
            Back
          </Button>

          {/* Barra de progreso */}
          <Box
            sx={{
              flex: 1,
              height: 4,
              backgroundColor: '#E0E0E0',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: config.primaryColor,
                borderRadius: 2,
                transition: 'width 0.3s ease-in-out'
              }}
            />
          </Box>

          {/* Botón Next */}
          <Button
            variant="contained"
            onClick={onNext}
            disabled={!canGoNext}
            sx={{
              backgroundColor: config.buttonColor,
              color: '#ffffff',
              borderRadius: '8px',
              px: { xs: 2, sm: 3 },
              py: 1,
              textTransform: 'none',
              fontSize: { xs: '14px', sm: '16px' },
              minWidth: 'auto',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: config.buttonHoverColor,
                boxShadow: 'none'
              },
              '&:disabled': {
                backgroundColor: '#E0E0E0',
                color: '#9E9E9E',
                boxShadow: 'none'
              }
            }}
          >
            {nextButtonText}
          </Button>
        </Box>
      )}
    </Box>
  );
}

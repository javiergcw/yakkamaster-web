'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface BottomNavigationProps {
  flavor: Flavor;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

export default function BottomNavigation({
  flavor,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true
}: BottomNavigationProps) {
  const config = flavorConfigs[flavor];
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #E0E0E0'
      }}
    >
      {/* Barra de progreso */}
      <Box
        sx={{
          height: 6,
          backgroundColor: '#E0E0E0',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: config.primaryColor,
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </Box>

      {/* Botones Back y Next */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2
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

        {/* Botón Next */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
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
            '&:hover': {
              backgroundColor: config.buttonHoverColor
            },
            '&:disabled': {
              backgroundColor: '#E0E0E0',
              color: '#9E9E9E'
            }
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface BannerJobProps {
  selectedFlavor: Flavor;
}

export default function BannerJob({ selectedFlavor }: BannerJobProps) {
  const config = flavorConfigs[selectedFlavor];

  return (
    <Box>
      {/* Banner con imagen de fondo */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '40vh', sm: '50vh', md: '60vh' },
          overflow: 'hidden'
        }}
      >
        {/* Imagen de fondo */}
        <Box
          component="img"
          src={config.jobBannerImage}
          alt="Job Banner"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Información del trabajo debajo del banner */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3,   px: { xs: 2, sm: 4, md: 6, lg: 8},}}>
          {/* Información del trabajo */}
          <Box sx={{ flex: 1 }}>
            {/* Título del trabajo */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#000000',
                mb: 1,
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                lineHeight: 1.1
              }}
            >
              {config.jobTitle}
            </Typography>

            {/* Empresa */}
            <Typography
              variant="h6"
              sx={{
                color: '#000000',
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
              }}
            >
              {config.jobCompany}
            </Typography>

            {/* Ubicación y fecha */}
            <Typography
              variant="body1"
              sx={{
                color: config.textColor + '80',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              {config.jobLocation} • {config.jobDatePosted}
            </Typography>
          </Box>
        </Box>
        
        {/* Línea divisoria */}
        <Divider sx={{ mt: { xs: 3, md: 4 }, ml: { xs: 2, sm: 4, md: 6, lg: 8}, mr: { xs: 2, sm: 4, md: 6, lg: 8}}} />  
      </Container>
    </Box>
  );
}

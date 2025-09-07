'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import FolderIcon from '@mui/icons-material/Folder';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface JobDetailCardProps {
  selectedFlavor: Flavor;
}

export default function JobDetailCard({ selectedFlavor }: JobDetailCardProps) {
  const config = flavorConfigs[selectedFlavor];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 0, md: 4 } }}>
      <Box sx={{ 
         px: { xs: 2, sm: 4, md: 6, lg: 8},
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4,
        '@media (max-width: 1000px)': {
          flexDirection: 'column'
        }
      }}>
        {/* Columna izquierda - Información detallada del trabajo */}
        <Box sx={{ flex: 2 }}>
                      {/* About the job */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#000000',
                  mb: 2,
                  fontSize: { xs: '1.3rem', md: '1.5rem' }
                }}
              >
                About the job
              </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#000000',
                lineHeight: 1.6,
                fontSize: { xs: '0.9rem', md: '0.95rem' },
                mb: 2
              }}
            >
              {config.jobDescription}
            </Typography>
          </Box>

          {/* Responsibilities */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#000000',
                mb: 2,
                fontSize: { xs: '1.3rem', md: '1.5rem' }
              }}
            >
              Responsibilities
            </Typography>
            <Box component="ul">
              {config.jobResponsibilities.map((responsibility, index) => (
                <Typography
                  key={index}
                  component="li"
                  sx={{
                    color: '#000000',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    mb: 1
                  }}
                >
                  {responsibility}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Requirements */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#000000',
                mb: 2,
                fontSize: { xs: '1.3rem', md: '1.5rem' }
              }}
            >
              Requirements
            </Typography>
            <Box component="ul">
              {config.jobRequirements.map((requirement, index) => (
                <Typography
                  key={index}
                  component="li"
                  sx={{
                    color: '#000000',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem'  , md: '0.95rem' },
                    mb: 1
                  }}
                >
                  {requirement}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Columna derecha - Información del trabajo y botones de acción */}
        <Box sx={{ 
          flex: 1, 
          minWidth: { xs: '100%', md: '300px' },
          '@media (max-width: 1000px)': {
            minWidth: '100%'
          }
        }}>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              p: 3,
              border: `1px solid ${config.textColor}20`,
              position: 'sticky',
              top: 20
            }}
          >
            {/* Location */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationOnIcon sx={{ color: '#000000', fontSize: 20 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: config.textColor,
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {config.jobLocation}
                </Typography>
              </Box>
            </Box>

            {/* Salary */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: config.textColor,
                  fontWeight: 'bold',
                  fontSize: '1.8rem',
                  mb: 0.5,
                  lineHeight: 1.1
                }}
              >
                {config.jobSalary}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#000000',
                  fontSize: '0.85rem',
                  fontWeight: 400
                }}
              >
                Avg. salary
              </Typography>
            </Box>

            {/* Details */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: config.textColor + '70',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  mb: 2
                }}
              >
                Details
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Industry */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FolderIcon sx={{ color: '#000000', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: '#000000', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        lineHeight: 1.2
                      }}
                    >
                      {config.jobIndustry}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: config.textColor + '70', 
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Industry
                    </Typography>
                  </Box>
                </Box>
                
                {/* Employment Type */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BusinessIcon sx={{ color: '#000000', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: '#000000', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        lineHeight: 1.2
                      }}
                    >
                      {config.jobEmploymentType}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: config.textColor + '70', 
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Employment Type
                    </Typography>
                  </Box>
                </Box>
                
                {/* Job Functions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <GroupIcon sx={{ color: '#000000', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: '#000000', 
                        fontSize: '0.9rem', 
                        fontWeight: 600,
                        lineHeight: 1.2
                      }}
                    >
                      {config.jobFunctions}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: config.textColor + '70', 
                        fontSize: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      Job Functions
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: config.buttonColor,
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: config.buttonHoverColor,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                Apply for a job
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

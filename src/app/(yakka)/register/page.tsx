'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  Link,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ConstructionOutlined as WorkIcon,
  AssignmentIndOutlined as HireIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Routes } from '@/routes/Routes';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface RegisterPageProps {
  flavor?: Flavor;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ flavor = Flavor.LABOUR  }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  const handleWorkClick = () => {
    // Navegar a la página de trabajo con QR
    router.push(Routes.REGISTER_WORK);
  };

  const handleHireClick = () => {
    // Navegar a la página de contratación
    router.push(Routes.REGISTER_HIRE);
  };

  const handleGetHelp = () => {
    // Navegar a página de ayuda o abrir modal
    console.log('Get help clicked');
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', sm: 'center' },
        py: 4,
        pt: { xs: 6, sm: 4 }
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4, maxWidth: '600px', width: '100%' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.secondary,
            mb: 1,
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}
        >
          Let's get you started!
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            fontSize: isMobile ? '1.5rem' : '2rem'
          }}
        >
          What do you want?
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 4, maxWidth: '600px', width: '100%' }}>
        {/* WORK Card */}
        <Card 
          sx={{ 
            borderRadius: 3,
            borderBottom: '4px solid',
            borderRight: '4px solid',
            borderBottomColor: config.primaryColor,
            borderRightColor: config.primaryColor,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <CardActionArea onClick={handleWorkClick}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: config.primaryColor,
                    width: 56,
                    height: 56,
                    color: 'white'
                  }}
                >
                  <WorkIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      mb: 0.5
                    }}
                  >
                    WORK
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    Looking for a job now
                  </Typography>
                </Box>
                <ArrowIcon 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontSize: 24
                  }} 
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* HIRE Card */}
        <Card 
          sx={{ 
            borderRadius: 3,
            borderBottom: '4px solid',
            borderRight: '4px solid',
            borderBottomColor: config.primaryColor,
            borderRightColor: config.primaryColor,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <CardActionArea onClick={handleHireClick}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: config.primaryColor,
                    width: 56,
                    height: 56,
                    color: 'white'
                  }}
                >
                  <HireIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      mb: 0.5
                    }}
                  >
                    HIRE
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    Connect with trusted labourers today
                  </Typography>
                </Box>
                <ArrowIcon 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontSize: 24
                  }} 
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>

      {/* Help Section */}
      <Box sx={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontSize: isMobile ? '0.85rem' : '0.9rem'
          }}
        >
          Not sure?{' '}
          <Link
            component="button"
            onClick={handleGetHelp}
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'underline',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              fontSize: 'inherit',
              '&:hover': {
                color: theme.palette.primary.dark
              }
            }}
          >
            Get help
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;

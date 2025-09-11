'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  EditOutlined as EditIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CountrySelector, { getPhoneCodeByCountry } from '@/components/common/CountrySelector';
import ReactCountryFlag from 'react-country-flag';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface EditProfilePageProps {
  flavor?: Flavor;
}

export default function EditProfilePage({ flavor = Flavor.LABOUR }: EditProfilePageProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: 'rama',
    lastName: 'roman',
    email: 'buildertest@gmail.com',
    phoneNumber: '416985326',
    company: 'Test company by Yakka'
  });

  const [selectedCountry, setSelectedCountry] = useState('NZ'); // Nueva Zelanda por defecto

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleUpdate = () => {
    // TODO: Implementar lógica para actualizar el perfil
    // Aquí se enviarían los datos al servidor
    router.back();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'transparent',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
           <Box
             sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               pt: { xs: 2, sm: 3 },
               pb: { xs: 1, sm: 2 },
               px: { xs: 2, sm: 4, md: 6 }
             }}
           >
             {/* Logo YAKKA con botón Back */}
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
               {/* Logo YAKKA */}
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <Box
                   component="img"
                   src="/YAKKA.webp"
                   alt="YAKKA Logo"
                   sx={{
                     width: { xs: 100, sm: 150 },
                     height: { xs: 30, sm: 40 },
                     objectFit: 'contain'
                   }}
                 />
               </Box>

               {/* Botón Back */}
               <IconButton
                 onClick={handleBack}
                 sx={{
                   color: '#000000',
                   backgroundColor: '#F5F5F5',
                   width: { xs: 32, sm: 36 },
                   height: { xs: 32, sm: 36 },
                   borderRadius: '50%',
                   '&:hover': {
                     backgroundColor: '#E0E0E0'
                   }
                 }}
               >
                 <ArrowBackIcon />
               </IconButton>
             </Box>

             {/* Botón X */}
             <IconButton
               onClick={handleClose}
               sx={{
                 color: '#000000',
                 backgroundColor: '#F5F5F5',
                 width: { xs: 32, sm: 36 },
                 height: { xs: 32, sm: 36 },
                 borderRadius: '50%',
                 '&:hover': {
                   backgroundColor: '#E0E0E0'
                 }
               }}
             >
               <CloseIcon />
             </IconButton>
           </Box>
        </Container>
      </Box>

      {/* Título Edit profile */}
      <Box
        sx={{
          textAlign: 'center',
          pb: 3,
          px: { xs: 2, sm: 4 }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#000000',
            fontSize: { xs: '20px', sm: '24px', md: '28px' }
          }}
        >
          Edit profile
        </Typography>
      </Box>

      {/* Contenido principal */}
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}
        >
          {/* Foto de perfil con botón de edición */}
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src="/bartender_pro.webp"
              alt="Profile"
              sx={{
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 120, sm: 150, md: 180 },
                border: '3px solid #000000',
                backgroundColor: '#f0f0f0'
              }}
            />
            {/* Botón de edición superpuesto */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                backgroundColor: config.primaryColor,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: config.buttonHoverColor
                }
              }}
            >
              <EditIcon 
                sx={{ 
                  color: '#000000', 
                  fontSize: { xs: 16, sm: 18 }
                }} 
              />
            </Box>
          </Box>

          {/* Formulario en dos columnas */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              px: { xs: 2, sm: 0 }
            }}
          >
            {/* Columna izquierda */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* First Name */}
              <TextField
                fullWidth
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BDBDBD',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFD904',
                    },
                  },
                }}
              />

              {/* Last Name */}
              <TextField
                fullWidth
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BDBDBD',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFD904',
                    },
                  },
                }}
              />

              {/* Phone Number con selector de país */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                  minWidth={120}
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#BDBDBD',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD904',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#BDBDBD',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FFD904',
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Columna derecha */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Email */}
              <TextField
                fullWidth
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BDBDBD',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFD904',
                    },
                  },
                }}
              />

              {/* Company */}
              <FormControl
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#BDBDBD',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFD904',
                    },
                  },
                }}
              >
                <Select
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  displayEmpty
                  IconComponent={ExpandMoreIcon}
                  sx={{
                    '& .MuiSelect-select': {
                      color: '#000000',
                      '&:focus': {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                >
                  <MenuItem value="Test company by Yakka">Test company by Yakka</MenuItem>
                  <MenuItem value="Another Company">Another Company</MenuItem>
                  <MenuItem value="New Company">New Company</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Botón Update */}
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: config.primaryColor,
              color: '#FFFFFF',
              py: 2,
              px: 6,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              minWidth: 200,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: config.buttonHoverColor,
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: config.buttonHoverColor,
                boxShadow: 'none',
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

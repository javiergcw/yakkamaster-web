'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import RegisterForm from '@/components/hire/RegisterForm';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { Routes } from '@/routes/Routes';
import ProfilePhotoUpload from '@/components/hire/ProfilePhotoUpload';
import LicenseSelector from '@/components/hire/LicenseSelector';
import RespectCommitment from '@/components/hire/RespectCommitment';
import TermsAndConditions from '@/components/hire/TermsAndConditions';
import ProfileSuccess from '@/components/hire/ProfileSuccess';
import { CURRENT_FLAVOR, getCurrentFlavorConfig } from '@/types/favorGlobal';

const steps = [
  'Personal Information',
  'Profile Photo',
  'Licenses'
];

interface HireRegisterPageProps {
  flavor?: Flavor;
}

const HireRegisterPage: React.FC<HireRegisterPageProps> = ({ 
  flavor = CURRENT_FLAVOR
  
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = getCurrentFlavorConfig();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [licenses, setLicenses] = useState<string[]>([]);
  const [showRespectScreen, setShowRespectScreen] = useState(false);
  const [showTermsScreen, setShowTermsScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Si es el último paso, mostrar pantalla de respeto
      setShowRespectScreen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      // Si está en el primer paso, regresar a la página de registro
      window.history.back();
    } else {
      // Si no está en el primer paso, ir al paso anterior
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handlePhotoChange = (photo: File | null) => {
    setProfilePhoto(photo);
  };

  const handleLicensesChange = (newLicenses: string[]) => {
    setLicenses(newLicenses);
  };

  const handleRespectCommit = () => {
    // Mostrar pantalla de términos y condiciones
    setShowTermsScreen(true);
  };

  const handleRespectBack = () => {
    setShowRespectScreen(false);
  };

  const handleRespectClose = () => {
    // Cerrar y regresar al inicio
    window.history.back();
  };

  const handleTermsAccept = () => {
    // Mostrar pantalla de éxito
    setShowSuccessScreen(true);
  };

  const handleTermsBack = () => {
    setShowTermsScreen(false);
  };

  const handleTermsClose = () => {
    // Cerrar y regresar al inicio
    window.history.back();
  };

  const handleSuccessStartUsing = () => {
    // Redirigir al dashboard o página principal
    window.location.href = Routes.HOME;
  };

  const handleSuccessLinkCompany = () => {
    // Lógica para vincular empresa
    console.log('Link company clicked');
    // Aquí podrías redirigir a una página de vinculación de empresa
  };

  const handleSuccessBack = () => {
    setShowSuccessScreen(false);
  };

  const handleSuccessClose = () => {
    // Cerrar y regresar al inicio
    window.history.back();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{8,15}$/;
    return phoneRegex.test(phone);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        // Solo verificar que los campos requeridos estén llenos
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.address;
      case 1:
        return profilePhoto !== null;
      case 2:
        return licenses.length > 0;
      default:
        return false;
    }
  };

  const getStepErrors = (step: number) => {
    switch (step) {
      case 0:
        const errors = [];
        if (formData.email && !validateEmail(formData.email)) {
          errors.push('Invalid email format');
        }
        if (formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
          errors.push('Invalid phone number (8-15 digits required)');
        }
        return errors;
      default:
        return [];
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <RegisterForm flavor={flavor} onFormChange={handleFormChange} />;
      case 1:
        return <ProfilePhotoUpload flavor={flavor} onPhotoChange={handlePhotoChange} />;
      case 2:
        return <LicenseSelector flavor={flavor} onLicensesChange={handleLicensesChange} />;
      default:
        return null;
    }
  };

  // Mostrar pantalla de éxito si está activa
  if (showSuccessScreen) {
    return (
      <ProfileSuccess
        flavor={flavor}
        onStartUsing={handleSuccessStartUsing}
        onLinkCompany={handleSuccessLinkCompany}
        onBack={handleSuccessBack}
        onClose={handleSuccessClose}
      />
    );
  }

  // Mostrar pantalla de términos si está activa
  if (showTermsScreen) {
    return (
      <TermsAndConditions
        flavor={flavor}
        onAccept={handleTermsAccept}
        onBack={handleTermsBack}
        onClose={handleTermsClose}
      />
    );
  }

  // Mostrar pantalla de respeto si está activa
  if (showRespectScreen) {
    return (
      <RespectCommitment
        flavor={flavor}
        onCommit={handleRespectCommit}
        onBack={handleRespectBack}
        onClose={handleRespectClose}
      />
    );
  }

  return (
    <Box
      sx={{

        backgroundColor:  'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'flex-start' : 'center',
        py: 4
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: isMobile ? 1 : 'none',
          justifyContent: isMobile ? 'space-between' : 'center'
        }}
      >
        {/* Contenido superior */}
        <Box sx={{ flex: isMobile ? 1 : 'none' }}>
          {/* Stepper y navegación - FUERA de la tarjeta */}
          <Box sx={{ mb: 4 }}>
          {/* Stepper con botón regresar */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
            {/* Botón regresar - SIEMPRE visible */}
            <Button
              variant="text"
              onClick={handleBack}
              sx={{
                minWidth: 'auto',
                p: 1,
                mr: 2,
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: `${config.primaryColor}10`
                }
              }}
            >
              <ArrowBackIcon />
            </Button>
            
            {/* Stepper - toma todo el ancho restante */}
            <Box sx={{ flex: 1 }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          display: 'none' // Ocultar labels del stepper
                        },
                        '& .MuiStepIcon-root': {
                          color: index < activeStep ? config.primaryColor : theme.palette.grey[300],
                          '&.Mui-active': {
                            color: config.primaryColor
                          },
                          '&.Mui-completed': {
                            color: config.primaryColor
                          }
                        }
                      }}
                    />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          {/* Título descriptivo debajo del stepper */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: isMobile ? '1rem' : '1.5rem'
            }}
          >
            {activeStep === 0 && "Personal Information"}
            {activeStep === 1 && "Next, add your profile photo"}
            {activeStep === 2 && "Finally, add one licence"}
          </Typography>
          </Box>

          {/* Tarjeta con contenido */}
          <Paper
           elevation={0}
           sx={{
             p: isMobile ? '24px 0' : 4,
             borderRadius: 3,
             backgroundColor: 'white',
             mb: isMobile ? 0 : 4,
             borderBottom: isMobile ? 'none' : '4px solid',
             borderRight: isMobile ? 'none' : '4px solid',
             borderColor: config.primaryColor,
             boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
           }}
         >
          {/* Contenido del paso actual */}
          <Box sx={{ minHeight: 400 }}>
            {renderStepContent(activeStep)}
          </Box>
          </Paper>
        </Box>

        {/* Botón continuar - FUERA de la tarjeta */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: isMobile ? 'auto' : 0,
        }}>
           <Button
             variant="contained"
             onClick={handleNext}
             disabled={!isStepValid(activeStep)}
             endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
             sx={{
               backgroundColor: config.primaryColor,
               color: 'white',
               px: 6,
               py: 2,
               borderRadius: 2,
               fontSize: '1.1rem',
               fontWeight: 'bold',
               textTransform: 'none',
               width: '100%',
               maxWidth: 400,
               '&:hover': {
                 backgroundColor: config.buttonHoverColor
               },
               '&:disabled': {
                 backgroundColor: theme.palette.grey[300],
                 color: theme.palette.grey[500]
               }
             }}
           >
             {activeStep === steps.length - 1 ? 'Complete Registration' : 'Continue'}
           </Button>
         </Box>
      </Container>
    </Box>
  );
};

export default HireRegisterPage;

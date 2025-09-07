'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Modal,
  Fade,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  Close,
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '../../../types/flavors';
import { Routes } from '@/routes/Routes';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RegisterPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // 0 = Login, 1 = Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  // Configuración del flavor LABOUR
  const flavorConfig = flavorConfigs[Flavor.LABOUR];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleRegister = () => {
    // Validar que todos los campos estén llenos
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!password.trim()) {
      alert('Please enter your password');
      return;
    }
    if (!confirmPassword.trim()) {
      alert('Please confirm your password');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Services and Privacy Policy');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    console.log('Register with:', { email, password });
    
    // Mostrar modal cuando todos los campos estén llenos (tanto en web como móvil)
    setShowSuccessModal(true);
  };

  const handleLogin = () => {
    console.log('Login with:', { email, password });
  };

  const handleBack = () => {
    // Redirigir al login
    window.location.href = Routes.LOGIN;
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleStartProfile = () => {
    console.log('Start profile completion');
    setShowSuccessModal(false);
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
            E-mail login
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
          p: isMobile ? 0 : 4,
          borderRadius: 2,
          backgroundColor: 'white',
          border: isMobile ? 'none' : '1px solid',
          borderColor: 'grey.200',
        }}
      >
        {/* Header con botón de volver */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              borderRadius: 3,
              backgroundColor: 'grey.100',
              color: 'text.primary',
              mr: 2,
              '&:hover': {
                backgroundColor: 'grey.200',
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 500,
              color: 'text.primary',
              fontSize: isMobile ? '1.5rem' : '2rem',
            }}
          >
            E-mail login
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: flavorConfig.buttonColor,
                height: 2,
              }
            }}
          >
            <Tab label="Log in" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {/* Tab Panel para Login */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
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
              Login
            </Button>
          </Box>
        </TabPanel>

        {/* Tab Panel para Register */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            {/* Terms and Privacy Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={handleTermsChange}
                  sx={{
                    color: 'grey.400',
                    '&.Mui-checked': {
                      color: flavorConfig.buttonColor,
                    }
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.primary',
                    fontSize: isMobile ? '0.85rem' : '0.9rem'
                  }}
                >
                  I agree to{' '}
                  <Typography
                    component="span"
                    sx={{
                      color: flavorConfig.buttonColor,
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    Terms of Services
                  </Typography>
                  {' '}&{' '}
                  <Typography
                    component="span"
                    sx={{
                      color: flavorConfig.buttonColor,
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Typography>
              }
              sx={{ alignItems: 'center'  }}
            />

            {/* Register Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
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
              Register
            </Button>

            {/* Login Prompt */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Have any account?{' '}
                <Typography
                  component="span"
                  onClick={() => setTabValue(0)}
                  sx={{
                    color: flavorConfig.buttonColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'none',
                    }
                  }}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
          </Box>
        </TabPanel>
      </Paper>

      {/* Modal de éxito - Bottom sheet */}
      <Modal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Fade in={showSuccessModal}>
          <Paper
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto',
              p: isMobile ? 2 : 3,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Handle superior */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 1,
              pt: 0.5
            }}>
              <Box sx={{
                width: 40,
                height: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 2,
              }} />
            </Box>

            {/* Botón de cerrar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
              <IconButton
                onClick={handleCloseSuccessModal}
                sx={{
                  color: 'black',
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                <Close sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Box>

            {/* Título centrado */}
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: isMobile ? '1.5rem' : '1.75rem',
                textAlign: 'center',
                mb: 1.5,
              }}
            >
              Account created
            </Typography>

            {/* Descripción */}
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                mb: 2.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: 1.4,
                textAlign: 'center',
              }}
            >
              Complete your profile to get hired faster. Takes 2 min.
            </Typography>

            {/* Botón Start */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleStartProfile}
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
              Start
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </Container>
  );
};

export default RegisterPage;

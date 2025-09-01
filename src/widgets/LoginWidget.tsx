'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Link,
  Chip,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface LoginWidgetProps {
  onLogin?: (flavor: Flavor, credentials: { email: string; password: string }) => void;
}

export default function LoginWidget({ onLogin }: LoginWidgetProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(Flavor.SPORT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const config = flavorConfigs[selectedFlavor];

  // Crear tema personalizado basado en el flavor seleccionado
  const theme = createTheme({
    palette: {
      primary: {
        main: config.primaryColor,
      },
      secondary: {
        main: config.secondaryColor,
      },
      background: {
        default: config.backgroundColor,
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: `0 10px 25px ${config.primaryColor}20`,
          },
        },
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(selectedFlavor, { email, password });
    }
  };

  const handleFlavorChange = (
    event: React.MouseEvent<HTMLElement>,
    newFlavor: Flavor | null,
  ) => {
    if (newFlavor !== null) {
      setSelectedFlavor(newFlavor);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: config.backgroundColor,
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Header */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: config.primaryColor,
                mb: 1,
              }}
            >
              {config.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: config.secondaryColor,
                mb: 4,
              }}
            >
              {config.subtitle}
            </Typography>

            {/* Selector de flavors */}
            <ToggleButtonGroup
              value={selectedFlavor}
              exclusive
              onChange={handleFlavorChange}
              aria-label="flavor selection"
              sx={{
                mb: 4,
                '& .MuiToggleButton-root': {
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  border: `2px solid ${config.primaryColor}20`,
                  '&.Mui-selected': {
                    backgroundColor: config.primaryColor,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: config.buttonHoverColor,
                    },
                  },
                },
              }}
            >
              {Object.values(Flavor).map((flavor) => (
                <ToggleButton key={flavor} value={flavor}>
                  {flavorConfigs[flavor].name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Card de login */}
          <Card
            sx={{
              borderTop: `4px solid ${config.primaryColor}`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Mensaje de bienvenida */}
              <Typography
                variant="body2"
                sx={{
                  color: config.textColor,
                  textAlign: 'center',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {config.welcomeText}
              </Typography>

              {/* Formulario */}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: config.primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: config.primaryColor,
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: config.primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: config.primaryColor,
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    backgroundColor: config.buttonColor,
                    '&:hover': {
                      backgroundColor: config.buttonHoverColor,
                    },
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Box>

              {/* Enlaces adicionales */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: config.secondaryColor,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: config.textColor }}
                  >
                    ¿No tienes cuenta?{' '}
                  </Typography>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      color: config.primaryColor,
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Regístrate aquí
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Footer con acento de color */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Chip
              label={`Powered by Yakka ${config.name}`}
              sx={{
                backgroundColor: `${config.accentColor}20`,
                color: config.primaryColor,
                fontWeight: 600,
                px: 2,
                py: 1,
                height: 'auto',
                '& .MuiChip-label': {
                  px: 2,
                },
              }}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

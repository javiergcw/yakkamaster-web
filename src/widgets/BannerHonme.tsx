'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

// ============================================================================
// INTERFACES AND TYPES
// ============================================================================

interface BannerHomeProps {
  onLogin?: (flavor: Flavor, credentials: { email: string; password: string }) => void;
  selectedFlavor: Flavor; // Selected flavor to customize colors and content
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BannerHome({ selectedFlavor }: BannerHomeProps) {
  // ========================================================================
  // LOCAL STATES
  // ========================================================================
  const [jobSearch, setJobSearch] = useState('');        
  const [location, setLocation] = useState('');          

  // ========================================================================
  // FLAVOR CONFIGURATION
  // ========================================================================
  const config = flavorConfigs[selectedFlavor]; 

  // ========================================================================
  // CUSTOM MATERIAL-UI THEME
  // ========================================================================
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
    },
  });

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================
  
  /**
   * Handles search form submission
   * @param e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job search:', { jobSearch, location });
    // TODO: Implement real search logic
  };

  // ========================================================================
  // RENDERING
  // ========================================================================
  
  return (
    <ThemeProvider theme={theme}>
      {/* ================================================================
          MAIN CONTAINER
          ================================================================ */}
      <Box
        sx={{
        
          backgroundColor: "white",
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* ================================================================
            MAIN BANNER WITH BACKGROUND IMAGE
            ================================================================ */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1400px',
            height: '450px',
            backgroundImage: `url(${config.bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 6,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          }}
        >
          {/* ================================================================
              OVERLAY WITH GRADIENT TO IMPROVE TEXT READABILITY
              ================================================================ */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end', 
              alignItems: 'center',
              textAlign: 'center',
              padding: 6,
              pb: 10, 
            }}
          >
            {/* ================================================================
                MAIN BANNER TITLE
                ================================================================ */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: 3,
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              {config.searchTitle}
            </Typography>

            {/* ================================================================
                DESCRIPTIVE SUBTITLE
                ================================================================ */}
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                maxWidth: '700px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                opacity: 0.95,
                lineHeight: 1.6,
                mb: 0,
              }}
            >
              {config.searchSubtitle}
            </Typography>
          </Box>
        </Box>

        {/* ================================================================
            SEARCH BAR CENTERED BETWEEN BANNER AND BOTTOM SPACE
            ================================================================ */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            px: 4,
            marginTop: '-70px', 
            marginBottom: 'auto',
            zIndex: 1000, 
          }}
        >
          {/* ================================================================
              MAIN SEARCH BAR PAPER
              ================================================================ */}
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: '50px', // Super rounded borders
              backgroundColor: 'white',
              width: '100%',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Subtle shadow
            }}
          >
            {/* ================================================================
                SEARCH FORM WITH HORIZONTAL ELEMENTS
                ================================================================ */}
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1 }}>
              
              {/* ================================================================
                  CIRCULAR SEARCH BUTTON WITH ICON
                  ================================================================ */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: config.primaryColor,
                  borderRadius: '50%', 
                  px: 3,
                  py: 2,
                  minWidth: 'auto',
                  width: '56px',
                  height: '56px',
                  '&:hover': {
                    backgroundColor: config.buttonHoverColor,
                  },
                }}
              >
                <Search sx={{ fontSize: 24, color: 'white' }} />
              </Button>

              {/* ================================================================
                  TEXT FIELD FOR JOB SEARCH
                  ================================================================ */}
              <TextField
                fullWidth
                placeholder={config.searchPlaceholder}
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    '& fieldset': {
                      border: 'none', 
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />

              {/* ================================================================
                  LOCATION FILTER BUTTON
                  ================================================================ */}
              <Button
                variant="outlined"
                startIcon={<LocationOn />}
                sx={{
                  borderColor: '#ddd',
                  color: '#666',
                  borderRadius: '50px', 
                  px: 3,
                  py: 2,
                  minWidth: 'auto',
                  whiteSpace: 'nowrap', 
                  fontSize: '14px',
                  '&:hover': {
                    borderColor: config.primaryColor,
                    color: config.primaryColor,
                  },
                }}
              >
                {config.locationPlaceholder}
              </Button>
            </Box>
          </Paper>

          {/* ================================================================
              SUGGESTION CHIPS (CURRENTLY COMMENTED OUT)
              ================================================================ */}
          {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {config.suggestionChips.map((chip, index) => {
              // Alternate between flavor colors for visual variety
              const colors = [config.primaryColor, config.secondaryColor, config.accentColor];
              const chipColor = colors[index % colors.length];

              return (
                <Chip
                  key={index}
                  label={chip}
                  sx={{
                    backgroundColor: `${chipColor}20`,
                    color: chipColor,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: `${chipColor}30`,
                    },
                  }}
                />
              );
            })}
          </Box> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

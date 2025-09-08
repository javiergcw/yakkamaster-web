'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface LicenseSelectorProps {
  flavor?: Flavor;
  onLicensesChange?: (licenses: string[]) => void;
}

interface License {
  id: string;
  name: string;
}

const LicenseSelector: React.FC<LicenseSelectorProps> = ({
  flavor = Flavor.LABOUR,
  onLicensesChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];
  
  const [selectedCredential, setSelectedCredential] = useState<string>('');
  const [addedLicenses, setAddedLicenses] = useState<string[]>([]);

  const availableLicenses: License[] = [
    { id: 'crane-hoist', name: 'Crane and Hoist Operation' },
    { id: 'blue-card', name: 'Blue Card' },
    { id: 'traffic-control', name: 'Traffic Control Tickets' },
    { id: 'forklift', name: 'Forklift licence' },
    { id: 'white-card', name: 'White Card' },
    { id: 'confined-space', name: 'Confined Space Entry Ticket' },
    { id: 'driving', name: 'Driving licence' },
    { id: 'fire-warden', name: 'Fire Warden' },
    { id: 'elevated-work', name: 'Elevated Work Platforms' },
    { id: 'ewp-ticket', name: 'Elevated Work Platform (EWP) Ticket' },
    { id: 'working-heights', name: 'Working at Heights Ticket' },
    { id: 'asbestos-removal', name: 'Asbestos Removal Ticket' },
    { id: 'yellow-card', name: 'Yellow Card' },
    { id: 'rigging', name: 'Rigging' },
    { id: 'dogging', name: 'Dogging' },
    { id: 'scaffolding', name: 'Scaffolding' },
    { id: 'rsa', name: 'RSA' }
  ];

  const handleAddLicense = () => {
    if (selectedCredential && !addedLicenses.includes(selectedCredential)) {
      const newLicenses = [...addedLicenses, selectedCredential];
      setAddedLicenses(newLicenses);
      setSelectedCredential('');
      
      if (onLicensesChange) {
        onLicensesChange(newLicenses);
      }
    }
  };

  const handleRemoveLicense = (licenseToRemove: string) => {
    const newLicenses = addedLicenses.filter(license => license !== licenseToRemove);
    setAddedLicenses(newLicenses);
    
    if (onLicensesChange) {
      onLicensesChange(newLicenses);
    }
  };

  const getLicenseName = (licenseId: string) => {
    const license = availableLicenses.find(l => l.id === licenseId);
    return license ? license.name : licenseId;
  };

  return (
    <Box>
      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.grey[600],
          mb: 2,
          fontSize: '1rem',
          fontWeight: 500
        }}
      >
        Add your credentials
      </Typography>

      {/* Selector de credenciales */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <FormControl sx={{ flex: 1 }}>
            <Select
              value={selectedCredential}
              onChange={(e) => setSelectedCredential(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: config.primaryColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: config.primaryColor,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select credential
              </MenuItem>
              {availableLicenses.map((license) => (
                <MenuItem 
                  key={license.id} 
                  value={license.id}
                  disabled={addedLicenses.includes(license.id)}
                >
                  {license.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Botón Add License */}
          <Button
            variant="contained"
            onClick={handleAddLicense}
            disabled={!selectedCredential}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: config.primaryColor,
              color: 'white',
              py: 1.5,
              px: 3,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              minWidth: 140,
              height: '56px', // Misma altura que el Select
              '&:hover': {
                backgroundColor: config.buttonHoverColor,
              },
              '&:disabled': {
                backgroundColor: theme.palette.grey[300],
                color: theme.palette.grey[500],
              },
            }}
          >
            Add License
          </Button>
        </Box>
      </Box>

      {/* Licencias agregadas */}
      {addedLicenses.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              mb: 2,
              fontWeight: 600
            }}
          >
            Added Licenses:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {addedLicenses.map((licenseId) => (
              <Chip
                key={licenseId}
                label={getLicenseName(licenseId)}
                onDelete={() => handleRemoveLicense(licenseId)}
                deleteIcon={<CloseIcon />}
                sx={{
                  backgroundColor: config.primaryColor,
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': {
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Disclaimer */}
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          lineHeight: 1.4,
          textAlign: 'left'
        }}
      >
        *To avoid scammers we require minimum 1 licence to verify your Identity
      </Typography>
    </Box>
  );
};

export default LicenseSelector;

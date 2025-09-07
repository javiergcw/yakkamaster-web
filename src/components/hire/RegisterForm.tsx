'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import CountrySelector, { getPhoneCodeByCountry, getCountryByPhoneCode } from '../common/CountrySelector';

interface RegisterFormProps {
  flavor?: Flavor;
  onFormChange?: (formData: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  address: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  flavor = Flavor.LABOUR,
  onFormChange 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    country: '+61',
    phoneNumber: '',
    address: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Mínimo 8 dígitos, máximo 15 dígitos
    const phoneRegex = /^\d{8,15}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validaciones en tiempo real
    const newErrors = { ...errors };
    
    if (field === 'email' && value && !validateEmail(value)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (field === 'email' && value && validateEmail(value)) {
      delete newErrors.email;
    }
    
    if (field === 'phoneNumber' && value && !validatePhone(value)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (8-15 digits)';
    } else if (field === 'phoneNumber' && value && validatePhone(value)) {
      delete newErrors.phoneNumber;
    }
    
    setErrors(newErrors);
    
    // Notificar cambios al componente padre
    if (onFormChange) {
      onFormChange(newFormData);
    }
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        placeholder="First name (Required)"
        value={formData.firstName}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: config.primaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: config.primaryColor,
            },
          },
        }}
      />
      
      <TextField
        fullWidth
        placeholder="Last name (Required)"
        value={formData.lastName}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: config.primaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: config.primaryColor,
            },
          },
        }}
      />

      <TextField
        fullWidth
        type="email"
        placeholder="Email (Required)"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: config.primaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: config.primaryColor,
            },
          },
        }}
      />
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <CountrySelector
          selectedCountry={getCountryByPhoneCode(formData.country)}
          onCountryChange={(country) => {
            const phoneCode = getPhoneCodeByCountry(country);
            handleInputChange('country', phoneCode);
          }}
          minWidth={120}
          size="medium"
          sx={{
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
        />
        
        <TextField
          fullWidth
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={(e) => {
            const value = e.target.value;
            // Solo permitir números
            const numbersOnly = value.replace(/[^0-9]/g, '');
            handleInputChange('phoneNumber', numbersOnly);
          }}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          type="tel"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: config.primaryColor,
              },
              '&.Mui-focused fieldset': {
                borderColor: config.primaryColor,
              },
            },
          }}
        />
      </Box>

      <TextField
        fullWidth
        placeholder="Insert your address (Required)"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: config.primaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: config.primaryColor,
            },
          },
        }}
      />
    </Stack>
  );
};

export default RegisterForm;

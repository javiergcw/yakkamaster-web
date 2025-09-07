'use client';

import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ReactCountryFlag from 'react-country-flag';

export interface CountryData {
  code: string;
  name: string;
  phoneCode: string;
}

// Mapeo de países a códigos telefónicos para uso en otros componentes
export const countryToPhoneCode: { [key: string]: string } = {
  'AU': '+61',
  'US': '+1',
  'GB': '+44',
  'ES': '+34',
  'MX': '+52',
  'CA': '+1',
  'FR': '+33',
  'DE': '+49',
  'IT': '+39',
  'BR': '+55',
  'AR': '+54',
  'CL': '+56',
  'CO': '+57',
  'PE': '+51',
  'VE': '+58',
  'JP': '+81',
  'KR': '+82',
  'CN': '+86',
  'IN': '+91',
  'RU': '+7',
  'ZA': '+27',
  'NG': '+234',
  'EG': '+20',
  'TR': '+90',
  'SA': '+966',
  'AE': '+971',
  'IL': '+972',
  'TH': '+66',
  'SG': '+65',
  'MY': '+60',
  'ID': '+62',
  'PH': '+63',
  'VN': '+84',
  'NL': '+31',
  'BE': '+32',
  'CH': '+41',
  'AT': '+43',
  'SE': '+46',
  'NO': '+47',
  'DK': '+45',
  'FI': '+358',
  'PL': '+48',
  'CZ': '+420',
  'HU': '+36',
  'RO': '+40',
  'BG': '+359',
  'GR': '+30',
  'PT': '+351',
  'IE': '+353',
  'NZ': '+64',
};

// Función de utilidad para obtener el código telefónico de un país
export const getPhoneCodeByCountry = (countryCode: string): string => {
  return countryToPhoneCode[countryCode] || '+61';
};

// Función de utilidad para obtener el código de país por código telefónico
export const getCountryByPhoneCode = (phoneCode: string): string => {
  const entry = Object.entries(countryToPhoneCode).find(([_, code]) => code === phoneCode);
  return entry ? entry[0] : 'AU';
};

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  minWidth?: number;
  size?: 'small' | 'medium';
  sx?: any;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  minWidth = 100,
  size = 'medium',
  sx = {}
}) => {
  const countries: CountryData[] = [
    { code: 'AU', name: 'Australia', phoneCode: '+61' },
    { code: 'US', name: 'United States', phoneCode: '+1' },
    { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
    { code: 'ES', name: 'Spain', phoneCode: '+34' },
    { code: 'MX', name: 'Mexico', phoneCode: '+52' },
    { code: 'CA', name: 'Canada', phoneCode: '+1' },
    { code: 'FR', name: 'France', phoneCode: '+33' },
    { code: 'DE', name: 'Germany', phoneCode: '+49' },
    { code: 'IT', name: 'Italy', phoneCode: '+39' },
    { code: 'BR', name: 'Brazil', phoneCode: '+55' },
    { code: 'AR', name: 'Argentina', phoneCode: '+54' },
    { code: 'CL', name: 'Chile', phoneCode: '+56' },
    { code: 'CO', name: 'Colombia', phoneCode: '+57' },
    { code: 'PE', name: 'Peru', phoneCode: '+51' },
    { code: 'VE', name: 'Venezuela', phoneCode: '+58' },
    { code: 'JP', name: 'Japan', phoneCode: '+81' },
    { code: 'KR', name: 'South Korea', phoneCode: '+82' },
    { code: 'CN', name: 'China', phoneCode: '+86' },
    { code: 'IN', name: 'India', phoneCode: '+91' },
    { code: 'RU', name: 'Russia', phoneCode: '+7' },
    { code: 'ZA', name: 'South Africa', phoneCode: '+27' },
    { code: 'NG', name: 'Nigeria', phoneCode: '+234' },
    { code: 'EG', name: 'Egypt', phoneCode: '+20' },
    { code: 'TR', name: 'Turkey', phoneCode: '+90' },
    { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
    { code: 'AE', name: 'UAE', phoneCode: '+971' },
    { code: 'IL', name: 'Israel', phoneCode: '+972' },
    { code: 'TH', name: 'Thailand', phoneCode: '+66' },
    { code: 'SG', name: 'Singapore', phoneCode: '+65' },
    { code: 'MY', name: 'Malaysia', phoneCode: '+60' },
    { code: 'ID', name: 'Indonesia', phoneCode: '+62' },
    { code: 'PH', name: 'Philippines', phoneCode: '+63' },
    { code: 'VN', name: 'Vietnam', phoneCode: '+84' },
    { code: 'NL', name: 'Netherlands', phoneCode: '+31' },
    { code: 'BE', name: 'Belgium', phoneCode: '+32' },
    { code: 'CH', name: 'Switzerland', phoneCode: '+41' },
    { code: 'AT', name: 'Austria', phoneCode: '+43' },
    { code: 'SE', name: 'Sweden', phoneCode: '+46' },
    { code: 'NO', name: 'Norway', phoneCode: '+47' },
    { code: 'DK', name: 'Denmark', phoneCode: '+45' },
    { code: 'FI', name: 'Finland', phoneCode: '+358' },
    { code: 'PL', name: 'Poland', phoneCode: '+48' },
    { code: 'CZ', name: 'Czech Republic', phoneCode: '+420' },
    { code: 'HU', name: 'Hungary', phoneCode: '+36' },
    { code: 'RO', name: 'Romania', phoneCode: '+40' },
    { code: 'BG', name: 'Bulgaria', phoneCode: '+359' },
    { code: 'GR', name: 'Greece', phoneCode: '+30' },
    { code: 'PT', name: 'Portugal', phoneCode: '+351' },
    { code: 'IE', name: 'Ireland', phoneCode: '+353' },
    { code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
  ];

  return (
    <FormControl 
      size={size}
      sx={{ 
        minWidth,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...sx
      }}
    >
      <Select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        displayEmpty
        IconComponent={ExpandMore}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }
        }}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReactCountryFlag 
                countryCode={country.code} 
                svg 
                style={{ width: '1.2em', height: '1.2em' }} 
              />
              <Typography variant="body2">{country.phoneCode}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;

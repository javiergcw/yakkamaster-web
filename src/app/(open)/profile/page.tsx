'use client';

import { Flavor } from '@/types/flavors';
import { UnifiedDoctorProfile } from '@/widgets/profileComponents';
import { Container } from '@mui/material';

export default function ProfilePage() {
  // Usando el mismo flavor que en la página principal
  const selectedFlavor = Flavor.SPORT; // Cambia aquí: SPORT, LABOUR, HOSPITALITY

  return (
      <UnifiedDoctorProfile 
        selectedFlavor={selectedFlavor}
      />
  );
}
'use client';

import { Flavor } from '@/types/flavors';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';
import { UnifiedDoctorProfile } from '@/widgets/profileComponents';
import { Container } from '@mui/material';

export default function ProfilePage() {
  // Usar flavor global
  const selectedFlavor = CURRENT_FLAVOR;

  return (
      <UnifiedDoctorProfile 
        selectedFlavor={selectedFlavor}
      />
  );
}
'use client';

import React from 'react';
import { Box } from '@mui/material';

import { Flavor } from '@/types/flavors';
import { BannerJob, JobDetailCard } from '@/widgets/jobComponents';


       
export default function JobPage() {
  // Por defecto usamos SPORT, pero esto podría venir de props o contexto
  const selectedFlavor = Flavor.SPORT;

  return (
    <Box
    >
      <BannerJob selectedFlavor={selectedFlavor} />
      <JobDetailCard selectedFlavor={selectedFlavor} />
    </Box>
  );
}

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';
import { BannerJob, JobDetailCard } from '@/widgets/jobComponents';


       
export default function JobPage() {
  // Usar flavor global
  const selectedFlavor = CURRENT_FLAVOR;

  return (
    <Box style={{ backgroundColor: "#ffffff" }}
    >
      <BannerJob selectedFlavor={selectedFlavor} />
      <JobDetailCard selectedFlavor={selectedFlavor} />
    </Box>
  );
}

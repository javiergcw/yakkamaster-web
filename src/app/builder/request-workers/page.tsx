'use client';

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ConstructionWorkerIcon } from '@/components/common/IconosSvg';
import { CURRENT_FLAVOR } from "@/types/favorGlobal";
import { Flavor } from '@/types/flavors';
import { flavorConfigs } from '@/types/flavors';
import { useRouter } from 'next/navigation';

export default function RequestWorkersPage() {
    const selectedFlavor = CURRENT_FLAVOR;
    const flavorConfig = flavorConfigs[selectedFlavor as Flavor];
    const router = useRouter();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff'
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    py: { xs: 3, sm: 2 },
                    pb: { xs: 1, sm: 2 },
                    px: { xs: 0, sm: 4, md: 6 }
                }}
            >
                <Container maxWidth="xl">
                    {/* Logo and Back Button */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                            component="img"
                            src="/YAKKA.webp"
                            alt="YAKKA"
                            sx={{
                                width: { xs: 100, sm: 150 },
                                height: { xs: 30, sm: 40 },
                                objectFit: 'contain'
                            }}
                        />
                        <Button
                            onClick={() => router.back()}
                            sx={{
                                ml: { xs: 1, sm: 2 },
                                minWidth: 'auto',
                                p: 0.5,
                                backgroundColor: '#f5f5f5',
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0'
                                }
                            }}
                        >
                            <ArrowBackIcon style={{ fontSize: '24px', color: '#000000' }} />
                        </Button>
                    </Box>

                    {/* Title */}
                    <Box sx={{ textAlign: 'center', mt: { xs: 1, sm: 2 }, px: { xs: 2, sm: 4, md: 6 } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                mb: 4,
                                mt: 4,
                                fontSize: { xs: '24px', sm: '32px', md: '36px' }
                            }}
                        >
                            Request Workers
                        </Typography>
                    </Box>
                </Container>

                {/* Full width line */}
                <Box
                    sx={{
                        width: '100vw',
                        height: '1px',
                        backgroundColor: '#d1d5db',
                        mt: 0,
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                />
            </Box>

            {/* Content */}
            <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4, md: 8 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                        px: { xs: 2, sm: 4, md: 6 }
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <ConstructionWorkerIcon
                            color={flavorConfig.primaryColor}
                            fontSize={70}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#000000',
                            mb: 5,

                            textAlign: 'center'
                        }}
                    >
                        Currently, you have no active workers
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: '#666666',
                            mb: 4,
                            textAlign: 'center',
                            maxWidth: '400px'
                        }}
                    >
                      Workers will show up here once they begin working.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: flavorConfig.primaryColor,
                            color: '#FFFFFF',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 800,
                            px: 6,
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: flavorConfig.buttonHoverColor,
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Request workers
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Tabs,
    Tab,
    Container
} from '@mui/material';
import WorkerCard from "@/components/jobSites/WorkerCard";
import { CURRENT_FLAVOR } from "@/types/favorGlobal";
import { Flavor } from '@/types/flavors';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ConstructionWorkerIcon, ConstructorWithHardHatIcon } from '@/components/common/IconosSvg';
import { flavorConfigs } from '@/types/flavors';
import { useRouter } from 'next/navigation';


interface Worker {
    id: string;
    name: string;
    role: string;
    hourlyRate: string;
    profileImage?: string;
    isActive: boolean;
}

    export default function ManageYourStaftPage() {
    const selectedFlavor = CURRENT_FLAVOR;
    const [activeTab, setActiveTab] = useState(0);
    const flavorConfig = flavorConfigs[selectedFlavor as Flavor];
    const router = useRouter();

    // Datos de ejemplo - en una app real vendrían de una API
    const [workers] = useState<Worker[]>([

        {
            id: '3',
            name: 'Carlos Mendez',
            role: 'Plumber',
            hourlyRate: '32.00',
            profileImage: '/img/profile-placeholder.jpg',
            isActive: false
        },
        // {
        //     id: '4',
        //     name: 'Carlos Mendez',
        //     role: 'Plumber',
        //     hourlyRate: '32.00',
        //     profileImage: '/img/profile-placeholder.jpg',
        //     isActive: true
        // }
    ]);

    const activeWorkers = workers.filter(worker => worker.isActive);
    const inactiveWorkers = workers.filter(worker => !worker.isActive);
    const currentWorkers = activeTab === 0 ? activeWorkers : inactiveWorkers;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleChat = (workerId: string) => {
        console.log('Chat with worker:', workerId);
    };

    const handleRate = (workerId: string) => {
        console.log('Rate worker:', workerId);
    };

    const handleExtend = (workerId: string, shiftData: any) => {
        console.log('Extend worker:', workerId, shiftData);
    };

    const handleUnhire = (workerId: string) => {
        console.log('Unhire worker:', workerId);
    };

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
                                fontSize: { xs: '24px', sm: '32px', md: '36px' }
                            }}
                        >
                            Workers
                        </Typography>
                    </Box>

                    {/* Tabs */}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: flavorConfig.primaryColor,
                                    height: 3
                                },
                                '& .MuiTab-root': {
                                    color: '#666666',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    textTransform: 'none',
                                    minWidth: '150px',
                                    '&.Mui-selected': {
                                        color: '#000000'
                                    }
                                }
                            }}
                        >
                            <Tab label="Active" />
                            <Tab label="Inactive" />
                        </Tabs>
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
                {/* Workers List or Empty State */}
                {currentWorkers.length > 0 ? (
                    <>
                        {/* Jobsite Info */}
                        <Box sx={{ mb: 3, px: { xs: 2, sm: 4, md: 6 } }}>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: '#666666',
                                    fontWeight: 500
                                }}
                            >
                                Jobsite: 10 Bent Street, Petersham NSW, Australia, Ku-ring-gal Council, Sydney
                            </Typography>
                        </Box>

                        {/* Workers Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                gap: 2,
                                px: { xs: 2, sm: 4, md: 6 }
                            }}
                        >
                            {currentWorkers.map((worker) => (
                                <WorkerCard
                                    key={worker.id}
                                    jobsite="10 Bent Street"
                                    workerName={worker.name}
                                    role={worker.role}
                                    hourlyRate={worker.hourlyRate}
                                    profileImage={worker.profileImage}
                                    selectedFlavor={selectedFlavor as Flavor}
                                    onChat={() => handleChat(worker.id)}
                                    onRate={() => handleRate(worker.id)}
                                    onExtend={(shiftData) => handleExtend(worker.id, shiftData)}
                                    onUnhire={() => handleUnhire(worker.id)}
                                />
                            ))}
                        </Box>
                    </>
                ) : (
                    /* Empty State */
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
                                mb: 2,
                                textAlign: 'center'
                            }}
                        >
                            Currently, you have no {activeTab === 0 ? 'active' : 'inactive'} workers
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
                                backgroundColor: '#FFD904',
                                color: '#000000',
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 800,
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    backgroundColor: '#E6C200',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            Request workers
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
}   
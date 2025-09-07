'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    useTheme
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';
import CreateJobsiteModal, { JobsiteFormData } from '@/components/common/CreateJobsiteModal';
import JobsiteCard, { JobsiteCardData } from '@/components/common/JobsiteCard';

// Datos de ejemplo de jobsites
const jobsitesData: JobsiteCardData[] = [
    {
        id: 1,
        title: "1 test ridge",
        location: "Sydney",
        description: "testing jobsite"
    },
    {
        id: 2,
        title: "Labour hire and Jobs YAKKA app, York Street, Sydney NSW, Australia",
        location: "Albury-Wodonga",
        description: "Test site for Yakka Labour"
    },
    {
        id: 3,
        title: "Adelaide Hills, SA, Australia",
        location: "Adelaide",
        description: "job site on the right with the big tree in front"
    },
    {
        id: 4,
        title: "10 Bent Street, Petersham NSW, Australia",
        location: "Sydney"
    },
    {
        id: 5,
        title: "New Place Japanese Kitchen, Beaufort Street, Mount Lawley WA, Australia",
        location: "Melbourne"
    },
    {
        id: 6,
        title: "1 Australia Avenue, Sydney Olympic Park NSW, Australia",
        location: "Sydney",
        description: "the big building on the corner"
    },
    {
        id: 7,
        title: "100 Reed Street, Redfern NSW, Australia",
        location: "Adelaide"
    }
];

export default function JobsitePage() {
    const theme = useTheme();
    const router = useRouter();
    
    // Usar el flavor para los colores
    const selectedFlavor = Flavor.LABOUR; // Por defecto SPORT, se puede cambiar
    const config = flavorConfigs[selectedFlavor];
    
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSaveJobsite = (data: JobsiteFormData) => {
        console.log('Saving jobsite:', data);
        // Aquí iría la lógica para guardar el jobsite
    };

    const handleEditJobsite = (jobsite: JobsiteCardData) => {
        console.log('Editing jobsite:', jobsite);
        // Aquí iría la lógica para editar el jobsite
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: { xs: '10px 0', sm: '15px', md: '20px' }
            }}
        >
            {/* Header */}
            <Container 
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Box sx={{ mb: 4 }}>
                    {/* Logo y navegación */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: { xs: 2, md: 3 }
                    }}>
                        {/* Flecha y logo a la izquierda */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton
                                onClick={() => router.back()}
                                sx={{
                                    color: '#000000',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#000000',
                                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Casco amarillo */}
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 16,
                                            backgroundColor: '#FFD700',
                                            borderRadius: '50% 50% 40% 40%',
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 2,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: 2,
                                                height: 8,
                                                backgroundColor: '#000000',
                                                borderRadius: '1px'
                                            }
                                        }}
                                    />
                                    {/* Letra Y */}
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            bottom: 2,
                                            color: '#000000',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            lineHeight: 1
                                        }}
                                    >
                                        Y
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: '24px'
                                    }}
                                >
                                    YAKKA
                                </Typography>
                            </Box>
                        </Box>

                    </Box>

                    {/* Título y descripción */}
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '28px', md: '30px' },
                            }}
                        >
                            Jobsites
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(0,0,0,0.7)',
                                    fontSize: '16px',
                                    flex: 1,
                                    minWidth: '300px'
                                }}
                            >
                                Here you can see all your jobsites. You can edit, add or remove any jobsite.
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleOpenModal}
                                sx={{
                                    borderColor: '#E0E0E0',
                                    color: '#000000',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1,
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        borderColor: '#BDBDBD',
                                        backgroundColor: '#f9f9f9'
                                    }
                                }}
                            >
                                Create new a jobsite
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Lista de jobsites */}
                <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, gridAutoRows: '1fr' }}>
                        {jobsitesData.map((jobsite) => (
                            <JobsiteCard
                                key={jobsite.id}
                                jobsite={jobsite}
                                onEdit={handleEditJobsite}
                                showEditButton={true}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* Modal para crear nuevo jobsite */}
            <CreateJobsiteModal
                open={openModal}
                onClose={handleCloseModal}
                onSave={handleSaveJobsite}
                selectedFlavor={selectedFlavor}
            />
        </Box>
    );
}
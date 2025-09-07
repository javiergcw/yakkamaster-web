'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Card,
    CardContent,
} from '@mui/material';
import {
    Add as AddIcon,
    EditOutlined as EditOutlinedIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';
import CreateJobsiteModal, { JobsiteFormData } from '@/components/common/CreateJobsiteModal';
import { JobsiteCardData } from '@/components/common/JobsiteCard';

interface JobsiteSelectorProps {
    selectedFlavor: Flavor;
    jobsitesData: JobsiteCardData[];
    onNext?: (data: { selectedJobsite: JobsiteCardData | null }) => void;
    onBack?: () => void;
}

export default function JobsiteSelector({ 
    selectedFlavor, 
    jobsitesData, 
    onNext, 
    onBack 
}: JobsiteSelectorProps) {
    const router = useRouter();
    const config = flavorConfigs[selectedFlavor];
    
    const [selectedJobsite, setSelectedJobsite] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSaveJobsite = (data: JobsiteFormData) => {
        try {
            console.log('Saving jobsite:', data);
            // Aquí iría la lógica para guardar el jobsite
            // Por ejemplo: await saveJobsite(data);
            handleCloseModal();
        } catch (error) {
            console.error('Error saving jobsite:', error);
            // Aquí se podría mostrar un toast de error
        }
    };

    const handleEditJobsite = (jobsite: JobsiteCardData) => {
        console.log('Editing jobsite:', jobsite);
        // Aquí iría la lógica para editar el jobsite
    };

    const handleNext = () => {
        if (!selectedJobsite) {
            console.warn('No jobsite selected');
            return;
        }
        
        const selected = jobsitesData.find(jobsite => jobsite.id === selectedJobsite);
        if (onNext) {
            onNext({ selectedJobsite: selected || null });
        }
    };


    // Validar que hay jobsites disponibles
    if (!jobsitesData || jobsitesData.length === 0) {
        return (
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'left',
                    justifyContent: 'left',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    No jobsites available
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                >
                    Create your first jobsite
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: { xs: '10px 0', sm: '15px', md: '20px' }
            }}
        >
            <Container 
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >

                {/* Botones Create new y Next */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: { xs: 'center', sm: 'flex-end' }, 
                    alignItems: 'center', 
                    gap: { xs: 1, sm: 2 },
                    mb: 4,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleOpenModal}
                        sx={{
                            borderColor: '#E0E0E0',
                            color: '#000000',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            px: { xs: 2, sm: 3 },
                            py: 1,
                            textTransform: 'capitalize',
                            fontSize: { xs: '12px', sm: '14px' },
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                borderColor: '#BDBDBD',
                                backgroundColor: '#f9f9f9'
                            }
                        }}
                    >
                        Create new a jobsite
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!selectedJobsite}
                        sx={{
                            backgroundColor: config.buttonColor,
                            color: '#ffffff',
                            borderRadius: '8px',
                            px: { xs: 2, sm: 3 },
                            py: 1,
                            textTransform: 'capitalize',
                            fontSize: { xs: '12px', sm: '14px' },
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                backgroundColor: config.buttonHoverColor
                            },
                            '&:disabled': {
                                backgroundColor: '#E0E0E0',
                                color: '#9E9E9E'
                            }
                        }}
                    >
                        Next
                    </Button>
                </Box>

                {/* Título y descripción */}
                <Box sx={{ textAlign: 'left', mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#000000',
                            fontSize: { xs: '24px', sm: '28px', md: '30px' },
                            mb: 1
                        }}
                    >
                        Jobsites
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'rgba(0,0,0,0.7)',
                            fontSize: { xs: '14px', sm: '16px' },
                        
                        }}
                    >
                        Select an existing jobsite or create a new one to request workers.
                    </Typography>
                </Box>

                {/* Lista de jobsites responsive */}
                <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <RadioGroup
                        value={selectedJobsite}
                        onChange={(e) => setSelectedJobsite(Number(e.target.value))}
                    >
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { 
                                xs: '1fr', 
                                sm: '1fr', 
                                md: '1fr 1fr' 
                            }, 
                            gap: { xs: 2, sm: 3, md: 4 },
                            gridAutoRows: '1fr',
                            alignItems: 'stretch'
                        }}>
                            {/* Todas las tarjetas en un solo grid responsive */}
                            {jobsitesData.map((jobsite) => (
                                <Card
                                    key={jobsite.id}
                                    sx={{
                                        width: '100%',
                                        border: '2px solid #E0E0E0',
                                        borderRadius: { xs: '6px', sm: '8px' },
                                        backgroundColor: '#ffffff',
                                        boxShadow: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            border: '2px solid #BDBDBD'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ 
                                        p: { xs: 1.5, sm: 2 }, 
                                        '&:last-child': { pb: { xs: 1.5, sm: 2 } }, 
                                        flex: 1, 
                                        display: 'flex', 
                                        flexDirection: 'column' 
                                    }}>
                                        <FormControlLabel
                                            value={jobsite.id}
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: '#000000',
                                                        '&.Mui-checked': {
                                                            color: config.primaryColor
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'flex-start', 
                                                    justifyContent: 'space-between', 
                                                    width: '100%', 
                                                    flex: 1,
                                                    gap: 2
                                                }}>
                                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 500,
                                                                fontSize: { xs: '14px', sm: '15px' },
                                                                color: '#000000',
                                                                mb: 0.5,
                                                                wordBreak: 'break-word'
                                                            }}
                                                        >
                                                            {jobsite.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: 'rgba(0,0,0,0.6)',
                                                                fontSize: { xs: '13px', sm: '14px' }
                                                            }}
                                                        >
                                                            {jobsite.location}
                                                        </Typography>
                                                    </Box>
                                                    <Button
                                                        variant="text"
                                                        startIcon={<EditOutlinedIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                                                        onClick={() => handleEditJobsite(jobsite)}
                                                        sx={{
                                                            color: '#000000',
                                                            textTransform: 'capitalize',
                                                            gap: 0.5,
                                                            minWidth: 'auto',
                                                            fontSize: { xs: '12px', sm: '14px' },
                                                            px: { xs: 1, sm: 2 },
                                                            py: { xs: 0.5, sm: 1 },
                                                            flexShrink: 0,
                                                            alignSelf: 'flex-start',
                                                            '&:hover': {
                                                                backgroundColor: 'transparent'
                                                            }
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                </Box>
                                            }
                                            sx={{
                                                margin: 0,
                                                alignItems: 'flex-start',
                                                width: '100%',
                                                flex: 1,
                                                '& .MuiFormControlLabel-label': {
                                                    width: '100%',
                                                    flex: 1
                                                }
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </RadioGroup>
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



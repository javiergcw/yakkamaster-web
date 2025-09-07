'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    Chip
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface JobRequirementsData {
    selectedRequirements: string[];
    licenses: string;
    description: string;
}

interface JobRequirementsSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (data: { requirements: string[] }) => void;
    onBack?: () => void;
    onRequirementsChange?: (requirements: string[]) => void;
}

// Requisitos de trabajo disponibles
const jobRequirements = [
    'White Card',
    'Clean the Job Place',
    'Good English Level',
    'Heavy Lifting',
    'ABN job',
    'SWMS',
    'RSA',
    'Must have experience',
    'Demolition Job',
    'Women Only',
    'Full PPE'
];

const JobRequirementsSelector: React.FC<JobRequirementsSelectorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onRequirementsChange
}) => {
    const config = flavorConfigs[selectedFlavor];

    const [jobRequirementsData, setJobRequirementsData] = useState<JobRequirementsData>({
        selectedRequirements: [],
        licenses: '',
        description: ''
    });

    // Notificar cuando cambien los requisitos
    useEffect(() => {
        if (onRequirementsChange) {
            onRequirementsChange(jobRequirementsData.selectedRequirements);
        }
    }, [jobRequirementsData.selectedRequirements, onRequirementsChange]);

    const handleRequirementToggle = (requirement: string) => {
        setJobRequirementsData(prev => ({
            ...prev,
            selectedRequirements: prev.selectedRequirements.includes(requirement)
                ? prev.selectedRequirements.filter(req => req !== requirement)
                : [...prev.selectedRequirements, requirement]
        }));
    };

    const handleLicensesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobRequirementsData(prev => ({
            ...prev,
            licenses: event.target.value
        }));
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobRequirementsData(prev => ({
            ...prev,
            description: event.target.value
        }));
    };


    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: { xs: '8px 0', sm: '15px', md: '20px' }
            }}
        >
            <Container 
                maxWidth="lg"
                sx={{
                    px: { xs: 1, sm: 3, md: 4 }
                }}
            >
                <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    {/* Título principal */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 2 } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                fontSize: { xs: '20px', sm: '28px', md: '30px' },
                                mb: 1,
                                lineHeight: { xs: 1.2, sm: 1.3 }
                            }}
                        >
                            What details do you need for this job?
                        </Typography>
                    </Box>

                    {/* Sección de requisitos del trabajo */}
                    <Box sx={{ mb: { xs: 4, sm: 5 } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                mb: { xs: 2, sm: 3 },
                                textAlign: 'center'
                            }}
                        >
                            Job Requirements
                        </Typography>

                        {/* Grid de requisitos */}
                        <Box sx={{ 
                            display: 'grid',
                            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                            gap: { xs: 1, sm: 1.5 },
                            maxWidth: { xs: '100%', sm: '800px' },
                            margin: '0 auto',
                            px: { xs: 1, sm: 0 }
                        }}>
                            {jobRequirements.map((requirement) => (
                                <Button
                                    key={requirement}
                                    variant="outlined"
                                    onClick={() => handleRequirementToggle(requirement)}
                                    sx={{
                                        border: '1px solid #000000 !important',
                                        borderBottom: '2px solid #000000 !important',
                                        backgroundColor: jobRequirementsData.selectedRequirements.includes(requirement) 
                                            ? config.primaryColor 
                                            : '#ffffff',
                                        color: jobRequirementsData.selectedRequirements.includes(requirement) 
                                            ? '#ffffff' 
                                            : '#000000',
                                        borderRadius: { xs: '8px', sm: '10px' },
                                        py: { xs: 1, sm: 1.2 },
                                        px: { xs: 1, sm: 1.5 },
                                        textTransform: 'none',
                                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                        fontWeight: '500',
                                        minHeight: { xs: '40px', sm: '48px' },
                                        textAlign: 'center',
                                        '&:hover': {
                                            borderColor: config.primaryColor,
                                            backgroundColor: jobRequirementsData.selectedRequirements.includes(requirement) 
                                                ? config.buttonHoverColor 
                                                : 'rgba(0,0,0,0.04)',
                                        }
                                    }}
                                >
                                    {requirement}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Sección de licencias */}
                    <Box sx={{ mb: { xs: 4, sm: 5 } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                mb: { xs: 2, sm: 3 },
                                textAlign: 'center'
                            }}
                        >
                            List any required licenses, tickets, or insurances
                        </Typography>

                        <Box sx={{ 
                            maxWidth: { xs: '100%', sm: '600px' },
                            margin: '0 auto',
                            px: { xs: 1, sm: 0 }
                        }}>
                            <TextField
                                fullWidth
                                placeholder="Add tickets/license or other"
                                value={jobRequirementsData.licenses}
                                onChange={handleLicensesChange}
                                 sx={{
                                     '& .MuiOutlinedInput-root': {
                                         borderRadius: { xs: '6px', sm: '8px' },
                                         backgroundColor: '#ffffff',
                                         '& fieldset': {
                                             borderColor: '#E0E0E0',
                                             borderWidth: '2px',
                                         },
                                         '&:hover fieldset': {
                                             borderColor: '#BDBDBD',
                                             borderWidth: '2px',
                                         },
                                         '&.Mui-focused fieldset': {
                                             borderColor: config.primaryColor,
                                             borderWidth: '2px',
                                         },
                                     },
                                     '& .MuiInputBase-input': {
                                         py: { xs: 1.2, sm: 1.5 },
                                         fontSize: { xs: '14px', sm: '16px' }
                                     }
                                 }}
                            />
                        </Box>
                    </Box>

                    {/* Sección de descripción */}
                    <Box sx={{ mb: { xs: 4, sm: 5 } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                mb: { xs: 2, sm: 3 },
                                textAlign: 'center'
                            }}
                        >
                            Description
                        </Typography>

                        <Box sx={{ 
                            maxWidth: { xs: '100%', sm: '800px' },
                            margin: '0 auto',
                            px: { xs: 1, sm: 0 }
                        }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666666',
                                    fontSize: { xs: '12px', sm: '14px' },
                                    mb: 2,
                                    textAlign: 'center'
                                }}
                            >
                                Briefly explain what the worker will be doing and if they need to bring their own tools.
                            </Typography>

                            <Box sx={{ 
                                display: 'flex',
                                gap: { xs: 1, sm: 2 },
                                alignItems: 'flex-start'
                            }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Description..."
                                    value={jobRequirementsData.description}
                                    onChange={handleDescriptionChange}
                                     sx={{
                                         '& .MuiOutlinedInput-root': {
                                             borderRadius: { xs: '6px', sm: '8px' },
                                             backgroundColor: '#ffffff',
                                             '& fieldset': {
                                                 borderColor: '#E0E0E0',
                                                 borderWidth: '2px',
                                             },
                                             '&:hover fieldset': {
                                                 borderColor: '#BDBDBD',
                                                 borderWidth: '2px',
                                             },
                                             '&.Mui-focused fieldset': {
                                                 borderColor: config.primaryColor,
                                                 borderWidth: '2px',
                                             },
                                         },
                                         '& .MuiInputBase-input': {
                                             fontSize: { xs: '14px', sm: '16px' },
                                             lineHeight: 1.5
                                         }
                                     }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: config.primaryColor,
                                        color: '#ffffff',
                                        borderRadius: { xs: '20px', sm: '24px' },
                                        px: { xs: 2, sm: 3 },
                                        py: { xs: 1, sm: 1.5 },
                                        textTransform: 'none',
                                        fontSize: { xs: '12px', sm: '14px' },
                                        fontWeight: '600',
                                        minHeight: { xs: '40px', sm: '48px' },
                                        minWidth: { xs: '60px', sm: '80px' },
                                        alignSelf: 'flex-start',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            backgroundColor: config.buttonHoverColor,
                                            boxShadow: 'none',
                                        }
                                    }}
                                >
                                    Done
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default JobRequirementsSelector;

'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    Alert
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface SupervisorData {
    requiresSupervisor: boolean | null;
    supervisorName: string;
}

interface SupervisorSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (data: { supervisor: string | null }) => void;
    onBack?: () => void;
    onSupervisorChange?: (supervisor: string | null) => void;
}

const SupervisorSelector: React.FC<SupervisorSelectorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onSupervisorChange
}) => {
    const config = flavorConfigs[selectedFlavor];

    const [supervisorData, setSupervisorData] = useState<SupervisorData>({
        requiresSupervisor: null,
        supervisorName: ''
    });

    // Notificar cuando cambie el supervisor
    useEffect(() => {
        if (onSupervisorChange && supervisorData.requiresSupervisor !== null) {
            const supervisorValue = supervisorData.requiresSupervisor === true ? supervisorData.supervisorName : null;
            onSupervisorChange(supervisorValue);
        }
    }, [supervisorData.requiresSupervisor, supervisorData.supervisorName, onSupervisorChange]);

    const handleSupervisorRequirement = (requires: boolean) => {
        setSupervisorData(prev => ({
            ...prev,
            requiresSupervisor: requires,
            supervisorName: requires ? prev.supervisorName : ''
        }));
    };

    const handleSupervisorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupervisorData(prev => ({
            ...prev,
            supervisorName: event.target.value
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
                    <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
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
                            Does this job require a supervisor's signature?
                        </Typography>
                    </Box>

                    {/* Botones Yes/No */}
                    <Box sx={{ 
                        display: 'flex',
                        gap: { xs: 2, sm: 3 },
                        justifyContent: 'center',
                        mb: { xs: 4, sm: 5 }
                    }}>
                        <Button
                            variant="outlined"
                            onClick={() => handleSupervisorRequirement(true)}
                            sx={{
                                border: '2px solid #000000',
                                borderBottom: '3px solid #000000',
                                backgroundColor: supervisorData.requiresSupervisor === true 
                                    ? config.primaryColor 
                                    : '#ffffff',
                                color: supervisorData.requiresSupervisor === true 
                                    ? '#ffffff' 
                                    : '#000000',
                                borderRadius: { xs: '8px', sm: '10px' },
                                py: { xs: 1.5, sm: 2 },
                                px: { xs: 3, sm: 4 },
                                textTransform: 'none',
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                fontWeight: '600',
                                minHeight: { xs: '50px', sm: '60px' },
                                minWidth: { xs: '100px', sm: '120px' },
                                '&:hover': {
                                    borderColor: config.primaryColor,
                                    backgroundColor: supervisorData.requiresSupervisor === true 
                                        ? config.buttonHoverColor 
                                        : 'rgba(0,0,0,0.04)',
                                }
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleSupervisorRequirement(false)}
                            sx={{
                                border: '2px solid #000000',
                                borderBottom: '3px solid #000000',
                                backgroundColor: supervisorData.requiresSupervisor === false 
                                    ? config.primaryColor 
                                    : '#ffffff',
                                color: supervisorData.requiresSupervisor === false 
                                    ? '#ffffff' 
                                    : '#000000',
                                borderRadius: { xs: '8px', sm: '10px' },
                                py: { xs: 1.5, sm: 2 },
                                px: { xs: 3, sm: 4 },
                                textTransform: 'none',
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                fontWeight: '600',
                                minHeight: { xs: '50px', sm: '60px' },
                                minWidth: { xs: '100px', sm: '120px' },
                                '&:hover': {
                                    borderColor: config.primaryColor,
                                    backgroundColor: supervisorData.requiresSupervisor === false 
                                        ? config.buttonHoverColor 
                                        : 'rgba(0,0,0,0.04)',
                                }
                            }}
                        >
                            No
                        </Button>
                    </Box>

                    {/* Input del nombre del supervisor - Solo aparece cuando se selecciona Yes */}
                    {supervisorData.requiresSupervisor === true && (
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
                                Add supervisor's name
                            </Typography>

                            <Box sx={{ 
                                maxWidth: { xs: '100%', sm: '500px' },
                                margin: '0 auto',
                                px: { xs: 1, sm: 0 }
                            }}>
                                <TextField
                                    fullWidth
                                    placeholder="Supervisor name"
                                    value={supervisorData.supervisorName}
                                    onChange={handleSupervisorNameChange}
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
                    )}

                    {/* Aviso informativo - Solo aparece cuando se selecciona Yes */}
                    {supervisorData.requiresSupervisor === true && (
                        <Box sx={{ 
                            maxWidth: { xs: '100%', sm: '600px' },
                            margin: '0 auto',
                            mb: { xs: 4, sm: 5 }
                        }}>
                            <Alert 
                                severity="info"
                                sx={{
                                    backgroundColor: '#F5F5F5',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: { xs: '6px', sm: '8px' },
                                    '& .MuiAlert-icon': {
                                        color: '#666666'
                                    },
                                    '& .MuiAlert-message': {
                                        color: '#000000',
                                        fontSize: { xs: '12px', sm: '14px' },
                                        lineHeight: 1.4
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: { xs: '12px', sm: '14px' },
                                        mb: 0.5
                                    }}
                                >
                                    The supervisor must sign before the labourer submit the timesheet.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '12px', sm: '14px' },
                                        color: '#666666'
                                    }}
                                >
                                    If the labourer completes the timesheet incorrectly, you can always report it and edit it.
                                </Typography>
                            </Alert>
                        </Box>
                    )}

                </Box>
            </Container>
        </Box>
    );
};

export default SupervisorSelector;

'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Modal,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Close as CloseIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { JobsiteCardData } from './JobsiteCard';

interface CreateJobsiteModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: JobsiteFormData) => void;
    selectedFlavor?: Flavor;
    editingJobsite?: JobsiteCardData | null;
}

export interface JobsiteFormData {
    city: string;
    address: string;
    suburb: string;
    additionalInfo: string;
}

export default function CreateJobsiteModal({ 
    open, 
    onClose, 
    onSave, 
    selectedFlavor = Flavor.LABOUR,
    editingJobsite = null
}: CreateJobsiteModalProps) {
    const config = flavorConfigs[selectedFlavor];
    
    const [formData, setFormData] = useState<JobsiteFormData>({
        city: '',
        address: '',
        suburb: '',
        additionalInfo: ''
    });

    // Pre-llenar formulario cuando se está editando
    React.useEffect(() => {
        if (editingJobsite && open) {
            // Extraer información del jobsite para pre-llenar el formulario
            setFormData({
                city: editingJobsite.location || '',
                address: editingJobsite.title || '',
                suburb: '', // No tenemos suburb en JobsiteCardData, se puede agregar después
                additionalInfo: editingJobsite.description || ''
            });
        } else if (!editingJobsite && open) {
            // Limpiar formulario cuando se crea uno nuevo
            setFormData({
                city: '',
                address: '',
                suburb: '',
                additionalInfo: ''
            });
        }
    }, [editingJobsite, open]);

    const handleInputChange = (field: keyof JobsiteFormData) => (event: any) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSave = () => {
        onSave(formData);
        // Reset form
        setFormData({
            city: '',
            address: '',
            suburb: '',
            additionalInfo: ''
        });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    p: 4,
                    width: { xs: '90%', sm: '600px', md: '700px' },
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                {/* Header del modal */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#000000',
                            fontSize: '20px'
                        }}
                    >
                        {editingJobsite ? 'Edit Jobsite' : 'Where do you need labourers?'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#000000',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Línea divisora */}
                <Box
                    sx={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: '#E0E0E0',
                        mb: 3
                    }}
                />

                {/* Formulario */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Especificar ubicación */}
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#000000',
                                fontWeight: 'medium',
                                mb: 2,
                                fontSize: '14px'
                            }}
                        >
                            Specify the location
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* City */}
                            <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <Select
                                    value={formData.city}
                                    onChange={handleInputChange('city')}
                                    label="City"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                >
                                    <MenuItem value="sydney">Sydney</MenuItem>
                                    <MenuItem value="melbourne">Melbourne</MenuItem>
                                    <MenuItem value="brisbane">Brisbane</MenuItem>
                                    <MenuItem value="perth">Perth</MenuItem>
                                    <MenuItem value="adelaide">Adelaide</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Address */}
                            <TextField
                                fullWidth
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange('address')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px'
                                    }
                                }}
                            />

                            {/* Suburb */}
                            <TextField
                                fullWidth
                                placeholder="Suburb"
                                value={formData.suburb}
                                onChange={handleInputChange('suburb')}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px'
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Información adicional */}
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0,0,0,0.7)',
                                mb: 2,
                                fontSize: '14px',
                                lineHeight: 1.4
                            }}
                        >
                            Specify the place or provide a reference to make it easier for your laborers to find the place (optional)
                        </Typography>
                        
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Add more information"
                            value={formData.additionalInfo}
                            onChange={handleInputChange('additionalInfo')}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                }
                            }}
                        />
                    </Box>

                    {/* Botón Save */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: config.buttonColor,
                            color: '#ffffff',
                            borderRadius: '8px',
                            py: 1.5,
                            fontSize: '16px',
                            fontWeight: 'medium',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: config.buttonHoverColor
                            }
                        }}
                    >
                        {editingJobsite ? 'Update Jobsite' : 'Save Jobsite'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

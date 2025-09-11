'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Modal,
    TextField,
    useTheme
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface WorkerQuantitySelectorProps {
    selectedFlavor: Flavor;
    onNext?: (selectedQuantity: number | null) => void;
    onBack?: () => void;
    onSelectionChange?: (quantity: number | null) => void;
}

export default function WorkerQuantitySelector({ 
    selectedFlavor, 
    onNext, 
    onBack,
    onSelectionChange
}: WorkerQuantitySelectorProps) {
    const router = useRouter();
    const config = flavorConfigs[selectedFlavor];
    
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [customQuantity, setCustomQuantity] = useState('');

    const handleQuantitySelect = (quantity: number) => {
        setSelectedQuantity(quantity);
        if (onSelectionChange) {
            onSelectionChange(quantity);
        }
    };

    const handleCustomClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCustomQuantity('');
    };

    const handleSaveCustom = () => {
        const quantity = parseInt(customQuantity);
        if (quantity && quantity > 0) {
            setSelectedQuantity(quantity);
            if (onSelectionChange) {
                onSelectionChange(quantity);
            }
            setOpenModal(false);
            setCustomQuantity('');
        }
    };

    const handleNext = () => {
        if (onNext) {
            onNext(selectedQuantity);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    const quantities = [1, 2, 3, 4, 5];

    return (
        <Box
            sx={{
             
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
                    {/* Título */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                fontSize: { xs: '24px', sm: '28px', md: '30px' }
                            }}
                        >
                            How many labourers do you need?
                        </Typography>
                    </Box>

                    {/* Grid de cantidades */}
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: 2,
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {quantities.map((quantity) => (
                            <Button
                                key={quantity}
                                variant="outlined"
                                onClick={() => handleQuantitySelect(quantity)}
                                sx={{
                                    border: '1px solid #000000',
                                    borderColor: '#000000',
                                    borderBottom: '2px solid #000000',
                                    backgroundColor: selectedQuantity === quantity ? config.primaryColor : '#ffffff',
                                    color: selectedQuantity === quantity ? '#ffffff' : '#000000',
                                    borderRadius: '8px',
                                    py: 1,
                                    px: 2,
                                    textTransform: 'none',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    minHeight: '60px',
                                    '&:hover': {
                                        borderColor: '#000000',
                                        backgroundColor: selectedQuantity === quantity ? config.primaryColor : 'rgba(0,0,0,0.04)',
                                    }
                                }}
                            >
                                {quantity}
                            </Button>
                        ))}
                        
                        {/* Botón personalizado (More than 5) */}
                        <Button
                            variant="outlined"
                            onClick={handleCustomClick}
                            sx={{
                                border: '1px solid #000000',
                                borderColor: '#000000',
                                borderBottom: '2px solid #000000',
                                backgroundColor: selectedQuantity && !quantities.includes(selectedQuantity) ? config.primaryColor : '#ffffff',
                                color: selectedQuantity && !quantities.includes(selectedQuantity) ? '#ffffff' : '#000000',
                                borderRadius: '8px',
                                py: 1,
                                px: 2,
                                textTransform: 'none',
                                fontSize: selectedQuantity && !quantities.includes(selectedQuantity) ? '24px' : '16px',
                                fontWeight: 'bold',
                                minHeight: '60px',
                                '&:hover': {
                                    borderColor: '#000000',
                                    backgroundColor: selectedQuantity && !quantities.includes(selectedQuantity) ? config.primaryColor : 'rgba(0,0,0,0.04)',
                                }
                            }}
                        >
                            {selectedQuantity && !quantities.includes(selectedQuantity) ? selectedQuantity : 'More than 5'}
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Modal para cantidad personalizada */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
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
                        width: { xs: '90%', sm: '500px', md: '600px' },
                        position: 'relative'
                    }}
                >
                    {/* Header del modal */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                fontSize: '20px'
                            }}
                        >
                            How many labourers?
                        </Typography>
                        <IconButton
                            onClick={handleCloseModal}
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

                    {/* Contenido del modal */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                color: '#000000',
                                fontSize: '16px'
                            }}
                        >
                            Enter the number of labourers that you need
                        </Typography>
                        
                        <TextField
                            fullWidth
                            type="number"
                            placeholder="Enter number"
                            value={customQuantity}
                            onChange={(e) => setCustomQuantity(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSaveCustom}
                            disabled={!customQuantity || parseInt(customQuantity) <= 0}
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
                                },
                                '&:disabled': {
                                    backgroundColor: '#E0E0E0',
                                    color: '#9E9E9E'
                                }
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

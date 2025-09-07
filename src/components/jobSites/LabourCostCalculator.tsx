'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Card,
    CardContent,
    Divider,
    IconButton,
    InputAdornment,
    Modal,
    Button
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Flavor, flavorConfigs, FlavorConfig } from '@/types/flavors';

interface LabourCostData {
    wage: number;
    siteAllowance: number;
    leadingHandAllowance: number;
    productivityAllowance: number;
    overtimeRate: number;
    travelAllowance: number;
}

interface LabourCostCalculatorProps {
    selectedFlavor: Flavor;
    onNext?: (data: LabourCostData) => void;
    onBack?: () => void;
    onCostChange?: (cost: number | null) => void;
}

const LabourCostCalculator: React.FC<LabourCostCalculatorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onCostChange
}) => {
    const config: FlavorConfig = flavorConfigs[selectedFlavor];
    
    const [costData, setCostData] = useState<LabourCostData>({
        wage: 28.00,
        siteAllowance: 0.00,
        leadingHandAllowance: 0.00,
        productivityAllowance: 0.00,
        overtimeRate: 0.00,
        travelAllowance: 0.00
    });

    const [summary, setSummary] = useState({
        serviceFee: 0,
        gst: 0,
        totalCost: 0
    });

    const [openModal, setOpenModal] = useState(false);
    const [editingField, setEditingField] = useState<keyof LabourCostData | null>(null);
    const [tempValue, setTempValue] = useState('');

    // Calcular resumen automáticamente
    useEffect(() => {
        const serviceFee = costData.wage * 0.10; // 10% service fee
        const gst = serviceFee * 0.10; // 10% GST on service fee
        const totalCost = costData.wage + serviceFee + gst;
        
        const finalCost = Number(totalCost.toFixed(2));
        setSummary({
            serviceFee: Number(serviceFee.toFixed(2)),
            gst: Number(gst.toFixed(2)),
            totalCost: finalCost
        });
    }, [costData.wage]);

    // Notificar el cambio de costo cuando cambie el summary
    useEffect(() => {
        if (onCostChange && summary.totalCost > 0) {
            onCostChange(summary.totalCost);
        }
    }, [summary.totalCost, onCostChange]);

    const handleInputChange = (field: keyof LabourCostData, value: string) => {
        const numericValue = parseFloat(value) || 0;
        setCostData(prev => ({
            ...prev,
            [field]: numericValue
        }));
    };

    const handleNext = () => {
        if (onNext) {
            onNext(costData);
        }
    };

    const handleFieldClick = (field: keyof LabourCostData) => {
        setEditingField(field);
        setTempValue(costData[field].toString());
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingField(null);
        setTempValue('');
    };

    const handleConfirmRate = () => {
        if (editingField) {
            const numericValue = parseFloat(tempValue) || 0;
            setCostData(prev => ({
                ...prev,
                [editingField]: numericValue
            }));
        }
        handleCloseModal();
    };

    const handleIncrement = () => {
        const currentValue = parseFloat(tempValue) || 0;
        setTempValue((currentValue + 1).toString());
    };

    const handleDecrement = () => {
        const currentValue = parseFloat(tempValue) || 0;
        if (currentValue > 0) {
            setTempValue((currentValue - 1).toString());
        }
    };

    const CostInputField: React.FC<{
        label: string;
        value: number;
        onChange: (value: string) => void;
        required?: boolean;
        description?: string;
        suffix?: string;
        showDivider?: boolean;
        fieldKey?: keyof LabourCostData;
    }> = ({ label, value, onChange, required = false, description, suffix = '/hr', showDivider = false, fieldKey }) => (
        <Box sx={{ mb: 3 }}>
            <Box
                onClick={() => fieldKey && handleFieldClick(fieldKey)}
                sx={{
                    backgroundColor: '#F6F6F6',
                    border: '1px solid #000000',
                    borderBottom: '2px solid #000000',
                    borderRadius: '8px',
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: config.primaryColor,
                    }
                }}
            >
                {/* Top section with label and value */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: (showDivider || description) ? 1 : 0
                }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#000000',
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        {label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#999999',
                                fontSize: '14px'
                            }}
                        >
                            ${value.toFixed(2)}{suffix}
                        </Typography>
                        <IconButton size="small" sx={{ color: '#666',  }}>
                            <ArrowForwardIosIcon sx={{ fontSize: '14px' }} />
                        </IconButton>
                    </Box>
                </Box>
                
                {/* Divider line */}
                {(showDivider || description) && (
                    <Divider sx={{ mb: 1, borderBottomWidth: 2 }} />
                )}
                
                {/* Required field message */}
                {required && (
                    <Typography variant="caption" sx={{ 
                        color: '#666666', 
                        fontSize: '12px',
                        display: 'block'
                    }}>
                        This field is required.
                    </Typography>
                )}
                
                {/* Description inside the card */}
                {description && (
                    <Typography variant="caption" sx={{ 
                        color: '#666666', 
                        fontSize: '12px',
                        display: 'block'
                    }}>
                        {description}
                    </Typography>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ 
            backgroundColor: '#ffffff',
        }}>
            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 2, sm: 3},
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                {/* Título principal */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#000000',
                            fontSize: { xs: '24px', sm: '28px', md: '30px' },
                            mb: 1
                        }}
                    >
                        Calculate your labour costs
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666666',
                            fontSize: { xs: '14px', sm: '16px' }
                        }}
                    >
                        Tap on and edit each field to calculate your total labour cost.
                    </Typography>
                </Box>

                {/* Layout de dos columnas */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                    gap: { xs: 3, lg: 6 },
                    alignItems: 'start'
                }}>
                    {/* Columna izquierda - Campos de entrada */}
                    <Box>
                        {/* Adjustable Costs */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#000000',
                                    fontSize: { xs: '16px', sm: '18px' },
                                    mb: 3,
                                    textAlign: 'left'
                                }}
                            >
                                Adjustable Costs
                            </Typography>

                            <CostInputField
                                label="Wage (Hourly Rate)*"
                                value={costData.wage}
                                onChange={(value) => handleInputChange('wage', value)}
                                required={true}
                                showDivider={true}
                                fieldKey="wage"
                            />

                            <CostInputField
                                label="Site Allowance"
                                value={costData.siteAllowance}
                                onChange={(value) => handleInputChange('siteAllowance', value)}
                                fieldKey="siteAllowance"
                            />

                            <CostInputField
                                label="Leading Hand Allowance"
                                value={costData.leadingHandAllowance}
                                onChange={(value) => handleInputChange('leadingHandAllowance', value)}
                                fieldKey="leadingHandAllowance"
                            />

                            <CostInputField
                                label="Productivity Allowance"
                                value={costData.productivityAllowance}
                                onChange={(value) => handleInputChange('productivityAllowance', value)}
                                fieldKey="productivityAllowance"
                            />
                        </Box>

                        {/* Extras */}
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#000000',
                                    fontSize: { xs: '16px', sm: '18px' },
                                    textAlign: 'center'
                                }}
                            >
                                Extras
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666666',
                                    mb: 2,
                                    fontSize: '14px',
                                    textAlign: 'center'
                                }}
                            >
                                No additional service fees apply
                            </Typography>

                            <CostInputField
                                label="Overtime Rate"
                                value={costData.overtimeRate}
                                onChange={(value) => handleInputChange('overtimeRate', value)}
                                description="Rate for hours worked beyond the regular schedule. (Hourly Rate)"
                                fieldKey="overtimeRate"
                            />

                            <CostInputField
                                label="Travel Allowance"
                                value={costData.travelAllowance}
                                onChange={(value) => handleInputChange('travelAllowance', value)}
                                description="Compensation for travel-related expenses"
                                suffix=""
                                fieldKey="travelAllowance"
                            />
                        </Box>
                    </Box>

                    {/* Columna derecha - Summary */}
                    <Box>
                        <Card
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: '12px',
                                boxShadow: 'none',
                                border: '1px solid #000000',
                                borderBottom: '2px solid #000000'
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#000000',
                                        fontSize: { xs: '16px', sm: '18px' },
                                        mb: 1
                                    }}
                                >
                                    Summary
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#000000',
                                            fontSize: '14px',
                                            mb: 1.5
                                        }}
                                    >
                                        Yakka services
                                    </Typography>

                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        mb: 1
                                    }}>
                                        <Typography variant="body2" sx={{ color: '#000000',  ml: 3}}>
                                            Service Fee (Yakka)
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#000000', fontWeight: 500 }}>
                                            ${summary.serviceFee}/hr
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 1, ml: 3, borderBottomWidth: 2 }} />

                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                        <Typography variant="body2" sx={{ color: '#000000',  ml: 3}}>
                                            GST (+10%)
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#000000', fontWeight: 500 }}>
                                            ${summary.gst}/hr
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 1.5, borderBottomWidth: 2, borderColor: '#000000' }} />

                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center'
                                }}>
                                    
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: '#000000',
                                            fontWeight: 600,
                                            fontSize: { xs: '16px', sm: '18px' }
                                        }}
                                    >
                                        Final Labour Cost (per hour)
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: '#000000',
                                            fontWeight: 600,
                                            fontSize: { xs: '16px', sm: '18px' }
                                        }}
                                    >
                                        ${summary.totalCost}/hr
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>

            {/* Modal Add cost */}
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
                        width: { xs: '90%', sm: '400px' },
                        position: 'relative'
                    }}
                >
                    {/* Header del modal */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '16px'
                            }}
                        >
                            Add cost
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
                            mb: 2
                        }}
                    />

                    {/* Instrucción */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#000000',
                            fontSize: '14px',
                            mb: 3
                        }}
                    >
                        Introduce the cost $/hr
                    </Typography>

                    {/* Campo de entrada con botones +/- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <IconButton
                            onClick={handleDecrement}
                            sx={{
                                backgroundColor: config.primaryColor,
                                color: '#ffffff',
                                width: '40px',
                                height: '40px',
                                flexShrink: 0,
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: config.buttonHoverColor
                                }
                            }}
                        >
                            <DoDisturbOnOutlinedIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                        
                        <TextField
                            value={`$${tempValue}/hr`}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9.]/g, '');
                                setTempValue(value);
                            }}
                            sx={{
                                width: '140px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #000000',
                                    borderRadius: '8px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    '& fieldset': {
                                        borderColor: '#000000',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#000000',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#000000',
                                    }
                                },
                                '& .MuiInputBase-input': {
                                    py: 1
                                }
                            }}
                        />
                        
                        <IconButton
                            onClick={handleIncrement}
                            sx={{
                                backgroundColor: config.primaryColor,
                                color: '#ffffff',
                                width: '40px',
                                height: '40px',
                                flexShrink: 0,
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: config.buttonHoverColor
                                }
                            }}
                        >
                            <AddCircleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Box>

                    {/* Texto de ayuda */}
                    <Typography
                        variant="caption"
                        sx={{
                            textAlign: 'center',
                            color: '#666666',
                            fontSize: '12px',
                            display: 'block',
                            mb: 3
                        }}
                    >
                        Enter a number (e.g., $50/hr)
                    </Typography>

                    {/* Botón Confirm */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleConfirmRate}
                        sx={{
                            backgroundColor: config.buttonColor,
                            color: '#ffffff',
                            borderRadius: '8px',
                            py: 1.5,
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: config.buttonHoverColor
                            }
                        }}
                    >
                        Confirm Rate
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default LabourCostCalculator;

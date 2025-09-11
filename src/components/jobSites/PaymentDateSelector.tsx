'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Modal,
    Button,
    IconButton,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Flavor, flavorConfigs, FlavorConfig } from '@/types/flavors';

interface PaymentDateData {
    paymentDate: Dayjs | null;
    paymentFrequency: 'weekly' | 'fortnightly' | null;
}

interface PaymentDateSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (data: PaymentDateData) => void;
    onBack?: () => void;
    onPaymentDateChange?: (date: Date | null) => void;
}

const PaymentDateSelector: React.FC<PaymentDateSelectorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onPaymentDateChange
}) => {
    const config: FlavorConfig = flavorConfigs[selectedFlavor];

    const [paymentData, setPaymentData] = useState<PaymentDateData>({
        paymentDate: null,
        paymentFrequency: null
    });

    const [openDateModal, setOpenDateModal] = useState(false);

    // Notificar cuando cambie la fecha de pago
    useEffect(() => {
        if (onPaymentDateChange && paymentData.paymentDate) {
            onPaymentDateChange(paymentData.paymentDate.toDate());
        }
    }, [paymentData.paymentDate, onPaymentDateChange]);

    const handleDateSelect = (date: Dayjs | null) => {
        setPaymentData(prev => ({
            ...prev,
            paymentDate: date
        }));
        setOpenDateModal(false);
    };

    const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentData(prev => ({
            ...prev,
            paymentFrequency: event.target.value as 'weekly' | 'fortnightly'
        }));
    };

    const handleNext = () => {
        if (onNext) {
            onNext(paymentData);
        }
    };

    const formatDate = (date: Dayjs | null) => {
        if (!date) return 'Select date';
        return date.format('DD/MM/YYYY');
    };

    return (
        <Box sx={{
            backgroundColor: '#ffffff',
            py: { xs: 2, sm: 4 },
            maxWidth: '1000px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 }
        }}>
            {/* Título principal */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: '#000000',
                        fontSize: { xs: '24px', sm: '28px', md: '30px' },
                        mb: 1
                    }}
                >
                    Payment Details
                </Typography>
            </Box>

            {/* Sección: When will the worker be paid? */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: '#000000',
                        fontSize: { xs: '18px', sm: '20px' },
                        mb: 2
                    }}
                >
                    When will the worker be paid?
                </Typography>
                
                 <Box
                     sx={{
                         backgroundColor: '#ffffff',
                         border: paymentData.paymentDate ? `2px solid ${config.buttonColor}` : '1px solid #000000',
                         borderBottom: paymentData.paymentDate ? `2px solid ${config.buttonColor}` : '2px solid #000000',
                         borderRadius: '8px',
                         p: 2,
                         cursor: 'pointer',
                         transition: 'border-color 0.2s ease',
                         '&:hover': {
                             backgroundColor: '#f5f5f5',
                             borderColor: paymentData.paymentDate ? config.buttonColor : config.primaryColor
                         }
                     }}
                     onClick={() => setOpenDateModal(true)}
                 >
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                         <Radio
                             checked={!!paymentData.paymentDate}
                             sx={{
                                 color: '#666666',
                                 '&.Mui-checked': {
                                     color: config.buttonColor,
                                 }
                             }}
                         />
                         <Typography
                             variant="body1"
                             sx={{
                                 color: paymentData.paymentDate ? config.buttonColor : '#000000',
                                 fontSize: '16px',
                                 ml: 1,
                                 fontWeight: paymentData.paymentDate ? 600 : 400
                             }}
                         >
                             {formatDate(paymentData.paymentDate)}
                         </Typography>
                     </Box>
                 </Box>
            </Box>

            {/* Sección: On going jobs */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: '#000000',
                        fontSize: { xs: '18px', sm: '20px' },
                        mb: 2
                    }}
                >
                    On going jobs
                </Typography>
                
                <RadioGroup
                    value={paymentData.paymentFrequency}
                    onChange={handleFrequencyChange}
                >
                     <Box
                         sx={{
                             backgroundColor: '#ffffff',
                             border: paymentData.paymentFrequency === 'weekly' ? `2px solid ${config.buttonColor}` : '1px solid #000000',
                             borderBottom: paymentData.paymentFrequency === 'weekly' ? `2px solid ${config.buttonColor}` : '2px solid #000000',
                             borderRadius: '8px',
                             p: 2,
                             mb: 2,
                             transition: 'border-color 0.2s ease'
                         }}
                     >
                         <FormControlLabel
                             value="weekly"
                             control={
                                 <Radio
                                     sx={{
                                         color: '#666666',
                                         '&.Mui-checked': {
                                             color: config.buttonColor,
                                         }
                                     }}
                                 />
                             }
                             label={
                                 <Typography
                                     variant="body1"
                                     sx={{
                                         color: paymentData.paymentFrequency === 'weekly' ? config.buttonColor : '#000000',
                                         fontSize: '16px',
                                         fontWeight: paymentData.paymentFrequency === 'weekly' ? 600 : 400
                                     }}
                                 >
                                     Weekly payment
                                 </Typography>
                             }
                         />
                     </Box>

                     <Box
                         sx={{
                             backgroundColor: '#ffffff',
                             border: paymentData.paymentFrequency === 'fortnightly' ? `2px solid ${config.buttonColor}` : '1px solid #000000',
                             borderBottom: paymentData.paymentFrequency === 'fortnightly' ? `2px solid ${config.buttonColor}` : '2px solid #000000',
                             borderRadius: '8px',
                             p: 2,
                             transition: 'border-color 0.2s ease'
                         }}
                     >
                         <FormControlLabel
                             value="fortnightly"
                             control={
                                 <Radio
                                     sx={{
                                         color: '#666666',
                                         '&.Mui-checked': {
                                             color: config.buttonColor,
                                         }
                                     }}
                                 />
                             }
                             label={
                                 <Typography
                                     variant="body1"
                                     sx={{
                                         color: paymentData.paymentFrequency === 'fortnightly' ? config.buttonColor : '#000000',
                                         fontSize: '16px',
                                         fontWeight: paymentData.paymentFrequency === 'fortnightly' ? 600 : 400
                                     }}
                                 >
                                     Fortnightly payment
                                 </Typography>
                             }
                         />
                     </Box>
                </RadioGroup>
            </Box>

            {/* Sección de advertencia */}
            <Box
                sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2
                }}
            >
                <WarningIcon
                    sx={{
                        color: '#666666',
                        fontSize: '24px',
                        mt: 0.5
                    }}
                />
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#000000',
                            fontSize: '16px',
                            mb: 1
                        }}
                    >
                        What happens if I don't pay the labourer?
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666666',
                            fontSize: '14px',
                            lineHeight: 1.5
                        }}
                    >
                        YAKKA cannot get involved. However, if payment is not made, the worker may take legal action, and your reputation on the platform may be affected.
                    </Typography>
                </Box>
            </Box>

            {/* Modal de selección de fecha */}
            <Modal
                open={openDateModal}
                onClose={() => setOpenDateModal(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    p: { xs: 2, sm: 0 }
                }}
            >
                 <Box
                     sx={{
                         backgroundColor: 'white',
                         borderRadius: '12px',
                         border: '1px solid #000000',
                         borderBottom: '2px solid #000000',
                         p: { xs: 3, sm: 4 },
                         width: { xs: '95%', sm: '500px' },
                         maxWidth: '90vw',
                         maxHeight: '90vh',
                         overflow: 'auto',
                         position: 'relative'
                     }}
                 >
                    {/* Header del modal */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '18px'
                            }}
                        >
                            Select Payment Date
                        </Typography>
                        <IconButton
                            onClick={() => setOpenDateModal(false)}
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

                     {/* Calendario */}
                     <Box sx={{ 
                         display: 'flex', 
                         justifyContent: 'center',
                         p: 2
                     }}>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                             <DateCalendar
                                 value={paymentData.paymentDate}
                                 onChange={handleDateSelect}
                                 shouldDisableDate={(date) => {
                                     // Deshabilitar fechas pasadas
                                     return date.isBefore(dayjs(), 'day');
                                 }}
                                 sx={{
                                     width: '100%',
                                     minWidth: '320px',
                                     '& .MuiPickersCalendarHeader-root': {
                                         paddingLeft: 0,
                                         paddingRight: 0,
                                         marginBottom: 2,
                                         '& .MuiPickersCalendarHeader-label': {
                                             fontSize: '18px',
                                             fontWeight: 600
                                         }
                                     },
                                     '& .MuiDayCalendar-weekContainer': {
                                         '& .MuiPickersDay-root': {
                                             width: '40px',
                                             height: '40px',
                                             margin: '0px 6px 6px 6px',
                                             borderRadius: '50%',
                                             fontSize: '14px',
                                             fontWeight: 500,
                                             '&.Mui-selected': {
                                                 backgroundColor: config.buttonColor,
                                                 color: '#ffffff',
                                                 '&:hover': {
                                                     backgroundColor: config.buttonHoverColor,
                                                 }
                                             },
                                             '&:hover': {
                                                 backgroundColor: 'rgba(102,102,102,0.1)',
                                             }
                                         }
                                     },
                                     '& .MuiDayCalendar-weekDayLabel': {
                                         width: '40px',
                                         height: '40px',
                                         margin: '0px 6px 6px 6px',
                                         display: 'flex',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         fontSize: '12px',
                                         fontWeight: 'bold',
                                         color: '#666666'
                                     }
                                 }}
                             />
                         </LocalizationProvider>
                     </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PaymentDateSelector;

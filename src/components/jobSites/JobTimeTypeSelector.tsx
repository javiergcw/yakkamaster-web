'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    TextField,
    Modal,
    Paper
} from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface JobTimeData {
    startTime: string;
    endTime: string;
    jobType: string | null;
}

interface PopupState {
    isOpen: boolean;
    field: 'startTime' | 'endTime' | null;
    tempTime: Dayjs | null;
}

interface JobTimeTypeSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (data: JobTimeData) => void;
    onBack?: () => void;
    onTimeTypeChange?: (timeType: string | null) => void;
}

// Tipos de trabajo disponibles
const jobTypes = [
    'Casual Job',
    'Part time',
    'Full time',
    'Farms Job',
    'Mining Job',
    'FIFO',
    'Seasonal job',
    'W&H visa',
    'Other'
];

const JobTimeTypeSelector: React.FC<JobTimeTypeSelectorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onTimeTypeChange
}) => {
    const config = flavorConfigs[selectedFlavor];

    const [jobTimeData, setJobTimeData] = useState<JobTimeData>({
        startTime: '',
        endTime: '',
        jobType: null
    });

    const [popupState, setPopupState] = useState<PopupState>({
        isOpen: false,
        field: null,
        tempTime: null
    });

    // Notificar cuando cambie el tipo de trabajo
    useEffect(() => {
        if (onTimeTypeChange && jobTimeData.jobType) {
            onTimeTypeChange(jobTimeData.jobType);
        }
    }, [jobTimeData.jobType, onTimeTypeChange]);

    const openTimePopup = (field: 'startTime' | 'endTime') => {
        // Parsear el tiempo actual si existe
        const currentTime = jobTimeData[field];
        let dayjsTime = dayjs();
        
        if (currentTime) {
            const [h, m] = currentTime.split(':');
            dayjsTime = dayjs().hour(parseInt(h)).minute(parseInt(m));
        } else {
            // Hora por defecto: 12:30
            dayjsTime = dayjs().hour(12).minute(30);
        }
        
        setPopupState({
            isOpen: true,
            field,
            tempTime: dayjsTime
        });
    };

    const closeTimePopup = () => {
        setPopupState(prev => ({
            ...prev,
            isOpen: false,
            field: null
        }));
    };

    const updateTempTime = (newTime: any) => {
        setPopupState(prev => ({
            ...prev,
            tempTime: newTime
        }));
    };

    const confirmTimeSelection = () => {
        if (popupState.field && popupState.tempTime) {
            const timeString = popupState.tempTime.format('HH:mm');
            
            setJobTimeData(prev => ({
                ...prev,
                [popupState.field!]: timeString
            }));
        }
        closeTimePopup();
    };

    const handleJobTypeSelect = (jobType: string) => {
        setJobTimeData(prev => ({
            ...prev,
            jobType: prev.jobType === jobType ? null : jobType
        }));
    };

    const handleNext = () => {
        if (onNext) {
            onNext(jobTimeData);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            At what time?
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666666',
                                fontSize: { xs: '13px', sm: '16px' },
                                lineHeight: 1.4
                            }}
                        >
                            Select the start and end time
                        </Typography>
                    </Box>

                    {/* Sección de selección de tiempo */}
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 1.5, sm: 2 },
                        maxWidth: { xs: '100%', sm: '400px' },
                        margin: '0 auto',
                        px: { xs: 1, sm: 0 }
                    }}>
                        <TextField
                            fullWidth
                            placeholder="Start time"
                            value={jobTimeData.startTime}
                            onClick={() => openTimePopup('startTime')}
                            InputProps={{ readOnly: true }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: { xs: '6px', sm: '8px' },
                                    backgroundColor: '#ffffff',
                                    '& fieldset': {
                                        borderColor: '#E0E0E0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#BDBDBD',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: config.primaryColor,
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    py: { xs: 1.2, sm: 1.5 },
                                    fontSize: { xs: '14px', sm: '16px' },
                                    cursor: 'pointer'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            placeholder="End time"
                            value={jobTimeData.endTime}
                            onClick={() => openTimePopup('endTime')}
                            InputProps={{ readOnly: true }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: { xs: '6px', sm: '8px' },
                                    mb: { xs: 4, sm: 6 },
                                    backgroundColor: '#ffffff',
                                    '& fieldset': {
                                        borderColor: '#E0E0E0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#BDBDBD',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: config.primaryColor,
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    py: { xs: 1.2, sm: 1.5 },
                                    fontSize: { xs: '14px', sm: '16px' },
                                    cursor: 'pointer'
                                }
                            }}
                        />
                    </Box>

                    {/* Título de tipo de trabajo */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 2 } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '18px', sm: '20px', md: '24px' },
                                mb: 1,
                                lineHeight: { xs: 1.2, sm: 1.3 }
                            }}
                        >
                            What kind of job are you offering?
                        </Typography>
                    </Box>

                    {/* Grid de tipos de trabajo */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        gap: { xs: 1, sm: 2 },
                        justifyContent: { xs: 'center', sm: 'center' },
                        maxWidth: { xs: '100%', sm: '800px' },
                        margin: '0 auto',
                        px: { xs: 1, sm: 0 }
                    }}>
                        {jobTypes.map((jobType) => (
                            <Button
                                key={jobType}
                                variant="outlined"
                                onClick={() => handleJobTypeSelect(jobType)}
                                sx={{
                                    border: '1px solid #000000',
                                    borderColor: '#000000',
                                    borderBottom: '2px solid #000000',
                                    backgroundColor: jobTimeData.jobType === jobType ? config.primaryColor : '#ffffff',
                                    color: jobTimeData.jobType === jobType ? '#ffffff' : '#000000',
                                    borderRadius: { xs: '12px', sm: '16px' },
                                    py: { xs: 0.8, sm: 1 },
                                    px: { xs: 2, sm: 3 },
                                    textTransform: 'none',
                                    fontSize: { xs: '11px', sm: '14px' },
                                    fontWeight: jobTimeData.jobType === jobType ? '600' : '400',
                                    minHeight: { xs: '32px', sm: '40px' },
                                    minWidth: { xs: 'auto', sm: 'auto' },
                                    flex: { xs: '0 0 calc(50% - 4px)', sm: 'none' },
                                    maxWidth: { xs: 'calc(50% - 4px)', sm: 'none' },
                                    '&:hover': {
                                        borderColor: '#000000',
                                        backgroundColor: jobTimeData.jobType === jobType ? config.primaryColor : 'rgba(0,0,0,0.04)',
                                    }
                                }}
                            >
                                {jobType}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* Popup con TimePicker de MUI */}
            <Modal
                open={popupState.isOpen}
                onClose={closeTimePopup}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    p: { xs: 2, sm: 0 }
                }}
            >
                <Paper
                    sx={{
                        width: { xs: '100%', sm: 600 },
                        height: { xs: 'auto', sm: 350 },
                        maxWidth: { xs: '95vw', sm: 600 },
                        maxHeight: { xs: '90vh', sm: 350 },
                        borderRadius: { xs: 3, sm: 2 },
                        p: { xs: 2, sm: 1 },
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#ffffff',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        minHeight: { xs: '300px', sm: 'auto' },
                        padding: { xs: '8px', sm: '16px' }
                    }}>
                        <StaticTimePicker
                            value={popupState.tempTime}
                            onChange={updateTempTime}
                            orientation="landscape"
                            slotProps={{
                                actionBar: {
                                    actions: []
                                }
                            }}
                            sx={{
                                width: '100%',
                                '& .MuiPickersToolbar-title': {
                                    fontSize: { xs: '0.8rem', sm: '0.9rem' } + ' !important',
                                    fontWeight: '800 !important',
                                    color: '#000 !important',
                                    textTransform: 'none',
                                },
                                '& .MuiTimePickerToolbar-hourMinuteLabel': {
                                    fontSize: { xs: '2rem', sm: '2.6rem' } + ' !important',
                                    fontWeight: '700 !important',
                                    color: `${config.primaryColor} !important`,
                                    backgroundColor: '#f5f5f5 !important',
                                    borderRadius: '8px !important',
                                    padding: '4px 12px !important',
                                },
                                '& .MuiTimePickerToolbar-hourMinuteLabel .MuiTypography-root': {
                                    fontSize: { xs: '2rem', sm: '2.6rem' } + ' !important',
                                    fontWeight: '700 !important',
                                    color: `${config.primaryColor} !important`,
                                },
                                '& .MuiPickersTimePickerToolbar-root': {
                                    '& .MuiTypography-h3': {
                                        color: `${config.primaryColor} !important`,
                                        fontSize: { xs: '2.2rem', sm: '3rem' } + ' !important',
                                        fontWeight: 'bold !important'
                                    },
                                    '& .MuiTypography-h4': {
                                        color: '#424242 !important',
                                        fontSize: { xs: '2.2rem', sm: '3rem' } + ' !important',
                                        fontWeight: 'bold !important'
                                    }
                                },
                                '& .MuiPickersClock-root': {
                                    margin: { xs: '12px 0', sm: '16px 0' },
                                    '& .MuiPickersClockNumber-root': {
                                        '&.Mui-selected': {
                                            backgroundColor: `${config.primaryColor} !important`,
                                            color: '#ffffff !important',
                                        }
                                    }
                                },
                                '& .MuiClockPointer-root': {
                                    backgroundColor: `${config.primaryColor} !important`
                                },
                                '& .MuiClockPointer-thumb': {
                                    borderColor: `${config.primaryColor} !important`,
                                    backgroundColor: '#ffffff !important'
                                },
                                '& .MuiClock-pin': {
                                    backgroundColor: `${config.primaryColor} !important`
                                },
                                '& .MuiPickersAmPm-root': {
                                    marginTop: { xs: '12px', sm: '16px' },
                                    '& .MuiButtonBase-root': {
                                        '&.Mui-selected': {
                                            backgroundColor: `${config.primaryColor} !important`,
                                            color: '#ffffff !important',
                                        }
                                    }
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mt: { xs: 1, sm: 2 },
                        pt: { xs: 1, sm: 0 }
                    }}>
                        <Box sx={{ width: { xs: 16, sm: 20 }, height: { xs: 16, sm: 20 } }} />
                        <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 } }}>
                            <Button
                                onClick={closeTimePopup}
                                sx={{
                                    color: '#424242',
                                    textTransform: 'none',
                                    fontWeight: 'normal',
                                    fontSize: { xs: '13px', sm: '14px' },
                                    padding: { xs: '6px 12px', sm: '4px 8px' },
                                    minWidth: { xs: '60px', sm: 'auto' }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmTimeSelection}
                                sx={{
                                    color: '#424242',
                                    textTransform: 'none',
                                    fontWeight: 'normal',
                                    fontSize: { xs: '13px', sm: '14px' },
                                    padding: { xs: '6px 12px', sm: '4px 8px' },
                                    minWidth: { xs: '60px', sm: 'auto' }
                                }}
                            >
                                OK
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Box>
        </LocalizationProvider>
    );
};

export default JobTimeTypeSelector;

'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Modal,
    Button,
    IconButton,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface AddShiftsModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ShiftData) => void;
    selectedFlavor: Flavor;
    workerName: string;
}

interface ShiftData {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    isOngoing: boolean;
    workOnSaturdays: boolean;
    workOnSundays: boolean;
}

const AddShiftsModal: React.FC<AddShiftsModalProps> = ({
    open,
    onClose,
    onSubmit,
    selectedFlavor,
    workerName
}) => {
    const [shiftData, setShiftData] = useState<ShiftData>({
        startDate: null,
        endDate: null,
        isOngoing: false,
        workOnSaturdays: false,
        workOnSundays: false
    });

    const flavorConfig = flavorConfigs[selectedFlavor];

    const handleDateSelect = (date: Dayjs | null) => {
        if (!shiftData.startDate || (shiftData.startDate && shiftData.endDate)) {
            // Si no hay fecha de inicio o ya hay ambas fechas, establecer como fecha de inicio
            setShiftData(prev => ({
                ...prev,
                startDate: date,
                endDate: null
            }));
        } else {
            // Si ya hay fecha de inicio, establecer como fecha de fin
            setShiftData(prev => ({
                ...prev,
                endDate: date
            }));
        }
    };

    const handleInputChange = (field: keyof ShiftData, value: any) => {
        setShiftData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(shiftData);
        onClose();
        // Reset form
        setShiftData({
            startDate: null,
            endDate: null,
            isOngoing: false,
            workOnSaturdays: false,
            workOnSundays: false
        });
    };

    const formatDateForInput = (date: Dayjs | null) => {
        return date ? date.format('DD-MM-YYYY') : '';
    };

    const parseDateFromInput = (dateString: string) => {
        if (!dateString) return null;
        return dayjs(dateString, 'DD-MM-YYYY');
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            color: '#000000',
                            fontSize: '18px'
                        }}
                    >
                        Add Shifts to Job
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ p: 2 }}>
                    {/* Calendar */}
                    <Box sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={shiftData.startDate}
                                onChange={handleDateSelect}
                                sx={{
                                    width: '100%',
                                    minWidth: '320px',
                                    '& .MuiPickersCalendarHeader-root': {
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        marginBottom: 1,
                                        '& .MuiPickersCalendarHeader-label': {
                                            fontSize: '14px',
                                            fontWeight: 500
                                        }
                                    },
                                    '& .MuiDayCalendar-weekContainer': {
                                        margin: 0,
                                        gap: '12px'
                                    },
                                    '& .MuiDayCalendar-weekDayLabel': {
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        width: '40px',
                                        height: '40px',
                                        margin: '2px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    '& .MuiPickersDay-root': {
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        width: '40px',
                                        height: '40px',
                                        margin: '2px',
                                        '&.Mui-selected': {
                                            backgroundColor: flavorConfig.primaryColor,
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: flavorConfig.buttonHoverColor
                                            }
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    {/* Date Input Fields */}
                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <TextField
                            label="Start date: dd-mm-yyyy"
                            value={formatDateForInput(shiftData.startDate)}
                            onChange={(e) => {
                                const date = parseDateFromInput(e.target.value);
                                handleInputChange('startDate', date);
                            }}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    fontSize: '12px',
                                    '& fieldset': {
                                        borderColor: '#e0e0e0'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: flavorConfig.primaryColor
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: flavorConfig.primaryColor
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '12px'
                                }
                            }}
                        />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                label="End date: dd-mm-yyyy"
                                value={formatDateForInput(shiftData.endDate)}
                                onChange={(e) => {
                                    const date = parseDateFromInput(e.target.value);
                                    handleInputChange('endDate', date);
                                }}
                                disabled={shiftData.isOngoing}
                                size="small"
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        fontSize: '12px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: flavorConfig.primaryColor
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: flavorConfig.primaryColor
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '12px'
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={shiftData.isOngoing}
                                        onChange={(e) => handleInputChange('isOngoing', e.target.checked)}
                                        sx={{
                                            color: flavorConfig.primaryColor,
                                            '&.Mui-checked': {
                                                color: flavorConfig.primaryColor
                                            }
                                        }}
                                    />
                                }
                                label="On going work"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '12px',
                                        color: '#666666'
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Workday Options */}
                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '12px', color: '#666666' }}>
                                Work on Saturdays1
                            </Typography>
                            <Checkbox
                                checked={shiftData.workOnSaturdays}
                                onChange={(e) => handleInputChange('workOnSaturdays', e.target.checked)}
                                sx={{
                                    color: flavorConfig.primaryColor,
                                    '&.Mui-checked': {
                                        color: flavorConfig.primaryColor
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '12px', color: '#666666' }}>
                                Work on Sundays2
                            </Typography>
                            <Checkbox
                                checked={shiftData.workOnSundays}
                                onChange={(e) => handleInputChange('workOnSundays', e.target.checked)}
                                sx={{
                                    color: flavorConfig.primaryColor,
                                    '&.Mui-checked': {
                                        color: flavorConfig.primaryColor
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: flavorConfig.primaryColor,
                            color: '#ffffff',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: flavorConfig.buttonHoverColor
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddShiftsModal;

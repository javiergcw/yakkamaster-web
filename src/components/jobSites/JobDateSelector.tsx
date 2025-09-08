'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Checkbox,
    FormControlLabel,
    Modal,
    Button,
    IconButton,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Flavor, flavorConfigs, FlavorConfig } from '@/types/flavors';

interface JobDateData {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    isOngoing: boolean;
    workOnSaturdays: boolean;
    workOnSundays: boolean;
}

interface JobDateSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (data: JobDateData) => void;
    onBack?: () => void;
    onDateChange?: (date: Date | null) => void;
}

const JobDateSelector: React.FC<JobDateSelectorProps> = ({
    selectedFlavor,
    onNext,
    onBack,
    onDateChange
}) => {
    const config: FlavorConfig = flavorConfigs[selectedFlavor];

    const [jobDateData, setJobDateData] = useState<JobDateData>({
        startDate: null,
        endDate: null,
        isOngoing: false,
        workOnSaturdays: false,
        workOnSundays: false
    });

    const [openOngoingModal, setOpenOngoingModal] = useState(false);

    // Notificar cuando cambie la fecha
    useEffect(() => {
        if (onDateChange && jobDateData.startDate) {
            onDateChange(jobDateData.startDate.toDate());
        }
    }, [jobDateData.startDate, onDateChange]);

    const handleDateSelect = (date: Dayjs | null) => {
        if (!date) return;

        // Si no hay fecha de inicio, esta es la fecha de inicio
        if (!jobDateData.startDate) {
            setJobDateData(prev => ({
                ...prev,
                startDate: date
            }));
        }
        // Si hay fecha de inicio pero no de fin, esta es la fecha de fin
        else if (!jobDateData.endDate) {
            // Si la fecha seleccionada es anterior a la fecha de inicio, intercambiar
            if (date.isBefore(jobDateData.startDate)) {
                setJobDateData(prev => ({
                    ...prev,
                    startDate: date,
                    endDate: prev.startDate
                }));
            } else {
                setJobDateData(prev => ({
                    ...prev,
                    endDate: date
                }));
            }
        }
        // Si ambas fechas están seleccionadas, reiniciar con la nueva fecha
        else {
            setJobDateData(prev => ({
                ...prev,
                startDate: date,
                endDate: null
            }));
        }
    };

    const handleOngoingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setOpenOngoingModal(true);
        } else {
            setJobDateData(prev => ({
                ...prev,
                isOngoing: false
            }));
        }
    };

    const handleConfirmOngoing = () => {
        setJobDateData(prev => ({
            ...prev,
            isOngoing: true
        }));
        setOpenOngoingModal(false);
    };

    const handleCloseOngoingModal = () => {
        setOpenOngoingModal(false);
    };

    const handleCheckboxChange = (field: keyof JobDateData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobDateData(prev => ({
            ...prev,
            [field]: event.target.checked
        }));
    };

    const handleNext = () => {
        if (onNext) {
            onNext(jobDateData);
        }
    };

    const formatDate = (date: Dayjs | null) => {
        if (!date) return '';
        return `${date.date()}-${date.month() + 1}-${date.year()}`;
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
                        When is the job?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666666',
                            fontSize: { xs: '14px', sm: '16px' }
                        }}
                    >
                        Select the start and end date
                    </Typography>
                </Box>

                {/* Layout de dos columnas */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'start'
                }}>
                    {/* Columna izquierda - Calendario */}
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: { xs: 'auto', md: 'visible' }
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={jobDateData.startDate}
                                onChange={handleDateSelect}
                                slots={{
                                    day: (props) => {
                                        const { day, disableHighlightToday, ...other } = props;
                                        const isStartDate = jobDateData.startDate && day && day.isSame(jobDateData.startDate);
                                        const isEndDate = jobDateData.endDate && day && day.isSame(jobDateData.endDate);
                                        const isInRange = jobDateData.startDate && jobDateData.endDate && day &&
                                            day.isAfter(jobDateData.startDate) && day.isBefore(jobDateData.endDate);

                                        return (
                                            <Box
                                                onClick={() => handleDateSelect(day)}
                                                sx={{
                                                    width: '36px',
                                                    height: '36px',
                                                    margin: { xs: '0px 8px 4px 8px', sm: '0px 12px 6px 12px', md: '0px 20px 8px 20px' },
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: isStartDate || isEndDate ? '#666666' :
                                                        isInRange ? 'rgba(102,102,102,0.2)' : 'transparent',
                                                    color: isStartDate || isEndDate ? '#ffffff' : '#000000',
                                                    cursor: 'pointer',
                                                    fontSize: { xs: '12px', sm: '14px' },
                                                    '&:hover': {
                                                        backgroundColor: isStartDate || isEndDate ? '#555555' : 'rgba(102,102,102,0.1)',
                                                    }
                                                }}
                                            >
                                                {day?.date()}
                                            </Box>
                                        );
                                    }
                                }}
                                shouldDisableDate={(date) => {
                                    return false;
                                }}
                                sx={{
                                    width: '100%',
                                    minWidth: { xs: '280px', sm: '320px', md: 'auto' },
                                    '& .MuiPickersCalendarHeader-root': {
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                        '& .MuiPickersCalendarHeader-label': {
                                            fontSize: { xs: '14px', sm: '16px' }
                                        }
                                    },
                                    '& .MuiDayCalendar-weekContainer': {
                                        '& .MuiPickersDay-root': {
                                            width: '36px',
                                            height: '36px',
                                            margin: { xs: '0px 8px 4px 8px', sm: '0px 12px 6px 12px', md: '0px 20px 8px 20px' },
                                            borderRadius: '50%',
                                            fontSize: { xs: '12px', sm: '14px' },
                                            '&.Mui-selected': {
                                                backgroundColor: '#666666',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#555555',
                                                }
                                            },
                                            '&.MuiPickersDay-rangeIntervalDay': {
                                                backgroundColor: 'rgba(102,102,102,0.2)',
                                                color: '#000000',
                                            }
                                        }
                                    },
                                    '& .MuiDayCalendar-weekDayLabel': {
                                        width: '36px',
                                        height: '36px',
                                        margin: { xs: '0px 8px 4px 8px', sm: '0px 12px 6px 12px', md: '0px 20px 8px 20px' },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: { xs: '10px', sm: '12px', md: '14px' },
                                        fontWeight: 'bold'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                    {/* Columna derecha - Panel de fechas */}
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #000000',
                                borderBottom: '2px solid #000000',
                                borderRadius: '12px',
                                p: { xs: 2, sm: 3 }
                            }}
                        >

                            <Box sx={{ 
                                mb: { xs: 2, sm: 3 }, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1, sm: 0 }
                            }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#000000',
                                        fontSize: '14px'
                                    }}
                                >
                                    Start Date
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#000000',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        textAlign: { xs: 'center', sm: 'right' }
                                    }}
                                >
                                    {formatDate(jobDateData.startDate) || 'Not selected'}
                                </Typography>
                            </Box>
                            
                            <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderBottomWidth: 2 }} />

                            <Box sx={{ 
                                mb: { xs: 2, sm: 3 }, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1, sm: 0 }
                            }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#000000',
                                        fontSize: '14px'
                                    }}
                                >
                                    End date
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#000000',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        textAlign: { xs: 'center', sm: 'right' }
                                    }}
                                >
                                    {formatDate(jobDateData.endDate) || 'Not selected'}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderBottomWidth: 2 }} />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={jobDateData.isOngoing}
                                        onChange={handleOngoingChange}
                                        sx={{
                                            color: '#666666',
                                            '&.Mui-checked': {
                                                color: '#666666',
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#000000',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Ongoing work?
                                    </Typography>
                                }
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Checkboxes de fines de semana */}
                <Box sx={{
                    mt: { xs: 3, sm: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 4 },
                    ml: { xs: 0, lg: 20 },
                    alignItems: { xs: 'center', sm: 'flex-start' }
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={jobDateData.workOnSaturdays}
                                onChange={handleCheckboxChange('workOnSaturdays')}
                                sx={{
                                    color: '#666666',
                                    '&.Mui-checked': {
                                        color: '#666666',
                                    }
                                }}
                            />
                        }
                        label={
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#000000',
                                    fontSize: '14px'
                                }}
                            >
                                Work on Saturdays
                            </Typography>
                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={jobDateData.workOnSundays}
                                onChange={handleCheckboxChange('workOnSundays')}
                                sx={{
                                    color: '#666666',
                                    '&.Mui-checked': {
                                        color: '#666666',
                                    }
                                }}
                            />
                        }
                        label={
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#000000',
                                    fontSize: '14px'
                                }}
                            >
                                Work on Sundays
                            </Typography>
                        }
                    />
                </Box>

            {/* Modal de confirmación para Ongoing work */}
            <Modal
                open={openOngoingModal}
                onClose={handleCloseOngoingModal}
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '18px'
                            }}
                        >
                            Confirm Ongoing Work
                        </Typography>
                        <IconButton
                            onClick={handleCloseOngoingModal}
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
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#000000',
                                fontSize: '16px',
                                textAlign: 'center'
                            }}
                        >
                            Are you sure you want to mark this as ongoing work?
                        </Typography>
                    </Box>

                    {/* Botones */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleCloseOngoingModal}
                            sx={{
                                borderColor: '#000000',
                                color: '#000000',
                                borderRadius: '8px',
                                py: 1.5,
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: config.primaryColor,
                                    backgroundColor: 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleConfirmOngoing}
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
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default JobDateSelector;

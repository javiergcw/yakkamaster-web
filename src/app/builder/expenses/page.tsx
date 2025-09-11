'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Tabs,
    Tab,
    Card,
    CardContent,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    FilterList as FilterListIcon,
    Download as DownloadIcon,
    Search as SearchIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
    Add as AddIcon,
    Close as CloseIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Visibility as VisibilityIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    RadioButtonChecked as RadioButtonCheckedIcon,
    ShowChartOutlined as ShowChartOutlinedIcon,
    EditOutlined as EditIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CURRENT_FLAVOR, getCurrentFlavorConfig } from '@/types/favorGlobal';

interface Expense {
    id: string;
    workerName: string;
    role: string;
    date: string;
    hours: number;
    hourlyRate: number;
    amount: number;
    status: 'paid' | 'pending';
}

// Datos de ejemplo para los gastos
const sampleExpenses: Expense[] = [
    {
        id: '1',
        workerName: 'José Perez',
        role: 'General Labour',
        date: '21/08/2025',
        hours: 8,
        hourlyRate: 23,
        amount: 184,
        status: 'paid'
    },
    {
        id: '2',
        workerName: 'John Bailey',
        role: 'Concreter',
        date: '25/08/2025',
        hours: 5,
        hourlyRate: 23,
        amount: 115,
        status: 'pending'
    },
    {
        id: '3',
        workerName: 'Maria Rodriguez',
        role: 'Electrician',
        date: '22/08/2025',
        hours: 6,
        hourlyRate: 35,
        amount: 210,
        status: 'paid'
    },
    {
        id: '4',
        workerName: 'Carlos Silva',
        role: 'Plumber',
        date: '24/08/2025',
        hours: 7,
        hourlyRate: 30,
        amount: 210,
        status: 'pending'
    }
];

// Datos de ejemplo para los jobsites
const sampleJobsites = [
    {
        id: '1',
        name: 'Bondi Beach',
        location: 'Sydney',
        address: 'U12/23 Curlewis St.',
        code: 'COD: 618 278',
        status: 'In progress'
    },
    {
        id: '2',
        name: 'Bondi Beach',
        location: 'Sydney',
        address: 'U12/23 Curlewis St.',
        code: 'COD: 618 278',
        status: 'Finished'
    },
    {
        id: '3',
        name: 'Bondi Beach',
        location: 'Sydney',
        address: 'U12/23 Curlewis St.',
        code: 'COD: 618 278',
        status: 'In progress'
    },
    {
        id: '4',
        name: 'Bondi Beach',
        location: 'Sydney',
        address: 'U12/23 Curlewis St.',
        code: 'COD: 618 278',
        status: 'Finished'
    },
    {
        id: '5',
        name: 'Bondi Beach',
        location: 'Sydney',
        address: 'U12/23 Curlewis St.',
        code: 'COD: 618 278',
        status: 'In progress'
    }
];

export default function ExpensesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [expenses] = useState<Expense[]>(sampleExpenses);
    const [customDateModalOpen, setCustomDateModalOpen] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [jobsiteFilterModalOpen, setJobsiteFilterModalOpen] = useState(false);
    const [selectedJobsite, setSelectedJobsite] = useState<string | null>(null);
    const [projectOverviewModalOpen, setProjectOverviewModalOpen] = useState(false);
    
    // Usar el flavor para los colores
    const selectedFlavor = CURRENT_FLAVOR;
    const config = getCurrentFlavorConfig();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue === 2) {
            // Abrir modal para Custom
            setCustomDateModalOpen(true);
        } else {
            setActiveTab(newValue);
        }
    };

    const handleDownloadChart = () => {
        // Crear un canvas para exportar la gráfica
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 400;

        if (ctx) {
            // Fondo
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Líneas de cuadrícula
            ctx.strokeStyle = '#E0E0E0';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const y = 40 + (i * 80);
                ctx.beginPath();
                ctx.moveTo(40, y);
                ctx.lineTo(760, y);
                ctx.stroke();
            }

            // Línea de la gráfica
            ctx.strokeStyle = config.primaryColor;
            ctx.lineWidth = 4;
            ctx.beginPath();
            
            weeklyHours.forEach((hours, index) => {
                const x = (index / (weeklyHours.length - 1)) * 720 + 40;
                const y = 360 - (hours / 60) * 280;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            // Puntos de datos
            ctx.fillStyle = config.primaryColor;
            weeklyHours.forEach((hours, index) => {
                const x = (index / (weeklyHours.length - 1)) * 720 + 40;
                const y = 360 - (hours / 60) * 280;
                
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
            });

            // Etiquetas de días
            ctx.fillStyle = '#666666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            days.forEach((day, index) => {
                const x = (index / (days.length - 1)) * 720 + 40;
                ctx.fillText(day, x, 390);
            });

            // Etiquetas de valores
            ctx.textAlign = 'right';
            [60, 45, 30, 15, 0].forEach((value, index) => {
                const y = 40 + (index * 80);
                ctx.fillText(`${value}h`, 30, y + 5);
            });

            // Descargar la imagen
            const link = document.createElement('a');
            link.download = `hours-chart-${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const handleDateSelect = (date: Date) => {
        if (!selectedFromDate || (selectedFromDate && selectedToDate)) {
            // Si no hay fecha de inicio o ya hay ambas fechas, empezar de nuevo
            setSelectedFromDate(date);
            setSelectedToDate(null);
        } else if (selectedFromDate && !selectedToDate) {
            // Si ya hay fecha de inicio, establecer fecha de fin
            if (date >= selectedFromDate) {
                setSelectedToDate(date);
            } else {
                setSelectedToDate(selectedFromDate);
                setSelectedFromDate(date);
            }
        }
    };

    const handleClearAll = () => {
        setSelectedFromDate(null);
        setSelectedToDate(null);
    };

    const handleSaveCustomDate = () => {
        if (selectedFromDate && selectedToDate) {
            setActiveTab(2);
            setCustomDateModalOpen(false);
            // Aquí podrías actualizar los datos basados en las fechas seleccionadas
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return 'Unspecified';
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const days = [];
        
        // Días del mes anterior
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonth.getDate() - i),
                isCurrentMonth: false
            });
        }
        
        // Días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                date: new Date(year, month, day),
                isCurrentMonth: true
            });
        }
        
        // Días del mes siguiente para completar la cuadrícula
        const remainingDays = 42 - days.length; // 6 semanas * 7 días
        for (let day = 1; day <= remainingDays; day++) {
            days.push({
                date: new Date(year, month + 1, day),
                isCurrentMonth: false
            });
        }
        
        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const handleJobsiteSelect = (jobsiteId: string) => {
        setSelectedJobsite(jobsiteId);
    };

    const handleClearJobsiteFilter = () => {
        setSelectedJobsite(null);
    };

    const handleSaveJobsiteFilter = () => {
        setJobsiteFilterModalOpen(false);
        // Aquí podrías filtrar los datos basados en el jobsite seleccionado
    };

    // Calcular métricas
    const totalPaid = expenses
        .filter(expense => expense.status === 'paid')
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    const totalHours = expenses.reduce((sum, expense) => sum + expense.hours, 0);
    const workersHired = expenses.length;
    const avgHourlyRate = expenses.length > 0 
        ? expenses.reduce((sum, expense) => sum + expense.hourlyRate, 0) / expenses.length 
        : 0;

    // Datos para el gráfico de horas (simulado)
    const weeklyHours = [40, 45, 35, 50, 42, 38, 48]; // Horas por día de la semana
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: { xs: '10px 0', sm: '15px', md: '20px' }
            }}
        >
            {/* Header fijo: Logo y navegación */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #E0E0E0'
            }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, sm: 3, md: 4 }
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2
                    }}>
                        {/* Logo y flecha de regreso */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                component="img"
                                src="/YAKKA.webp"
                                alt="YAKKA Logo"
                                sx={{
                                    width: { xs: 100, sm: 150 },
                                    height: { xs: 30, sm: 40 },
                                    objectFit: 'contain'
                                }}
                            />
                            {/* Flecha de regreso con círculo gris */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 32, sm: 40 },
                                height: { xs: 32, sm: 40 },
                                borderRadius: '50%',
                                backgroundColor: '#f5f5f5',
                                ml: 1
                            }}>
                                <IconButton
                                    onClick={() => router.back()}
                                    sx={{
                                        color: '#000000',
                                        backgroundColor: 'transparent',
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    <ArrowBackIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Header móvil: Título, filtro y pestañas */}
            <Box sx={{
                backgroundColor: '#ffffff',
                pt: { xs: 10, md: 10 } // Espacio para el header fijo
            }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, sm: 3, md: 4 }
                    }}
                >
                    {/* Título centrado */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: { xs: 1.5, sm: 2 }
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' }
                            }}
                        >
                            Reporting
                        </Typography>
                    </Box>

                     {/* Filtro de jobsite */}
                     <Box sx={{ pb: { xs: 1.5, sm: 2 } }}>
                         <Button
                             startIcon={<FilterListIcon />}
                             onClick={() => setJobsiteFilterModalOpen(true)}
                             sx={{
                                 width: '100%',
                                 border: 'none',
                                 color: '#000000',
                                 backgroundColor: '#f8f9fa',
                                 borderRadius: '8px',
                                 py: { xs: 1.25, sm: 1.5 },
                                 textTransform: 'none',
                                 fontSize: { xs: '0.875rem', sm: '1rem' },
                                 fontWeight: 'medium',
                                 '&:hover': {
                                     backgroundColor: '#f0f0f0'
                                 }
                             }}
                         >
                             {selectedJobsite 
                                 ? sampleJobsites.find(j => j.id === selectedJobsite)?.name || 'Filter jobsite'
                                 : 'Filter jobsite'
                             }
                         </Button>
                     </Box>

                    {/* Pestañas de tiempo */}
                    <Box sx={{ 
                        pb: 0,
                        display: 'flex',
                        width: '100%',
                        gap: { xs: 1, sm: 2 },
                        position: 'relative'
                    }}>
                        <Button
                            onClick={() => setActiveTab(0)}
                            sx={{
                                flex: 1,
                                color: activeTab === 0 ? '#ffffff' : '#000000',
                                backgroundColor: activeTab === 0 ? config.primaryColor : '#f8f9fa',
                                fontWeight: activeTab === 0 ? 'bold' : 'normal',
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                minHeight: { xs: 40, sm: 44, md: 48 },
                                border: 'none',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: activeTab === 0 ? config.buttonHoverColor : '#f0f0f0'
                                }
                            }}
                        >
                            This week
                        </Button>
                        <Button
                            onClick={() => setActiveTab(1)}
                            sx={{
                                flex: 1,
                                color: activeTab === 1 ? '#ffffff' : '#000000',
                                backgroundColor: activeTab === 1 ? config.primaryColor : '#f8f9fa',
                                fontWeight: activeTab === 1 ? 'bold' : 'normal',
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                minHeight: { xs: 40, sm: 44, md: 48 },
                                border: 'none',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: activeTab === 1 ? config.buttonHoverColor : '#f0f0f0'
                                }
                            }}
                        >
                            Last 30 days
                        </Button>
                        <Button
                            onClick={() => handleTabChange(null as any, 2)}
                            sx={{
                                flex: 1,
                                color: activeTab === 2 ? '#ffffff' : '#000000',
                                backgroundColor: activeTab === 2 ? config.primaryColor : '#f8f9fa',
                                fontWeight: activeTab === 2 ? 'bold' : 'normal',
                                textTransform: 'none',
                                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                                minHeight: { xs: 40, sm: 44, md: 48 },
                                border: 'none',
                                borderRadius: '8px',
                                '&:hover': {
                                    backgroundColor: activeTab === 2 ? config.buttonHoverColor : '#f0f0f0'
                                }
                            }}
                        >
                            {activeTab === 2 && selectedFromDate && selectedToDate 
                                ? `${formatDate(selectedFromDate)} - ${formatDate(selectedToDate)}`
                                : 'Custom'
                            }
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Contenido principal */}
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: 2,
                    pb: 4
                }}
            >
                {/* Tarjetas de métricas */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, sm: 2 }, 
                    mb: { xs: 3, sm: 4 },
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    {/* Primera fila en móvil: Total paid y Total hours */}
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        width: { xs: '100%', sm: 'auto' },
                        flex: { sm: 1 }
                    }}>
                        <Card sx={{
                            flex: 1,
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: '1px solid #000000'
                        }}>
                            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        mb: { xs: 0.5, sm: 1 }
                                    }}
                                >
                                    Total paid
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                                    }}
                                >
                                    {formatCurrency(totalPaid)}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            flex: 1,
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: '1px solid #000000'
                        }}>
                            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        mb: { xs: 0.5, sm: 1 }
                                    }}
                                >
                                    Total hours
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                                    }}
                                >
                                    {totalHours}h
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    
                    {/* Segunda fila en móvil: Workers hired y Avg hourly rate */}
                    <Box sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        width: { xs: '100%', sm: 'auto' },
                        flex: { sm: 1 }
                    }}>
                        <Card sx={{
                            flex: 1,
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: '1px solid #000000'
                        }}>
                            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        mb: { xs: 0.5, sm: 1 }
                                    }}
                                >
                                    Workers hired
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                                    }}
                                >
                                    {workersHired}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            flex: 1,
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            boxShadow: 'none',
                            border: '1px solid #000000'
                        }}>
                            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        mb: { xs: 0.5, sm: 1 }
                                    }}
                                >
                                    Avg hourly rate
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                                    }}
                                >
                                    ${Math.round(avgHourlyRate)}/h
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Gráfico de horas */}
                <Card sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: 'none',
                    border: '1px solid #000000',
                    mb: { xs: 3, sm: 4 }
                }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: { xs: 2, sm: 3 }
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    fontSize: { xs: '1rem', sm: '1.125rem' }
                                }}
                            >
                                Hours
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                    sx={{
                                        color: '#666666',
                                        backgroundColor: 'transparent',
                                        padding: { xs: 0.5, sm: 1 },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                >
                                    <FilterListIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                                </IconButton>
                                <IconButton
                                    onClick={handleDownloadChart}
                                    sx={{
                                        color: '#666666',
                                        backgroundColor: 'transparent',
                                        padding: { xs: 0.5, sm: 1 },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                >
                                    <DownloadIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Gráfico de líneas */}
                        <Box sx={{
                            height: { xs: 150, sm: 180, md: 200 },
                            position: 'relative',
                            backgroundColor: '#fafafa',
                            borderRadius: '8px',
                            p: { xs: 1.5, sm: 2 }
                        }}>
                            {/* Líneas de cuadrícula horizontales */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        position: 'absolute',
                                        left: 16,
                                        right: 16,
                                        height: '1px',
                                        backgroundColor: '#E0E0E0',
                                        top: `${20 + i * 20}%`
                                    }}
                                />
                            ))}
                            
                            {/* SVG para la gráfica de líneas */}
                            <svg
                                width="100%"
                                height="100%"
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                viewBox="0 0 400 200"
                                preserveAspectRatio="none"
                            >
                                {/* Línea de la gráfica */}
                                <polyline
                                    fill="none"
                                    stroke={config.primaryColor}
                                    strokeWidth="3"
                                    points={weeklyHours.map((hours, index) => {
                                        const x = (index / (weeklyHours.length - 1)) * 360 + 20;
                                        const y = 180 - (hours / 60) * 140;
                                        return `${x},${y}`;
                                    }).join(' ')}
                                />
                                
                                {/* Puntos de datos */}
                                {weeklyHours.map((hours, index) => {
                                    const x = (index / (weeklyHours.length - 1)) * 360 + 20;
                                    const y = 180 - (hours / 60) * 140;
                                    return (
                                        <circle
                                            key={index}
                                            cx={x}
                                            cy={y}
                                            r="4"
                                            fill={config.primaryColor}
                                        />
                                    );
                                })}
                            </svg>
                            
                            {/* Etiquetas de los días */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 8,
                                left: 16,
                                right: 16,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                {days.map((day, index) => (
                                    <Typography
                                        key={index}
                                        variant="caption"
                                        sx={{
                                            color: '#666666',
                                            fontSize: '0.75rem',
                                            fontWeight: 'medium'
                                        }}
                                    >
                                        {day}
                                    </Typography>
                                ))}
                            </Box>
                            
                            {/* Etiquetas de valores en el eje Y */}
                            <Box sx={{
                                position: 'absolute',
                                left: 8,
                                top: 8,
                                bottom: 32,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                {[60, 45, 30, 15, 0].map((value, index) => (
                                    <Typography
                                        key={index}
                                        variant="caption"
                                        sx={{
                                            color: '#999999',
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        {value}h
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Lista de trabajadores */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: { xs: 1.5, sm: 2 }
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: { xs: '1rem', sm: '1.125rem' }
                            }}
                        >
                            By worker
                        </Typography>
                        <IconButton
                            sx={{
                                color: '#666666',
                                backgroundColor: 'transparent',
                                padding: { xs: 0.5, sm: 1 },
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <SearchIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                        </IconButton>
                    </Box>

                    <List sx={{ p: 0 }}>
                        {expenses.map((expense) => (
                            <Card
                                key={expense.id}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    boxShadow: 'none',
                                    border: '1px solid #000000',
                                    mb: { xs: 1.5, sm: 2 }
                                }}
                            >
                                <ListItem sx={{ p: { xs: 2, sm: 3 } }}>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#000000',
                                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                                }}
                                            >
                                                {expense.workerName}
                                            </Typography>
                                        }
                                        secondary={
                                            <span>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{
                                                        color: '#666666',
                                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                        mb: 0.5,
                                                        display: 'block'
                                                    }}
                                                >
                                                    {expense.role}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{
                                                        color: '#666666',
                                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                        display: 'block'
                                                    }}
                                                >
                                                    {expense.date} - {expense.hours}h x ${expense.hourlyRate}/hr
                                                </Typography>
                                            </span>
                                        }
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        gap: { xs: 0.5, sm: 1 }
                                    }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#000000',
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            }}
                                        >
                                            {formatCurrency(expense.amount)}
                                        </Typography>
                                        <Chip
                                            icon={expense.status === 'paid' ? <CheckCircleIcon /> : <ScheduleIcon />}
                                            label={expense.status === 'paid' ? 'Paid' : 'Pending'}
                                            size="small"
                                            sx={{
                                                backgroundColor: expense.status === 'paid' ? '#E8F5E8' : '#FFF3E0',
                                                color: expense.status === 'paid' ? '#2E7D32' : '#F57C00',
                                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                                height: { xs: 20, sm: 24 },
                                                '& .MuiChip-icon': {
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }
                                            }}
                                        />
                                    </Box>
                                </ListItem>
                            </Card>
                        ))}
                    </List>
                </Box>

                {/* Floating Action Button */}
                <Fab
                    color="primary"
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 16, sm: 20 },
                        right: { xs: 16, sm: 20 },
                        backgroundColor: config.primaryColor,
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                        '&:hover': {
                            backgroundColor: config.buttonHoverColor
                        }
                    }}
                >
                    <AddIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                 </Fab>
             </Container>

             {/* Modal de fechas personalizadas */}
             <Dialog
                 open={customDateModalOpen}
                 onClose={() => setCustomDateModalOpen(false)}
                 maxWidth="sm"
                 fullWidth
                 fullScreen
                 sx={{
                     '& .MuiDialog-paper': {
                         margin: 0,
                         maxHeight: '100vh',
                         borderRadius: 0
                     }
                 }}
             >
                 {/* Header del modal */}
                 <Box sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     p: { xs: 2, sm: 3 },
                     borderBottom: '1px solid #E0E0E0'
                 }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                         <IconButton
                             onClick={() => setCustomDateModalOpen(false)}
                             sx={{
                                 color: '#000000',
                                 backgroundColor: '#f5f5f5',
                                 borderRadius: '50%',
                                 width: { xs: 36, sm: 40 },
                                 height: { xs: 36, sm: 40 },
                                 '&:hover': {
                                     backgroundColor: '#e0e0e0'
                                 }
                             }}
                         >
                             <ArrowBackIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                         </IconButton>
                         <Typography
                             variant="h6"
                             sx={{
                                 fontWeight: 'bold',
                                 color: '#000000',
                                 fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' }
                             }}
                         >
                             Custom
                         </Typography>
                     </Box>
                 </Box>

                 <DialogContent sx={{ p: 0, height: '100%' }}>
                     {/* Sección de fechas seleccionadas */}
                     <Box sx={{
                         p: { xs: 2, sm: 3 },
                         borderBottom: '1px solid #E0E0E0'
                     }}>
                         <Box sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             alignItems: 'center',
                             mb: { xs: 1.5, sm: 2 }
                         }}>
                             <Typography
                                 variant="h6"
                                 sx={{
                                     fontWeight: 'bold',
                                     color: '#000000',
                                     fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                                 }}
                             >
                                 Date Custom
                             </Typography>
                             <Button
                                 onClick={handleClearAll}
                                 sx={{
                                     color: '#666666',
                                     textTransform: 'none',
                                     fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                     py: { xs: 0.5, sm: 1 },
                                     '&:hover': {
                                         backgroundColor: 'transparent',
                                         textDecoration: 'underline'
                                     }
                                 }}
                             >
                                 Clear all
                             </Button>
                         </Box>

                         <Box sx={{
                             display: 'flex',
                             gap: { xs: 1.5, sm: 2 },
                             flexDirection: { xs: 'column', sm: 'row' }
                         }}>
                             <Box sx={{ flex: 1 }}>
                                 <Typography
                                     variant="body2"
                                     sx={{
                                         color: '#666666',
                                         fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                         mb: { xs: 0.75, sm: 1 }
                                     }}
                                 >
                                     From
                                 </Typography>
                                 <Box sx={{
                                     p: { xs: 1.5, sm: 2 },
                                     border: '1px solid #000000',
                                     borderRadius: '8px',
                                     backgroundColor: '#f8f9fa',
                                     minHeight: { xs: 44, sm: 48 },
                                     display: 'flex',
                                     alignItems: 'center'
                                 }}>
                                     <Typography
                                         sx={{
                                             color: selectedFromDate ? '#000000' : '#999999',
                                             fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                         }}
                                     >
                                         {formatDate(selectedFromDate)}
                                     </Typography>
                                 </Box>
                             </Box>
                             <Box sx={{ flex: 1 }}>
                                 <Typography
                                     variant="body2"
                                     sx={{
                                         color: '#666666',
                                         fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                         mb: { xs: 0.75, sm: 1 }
                                     }}
                                 >
                                     Until
                                 </Typography>
                                 <Box sx={{
                                     p: { xs: 1.5, sm: 2 },
                                     border: '1px solid #000000',
                                     borderRadius: '8px',
                                     backgroundColor: '#f8f9fa',
                                     minHeight: { xs: 44, sm: 48 },
                                     display: 'flex',
                                     alignItems: 'center'
                                 }}>
                                     <Typography
                                         sx={{
                                             color: selectedToDate ? '#000000' : '#999999',
                                             fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                         }}
                                     >
                                         {formatDate(selectedToDate)}
                                     </Typography>
                                 </Box>
                             </Box>
                         </Box>
                     </Box>

                     {/* Calendario */}
                     <Box sx={{ 
                         p: { xs: 1.5, sm: 3 },
                         overflow: 'hidden'
                     }}>
                         {/* Header del calendario */}
                         <Box sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             alignItems: 'center',
                             mb: { xs: 1.5, sm: 3 }
                         }}>
                             <IconButton
                                 onClick={() => navigateMonth('prev')}
                                 sx={{
                                     color: '#666666',
                                     width: { xs: 36, sm: 44 },
                                     height: { xs: 36, sm: 44 },
                                     minWidth: { xs: 36, sm: 44 },
                                     '&:hover': {
                                         backgroundColor: '#f5f5f5'
                                     }
                                 }}
                             >
                                 <ChevronLeftIcon sx={{ fontSize: { xs: 20, sm: 28 } }} />
                             </IconButton>
                             <Typography
                                 variant="h6"
                                 sx={{
                                     fontWeight: 'bold',
                                     color: '#000000',
                                     fontSize: { xs: '0.9rem', sm: '1.125rem', md: '1.25rem' },
                                     textAlign: 'center',
                                     flex: 1,
                                     mx: 1
                                 }}
                             >
                                 {currentMonth.toLocaleDateString('en-US', { 
                                     month: 'long', 
                                     year: 'numeric' 
                                 })}
                             </Typography>
                             <IconButton
                                 onClick={() => navigateMonth('next')}
                                 sx={{
                                     color: '#666666',
                                     width: { xs: 36, sm: 44 },
                                     height: { xs: 36, sm: 44 },
                                     minWidth: { xs: 36, sm: 44 },
                                     '&:hover': {
                                         backgroundColor: '#f5f5f5'
                                     }
                                 }}
                             >
                                 <ChevronRightIcon sx={{ fontSize: { xs: 20, sm: 28 } }} />
                             </IconButton>
                         </Box>

                         {/* Días de la semana */}
                         <Box sx={{
                             display: 'grid',
                             gridTemplateColumns: 'repeat(7, 1fr)',
                             gap: { xs: 0, sm: 1 },
                             mb: { xs: 1, sm: 2 },
                             width: '100%'
                         }}>
                             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                 <Typography
                                     key={day}
                                     sx={{
                                         textAlign: 'center',
                                         fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                         color: '#666666',
                                         fontWeight: 'medium',
                                         py: { xs: 0.5, sm: 1 },
                                         minWidth: 0,
                                         overflow: 'hidden'
                                     }}
                                 >
                                     {day}
                                 </Typography>
                             ))}
                         </Box>

                         {/* Días del calendario */}
                         <Box sx={{
                             display: 'grid',
                             gridTemplateColumns: 'repeat(7, 1fr)',
                             gap: { xs: 0, sm: 1 },
                             width: '100%',
                             maxWidth: '100%'
                         }}>
                             {getDaysInMonth(currentMonth).map((day, index) => {
                                 const isSelected = selectedFromDate && selectedToDate && 
                                     day.date >= selectedFromDate && day.date <= selectedToDate;
                                 const isFromDate = selectedFromDate && 
                                     day.date.toDateString() === selectedFromDate.toDateString();
                                 const isToDate = selectedToDate && 
                                     day.date.toDateString() === selectedToDate.toDateString();
                                 
                                 return (
                                     <Button
                                         key={index}
                                         onClick={() => handleDateSelect(day.date)}
                                         sx={{
                                             minHeight: { xs: 32, sm: 40, md: 44 },
                                             height: { xs: 32, sm: 40, md: 44 },
                                             p: 0,
                                             m: 0,
                                             minWidth: 0,
                                             color: day.isCurrentMonth ? '#000000' : '#999999',
                                             backgroundColor: isSelected ? '#E3F2FD' : 'transparent',
                                             borderRadius: { xs: '4px', sm: '8px' },
                                             fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
                                             fontWeight: isFromDate || isToDate ? 'bold' : 'normal',
                                             border: 'none',
                                             '&:hover': {
                                                 backgroundColor: isSelected ? '#BBDEFB' : '#f5f5f5'
                                             },
                                             ...(isFromDate || isToDate ? {
                                                 backgroundColor: config.primaryColor,
                                                 color: '#ffffff',
                                                 '&:hover': {
                                                     backgroundColor: config.buttonHoverColor
                                                 }
                                             } : {})
                                         }}
                                     >
                                         {day.date.getDate()}
                                     </Button>
                                 );
                             })}
                         </Box>
                     </Box>

                     {/* Botón Save dentro del contenido */}
                     <Box sx={{ p: { xs: 2, sm: 3 } }}>
                         <Button
                             onClick={handleSaveCustomDate}
                             disabled={!selectedFromDate || !selectedToDate}
                             sx={{
                                 width: '100%',
                                 backgroundColor: config.primaryColor,
                                 color: '#ffffff',
                                 borderRadius: '8px',
                                 py: { xs: 1.25, sm: 1.5 },
                                 fontSize: { xs: '0.9rem', sm: '1rem' },
                                 fontWeight: 'bold',
                                 textTransform: 'none',
                                 minHeight: { xs: 44, sm: 48 },
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
                 </DialogContent>

             </Dialog>

             {/* Modal de filtro de jobsites */}
             <Dialog
                 open={jobsiteFilterModalOpen}
                 onClose={() => setJobsiteFilterModalOpen(false)}
                 maxWidth="sm"
                 fullWidth
                 fullScreen
                 sx={{
                     '& .MuiDialog-paper': {
                         margin: 0,
                         maxHeight: '100vh',
                         borderRadius: 0
                     }
                 }}
             >
                 {/* Header del modal */}
                 <Box sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     p: { xs: 2, sm: 3 },
                     borderBottom: '1px solid #E0E0E0'
                 }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                         <IconButton
                             onClick={() => setJobsiteFilterModalOpen(false)}
                             sx={{
                                 color: '#000000',
                                 backgroundColor: '#f5f5f5',
                                 borderRadius: '50%',
                                 width: { xs: 36, sm: 40 },
                                 height: { xs: 36, sm: 40 },
                                 '&:hover': {
                                     backgroundColor: '#e0e0e0'
                                 }
                             }}
                         >
                             <ArrowBackIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                         </IconButton>
                         <Typography
                             variant="h6"
                             sx={{
                                 fontWeight: 'bold',
                                 color: '#000000',
                                 fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' }
                             }}
                         >
                             Jobsites
                         </Typography>
                     </Box>
                     <Button
                         onClick={handleClearJobsiteFilter}
                         sx={{
                             color: '#666666',
                             textTransform: 'none',
                             fontSize: { xs: '0.8rem', sm: '0.875rem' },
                             py: { xs: 0.5, sm: 1 },
                             '&:hover': {
                                 backgroundColor: 'transparent',
                                 textDecoration: 'underline'
                             }
                         }}
                     >
                         Clear all
                     </Button>
                 </Box>

                 <DialogContent sx={{ p: 0, height: '100%' }}>
                     {/* Lista de jobsites */}
                     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                         {sampleJobsites.map((jobsite) => (
                             <Card
                                 key={jobsite.id}
                                 onClick={() => handleJobsiteSelect(jobsite.id)}
                                 sx={{
                                     backgroundColor: '#ffffff',
                                     borderRadius: '12px',
                                     boxShadow: 'none',
                                     border: '1px solid #000000',
                                     mb: { xs: 1.5, sm: 2 },
                                     cursor: 'pointer',
                                     '&:hover': {
                                         backgroundColor: '#f8f9fa',
                                         border: '1px solid #333333'
                                     }
                                 }}
                             >
                                 <ListItem sx={{ p: { xs: 2, sm: 3 } }}>
                                     {/* Radio button */}
                                     <Box sx={{
                                         display: 'flex',
                                         alignItems: 'flex-start',
                                         mr: 2,
                                         pt: 0
                                     }}>
                                         {selectedJobsite === jobsite.id ? (
                                             <RadioButtonCheckedIcon 
                                                 sx={{ 
                                                     color: config.primaryColor,
                                                     fontSize: 24
                                                 }} 
                                             />
                                         ) : (
                                             <RadioButtonUncheckedIcon 
                                                 sx={{ 
                                                     color: '#000000',
                                                     fontSize: 24
                                                 }} 
                                             />
                                         )}
                                     </Box>

                                     {/* Información del jobsite */}
                                     <Box sx={{ flex: 1 }}>
                                         <Typography
                                             variant="h6"
                                             sx={{
                                                 fontWeight: 'bold',
                                                 color: '#000000',
                                                 fontSize: { xs: '0.9rem', sm: '1rem' },
                                                 mb: 0.5
                                             }}
                                         >
                                             {jobsite.name}
                                         </Typography>
                                         <Typography
                                             variant="body2"
                                             sx={{
                                                 color: '#666666',
                                                 fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                                 mb: 0.25
                                             }}
                                         >
                                             {jobsite.location}
                                         </Typography>
                                         <Typography
                                             variant="body2"
                                             sx={{
                                                 color: '#666666',
                                                 fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                                 mb: 0.25
                                             }}
                                         >
                                             {jobsite.address}
                                         </Typography>
                                         <Typography
                                             variant="body2"
                                             sx={{
                                                 color: '#666666',
                                                 fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                                 mb: 1
                                             }}
                                         >
                                             {jobsite.code}
                                         </Typography>
                                     </Box>

                                     {/* Status y View project */}
                                     <Box sx={{
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'flex-end',
                                         gap: 0.5
                                     }}>
                                         <Box sx={{
                                             display: 'flex',
                                             alignItems: 'center',
                                             gap: 0.5
                                         }}>
                                             <ShowChartOutlinedIcon sx={{ 
                                                 color: jobsite.status === 'In progress' ? '#4CAF50' : '#666666',
                                                 fontSize: 16
                                             }} />
                                             <Typography
                                                 variant="body2"
                                                 sx={{
                                                     color: '#666666',
                                                     fontSize: { xs: '0.75rem', sm: '0.8rem' }
                                                 }}
                                             >
                                                 {jobsite.status}
                                             </Typography>
                                         </Box>
                                         <Typography
                                             variant="body2"
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 setProjectOverviewModalOpen(true);
                                             }}
                                             sx={{
                                                 color: selectedJobsite === jobsite.id ? config.primaryColor : '#666666',
                                                 fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 gap: 0.5,
                                                 cursor: 'pointer',
                                                 '&:hover': {
                                                     textDecoration: 'underline'
                                                 }
                                             }}
                                         >
                                             <VisibilityIcon sx={{ fontSize: 16 }} />
                                             View project
                                         </Typography>
                                     </Box>
                                 </ListItem>
                             </Card>
                         ))}
                     </Box>
                 </DialogContent>

                 {/* Footer con botón Save */}
                 <Box sx={{
                     p: { xs: 2, sm: 3 },
                     borderTop: '1px solid #E0E0E0',
                     backgroundColor: '#ffffff'
                 }}>
                     <Button
                         onClick={handleSaveJobsiteFilter}
                         sx={{
                             width: '100%',
                             backgroundColor: config.primaryColor,
                             color: '#ffffff',
                             borderRadius: '8px',
                             py: { xs: 1.25, sm: 1.5 },
                             fontSize: { xs: '0.9rem', sm: '1rem' },
                             fontWeight: 'bold',
                             textTransform: 'none',
                             minHeight: { xs: 44, sm: 48 },
                             '&:hover': {
                                 backgroundColor: config.buttonHoverColor
                             }
                         }}
                     >
                         Save
                     </Button>
                 </Box>
             </Dialog>

             {/* Modal de Project Overview */}
             <Dialog
                 open={projectOverviewModalOpen}
                 onClose={() => setProjectOverviewModalOpen(false)}
                 maxWidth="sm"
                 fullWidth
                 fullScreen
                 sx={{
                     '& .MuiDialog-paper': {
                         margin: 0,
                         maxHeight: '100vh',
                         borderRadius: 0
                     }
                 }}
             >
                 {/* Header del modal */}
                 <Box sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     p: { xs: 2, sm: 3 },
                     borderBottom: '1px solid #E0E0E0'
                 }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                         <IconButton
                             onClick={() => setProjectOverviewModalOpen(false)}
                             sx={{
                                 color: '#000000',
                                 backgroundColor: '#f5f5f5',
                                 borderRadius: '50%',
                                 width: { xs: 36, sm: 40 },
                                 height: { xs: 36, sm: 40 },
                                 '&:hover': {
                                     backgroundColor: '#e0e0e0'
                                 }
                             }}
                         >
                             <ArrowBackIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                         </IconButton>
                         <Typography
                             variant="h6"
                             sx={{
                                 fontWeight: 'bold',
                                 color: '#000000',
                                 fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' }
                             }}
                         >
                             Project overview
                         </Typography>
                     </Box>
                 </Box>

                 <DialogContent sx={{ p: 0, height: '100%' }}>
                     <Box sx={{ p: { xs: 2, sm: 3 } }}>
                         {/* Project Details */}
                         <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                             <Box sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                                 mb: 2
                             }}>
                                 <Typography
                                     variant="h6"
                                     sx={{
                                         fontWeight: 'bold',
                                         color: '#000000',
                                         fontSize: { xs: '1rem', sm: '1.125rem' }
                                     }}
                                 >
                                     Project Details
                                 </Typography>
                                 <IconButton
                                     sx={{
                                         color: '#666666',
                                         padding: 0.5
                                     }}
                                 >
                                     <EditIcon sx={{ fontSize: 20 }} />
                                 </IconButton>
                             </Box>
                             <Box sx={{ display: 'flex', gap: 3 }}>
                                 <Box>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             color: '#666666',
                                             fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                             mb: 0.5
                                         }}
                                     >
                                         Start date
                                     </Typography>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             color: '#000000',
                                             fontSize: { xs: '0.875rem', sm: '1rem' }
                                         }}
                                     >
                                         21/08/2025
                                     </Typography>
                                 </Box>
                                 <Box>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             color: '#666666',
                                             fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                             mb: 0.5
                                         }}
                                     >
                                         End date
                                     </Typography>
                                     <Typography
                                         variant="body2"
                                         sx={{
                                             color: '#000000',
                                             fontSize: { xs: '0.875rem', sm: '1rem' }
                                         }}
                                     >
                                         21/06/2025
                                     </Typography>
                                 </Box>
                             </Box>
                         </Box>

                         {/* Project Admins */}
                         <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                             <Typography
                                 variant="h6"
                                 sx={{
                                     fontWeight: 'bold',
                                     color: '#000000',
                                     fontSize: { xs: '1rem', sm: '1.125rem' },
                                     mb: 2
                                 }}
                             >
                                 Project admins
                             </Typography>
                             <Typography
                                 variant="body2"
                                 sx={{
                                     color: '#000000',
                                     fontSize: { xs: '0.875rem', sm: '1rem' }
                                 }}
                             >
                                 Sani Lopez
                             </Typography>
                         </Box>

                         {/* Project Contacts */}
                         <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                             <Typography
                                 variant="h6"
                                 sx={{
                                     fontWeight: 'bold',
                                     color: '#000000',
                                     fontSize: { xs: '1rem', sm: '1.125rem' },
                                     mb: 2
                                 }}
                             >
                                 Project Contacts
                             </Typography>
                             <Typography
                                 variant="body2"
                                 sx={{
                                     color: '#000000',
                                     fontSize: { xs: '0.875rem', sm: '1rem' }
                                 }}
                             >
                                 John Lopez
                             </Typography>
                         </Box>

                         {/* Geolocations */}
                         <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                             <Typography
                                 variant="h6"
                                 sx={{
                                     fontWeight: 'bold',
                                     color: '#000000',
                                     fontSize: { xs: '1rem', sm: '1.125rem' },
                                     mb: 2
                                 }}
                             >
                                 Geolocations
                             </Typography>
                             <Typography
                                 variant="body2"
                                 sx={{
                                     color: '#000000',
                                     fontSize: { xs: '0.875rem', sm: '1rem' },
                                     mb: 2
                                 }}
                             >
                                 Geolocations turned on
                             </Typography>
                             
                             {/* Mapa Leaflet */}
                             <Box sx={{
                                 height: { xs: 300, sm: 350 },
                                 borderRadius: '0px',
                                 overflow: 'hidden',
                                 border: '1px solid #000000',
                                 position: 'relative'
                             }}>
                                 <iframe
                                     src="https://www.openstreetmap.org/export/embed.html?bbox=151.1%2C-33.9%2C151.3%2C-33.8&layer=mapnik&marker=-33.8688,151.2093"
                                     width="100%"
                                     height="100%"
                                     style={{
                                         border: 'none',
                                         borderRadius: '0px'
                                     }}
                                     title="Sydney Map"
                                 />
                             </Box>
                         </Box>

                         {/* Botón Save debajo del mapa */}
                         <Box sx={{ p: { xs: 2, sm: 3 } }}>
                             <Button
                                 onClick={() => setProjectOverviewModalOpen(false)}
                                 sx={{
                                     width: '100%',
                                     backgroundColor: config.primaryColor,
                                     color: '#ffffff',
                                     borderRadius: '8px',
                                     py: { xs: 1.25, sm: 1.5 },
                                     fontSize: { xs: '0.9rem', sm: '1rem' },
                                     fontWeight: 'bold',
                                     textTransform: 'none',
                                     minHeight: { xs: 44, sm: 48 },
                                     '&:hover': {
                                         backgroundColor: config.buttonHoverColor
                                     }
                                 }}
                             >
                                 Save & finish
                             </Button>
                         </Box>
                     </Box>
                 </DialogContent>

             </Dialog>
         </Box>
     );
 }

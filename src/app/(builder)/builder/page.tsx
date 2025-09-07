'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Avatar,
    IconButton,
    Chip,
    useTheme,
    alpha
} from '@mui/material';
import {
    LocationOnOutlined as LocationOnOutlinedIcon,
    NotificationsOutlined as NotificationsOutlinedIcon,
    ArrowForward as ArrowForwardIcon,
    WhatsApp as WhatsAppIcon,
    ControlPoint as ControlPointIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import {
    GroupPeopleIcon,
    CheckPeopleIcon,
    ChatRoundIcon,
    LocationIcon,
    ConstructorWithHardHatIcon,
    MoneyAltIcon,
    BarChartIcon
} from '@/components/common/IconosSvg';
import { useRouter } from 'next/navigation';
import { Routes } from '@/routes/Routes';

export default function BuilderPage() {
    const theme = useTheme();
    const router = useRouter();

    // Usar el flavor para los colores de los iconos
    const selectedFlavor = Flavor.SPORT; // Por defecto SPORT, se puede cambiar
    const config = flavorConfigs[selectedFlavor];

    const projectCards = [
        {
            icon: <LocationIcon color={config.primaryColor} fontSize={40} />,
            title: 'Jobsites',
            description: 'Get report by workplaces',
            action: () => router.push(Routes.JOBSITE)
        },
        {
            icon: <ConstructorWithHardHatIcon color={config.primaryColor} fontSize={40} />,
            title: 'Check your jobs',
            description: 'Create your job to get workers',
            action: () => console.log('Navigate to Check Jobs')
        }
    ];

    const workerCards = [
        {
            icon: <GroupPeopleIcon color={config.primaryColor} fontSize={40} />,
            title: 'Manage your staff',
            action: () => console.log('Navigate to Manage Staff')
        },
        {
            icon: <CheckPeopleIcon color={config.primaryColor} fontSize={40} />,
            title: 'Check your applicants',
            action: () => console.log('Navigate to Check Applicants')
        },
        {
            icon: <ChatRoundIcon color={config.primaryColor} fontSize={40} />,
            title: 'Chat with workers',
            action: () => console.log('Navigate to Chat')
        }
    ];

    const managementCards = [
        {
            icon: <MoneyAltIcon color={config.primaryColor} fontSize={40} />,
            title: 'Invoices and payments',
            action: () => console.log('Navigate to Invoices')
        },
        {
            icon: <BarChartIcon color={config.primaryColor} fontSize={40} />,
            title: 'Expenses',
            action: () => console.log('Navigate to Expenses')
        },
        {
            icon: <WhatsAppIcon sx={{ fontSize: 40, color: config.primaryColor }} />,
            title: 'Contact us via WhatsApp',
            action: () => console.log('Navigate to WhatsApp')
        }
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(90deg,rgb(255, 233, 105) 0%,rgb(188, 226, 241) 100%)',
                padding: { xs: '10px 0', sm: '15px', md: '20px' }
            }}
        >
            {/* Header fijo en la parte superior */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                py: 2
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
                        alignItems: 'center'
                    }}>
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: '#000000',
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }}
                            >
                                Y
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    fontSize: '24px'
                                }}
                            >
                                YAKKA
                            </Typography>
                        </Box>

                        {/* User Actions */}
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <IconButton
                                onClick={() => router.push(Routes.BUILDER_PROFILE)}
                                sx={{
                                    padding: 0,
                                    '&:hover': {
                                        backgroundColor: 'transparent'
                                    }
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: '#E0E0E0',
                                        border: '1px solid #BDBDBD',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            border: '2px solid #000000'
                                        }
                                    }}
                                    src="/bartender_pro.webp"
                                    alt="Profile"
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#000000',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                <NotificationsOutlinedIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Contenido principal centrado */}
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 12, sm: 14, md: 16 }, // Espacio para el header fijo
                    pb: 4
                }}
            >
                {/* Action Buttons a la izquierda */}
                <Box sx={{
                    display: 'flex',
                    gap: { xs: 1, md: 2 },
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: { xs: 'column', sm: 'row' },
                    mb: 6
                }}>
                    <Button
                        variant="contained"
                        startIcon={<ControlPointIcon />}
                        onClick={() => router.push(Routes.BUILDER_POST_JOB)}
                        sx={{
                            backgroundColor: '#333333',
                            color: 'white',
                            borderRadius: '8px',
                            px: { xs: 4, md: 10 },
                            py: 1,
                            fontSize: { xs: '12px', md: '14px' },
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            minWidth: { xs: '100%', sm: '180px', md: '220px' },
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                backgroundColor: '#555555'
                            }
                        }}
                    >
                        Post a Job
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LocationOnOutlinedIcon />}
                        sx={{
                            borderColor: '#000000',
                            color: '#000000',
                            backgroundColor: 'transparent',
                            border: '2px solid #000000',
                            borderRadius: '8px',
                            px: { xs: 4, md: 10 },
                            py: 1,
                            fontSize: { xs: '12px', md: '14px' },
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            minWidth: { xs: '100%', sm: '180px', md: '220px' },
                            width: { xs: '100%', sm: 'auto' },
                            '&:hover': {
                                borderColor: '#333333',
                                color: '#333333'
                            }
                        }}
                    >
                        Search Workers
                    </Button>
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: { xs: 2, md: 4 }
                    }}
                >
                    {/* Left Column - YOUR PROJECTS */}
                    <Box sx={{
                        flex: { xs: '1', lg: '0 0 40%' },
                        maxWidth: { xs: '100%', lg: '40%' },
                        width: { xs: '100%', lg: 'auto' }
                    }}>
                        {/* Panel de fondo suave que agrupa las tarjetas */}
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '10px',
                                padding: { xs: '15px', md: '20px' },
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    mb: 1.5,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontSize: '0.8rem'
                                }}
                            >
                                YOUR PROJECTS
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {projectCards.map((card, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 2,
                                            boxShadow: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                            }
                                        }}
                                        onClick={card.action}
                                    >
                                        <CardContent sx={{ p: 3, minHeight: '120px', display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    {card.icon}
                                                    <Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                color: '#000000',
                                                                fontSize: '1rem'
                                                            }}
                                                        >
                                                            {card.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ color: 'rgba(0,0,0,0.7)', fontSize: '0.75rem' }}
                                                        >
                                                            {card.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <ArrowForwardIcon
                                                    sx={{
                                                        color: '#000000',
                                                        fontSize: 24
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Column */}
                    <Box sx={{
                        flex: 1,
                        width: { xs: '100%', lg: 'auto' }
                    }}>
                        {/* WORKERS Section */}
                        {/* Panel de fondo suave que agrupa las tarjetas */}
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                padding: { xs: '15px', md: '20px' },
                                boxShadow: 'none',
                                mb: { xs: 2, md: 4 },
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    mb: 1.5,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontSize: '0.8rem'
                                }}
                            >
                                WORKERS
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)'
                                    },
                                    gap: { xs: 1.5, md: 2 }
                                }}
                            >
                                {workerCards.map((card, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 2,
                                            border: '2px solid #E0E0E0',
                                            boxShadow: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            height: '100%',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                border: '2px solid #BDBDBD',
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                            }
                                        }}
                                        onClick={card.action}
                                    >
                                        <CardContent
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                height: '100%',
                                                minHeight: '120px'
                                            }}
                                        >
                                            {card.icon}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#000000',
                                                    mt: 1,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {card.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>

                        {/* MANAGEMENT Section */}
                        {/* Panel de fondo suave que agrupa las tarjetas */}
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                padding: { xs: '15px', md: '20px' },
                                boxShadow: 'none',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    mb: 1.5,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontSize: '0.8rem'
                                }}
                            >
                                MANAGEMENT
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)'
                                    },
                                    gap: { xs: 1.5, md: 2 }
                                }}
                            >
                                {managementCards.map((card, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: '12px',
                                            border: '2px solid #E0E0E0',
                                            boxShadow: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            height: '100%',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                border: '2px solid #BDBDBD',
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                            }
                                        }}
                                        onClick={card.action}
                                    >
                                        <CardContent
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                height: '100%',
                                                minHeight: '120px'
                                            }}
                                        >
                                            {card.icon}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    color: '#000000',
                                                    mt: 1,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {card.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
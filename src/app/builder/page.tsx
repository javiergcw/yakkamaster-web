'use client';

import React, { useState } from 'react';
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
    alpha,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Badge,
    Tabs,
    Tab,
    Paper
} from '@mui/material';
import {
    LocationOnOutlined as LocationOnOutlinedIcon,
    NotificationsOutlined as NotificationsOutlinedIcon,
    ArrowForward as ArrowForwardIcon,
    WhatsApp as WhatsAppIcon,
    ControlPoint as ControlPointIcon,
    Close as CloseIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    Payment as PaymentIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { CURRENT_FLAVOR, getCurrentFlavorConfig } from '@/types/favorGlobal';
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
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Usar el flavor para los colores de los iconos
    const selectedFlavor = CURRENT_FLAVOR; // Usar flavor global
    const config = getCurrentFlavorConfig();

    // Datos de ejemplo para las notificaciones organizadas por tiempo
    const notifications = {
        new: [
            {
                id: 1,
                type: 'worker',
                message: 'Juan Pérez applied for the Constructor job at Site A',
                time: '33 min',
                unread: true
            },
            {
                id: 2,
                type: 'job',
                message: 'The job at Site A has been completed successfully',
                time: '2 h',
                unread: true
            }
        ],
        today: [
            {
                id: 3,
                type: 'payment',
                message: 'Payment of $1,200 has been processed correctly',
                time: '5 h',
                unread: true
            },
            {
                id: 4,
                type: 'worker',
                message: 'María García confirmed her attendance for tomorrow',
                time: '6 h',
                unread: true
            }
        ],
        previous: [
            {
                id: 5,
                type: 'worker',
                message: 'Carlos López applied for the Electrician job',
                time: '16 h',
                unread: false
            },
            {
                id: 6,
                type: 'job',
                message: 'The job at Site B is scheduled for tomorrow',
                time: '1 d',
                unread: false
            }
        ]
    };

    const allNotifications = [...notifications.new, ...notifications.today, ...notifications.previous];
    const unreadNotifications = allNotifications.filter(n => n.unread);
    const unreadCount = unreadNotifications.length;

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
            action: () => router.push(Routes.BUILDER_REQUEST_WORKERS)
        },
        {
            icon: <CheckPeopleIcon color={config.primaryColor} fontSize={40} />,
            title: 'Check your applicants',
            action: () => router.push(Routes.BUILDER_APPLICANTS)
        },
        {
            icon: <ChatRoundIcon color={config.primaryColor} fontSize={40} />,
            title: 'Chat with workers',
            action: () => router.push(Routes.BUILDER_CHAT_WITH_WORKERS)
        }
    ];

    const managementCards = [
        {
            icon: <MoneyAltIcon color={config.primaryColor} fontSize={40} />,
            title: 'Invoices and payments',
            action: () => router.push(Routes.BUILDER_INVOICES)
        },
        {
            icon: <BarChartIcon color={config.primaryColor} fontSize={40} />,
            title: 'Expenses',
            action: () => router.push(Routes.BUILDER_EXPENSES)
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
                                component="img"
                                src="/YAKKA.webp"
                                alt="YAKKA Logo"
                                sx={{
                                    width: { xs: 100, sm: 150 },
                                    height: { xs: 30, sm: 40 },
                                    objectFit: 'contain'
                                }}
                            />
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
                                onClick={() => setNotificationsOpen(true)}
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
                                <Badge 
                                    badgeContent={unreadCount} 
                                    color="error"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            fontSize: '0.6rem',
                                            minWidth: '16px',
                                            height: '16px'
                                        }
                                    }}
                                >
                                    <NotificationsOutlinedIcon sx={{ fontSize: 20 }} />
                                </Badge>
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
                                                    justifyContent: 'space-between',
                                                    width: '100%'
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                                    {card.icon}
                                                    <Box sx={{ flex: 1 }}>
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
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    minWidth: '40px',
                                                    ml: 2
                                                }}>
                                                    <ArrowForwardIcon
                                                        sx={{
                                                            color: '#000000',
                                                            fontSize: 24
                                                        }}
                                                    />
                                                </Box>
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

            {/* Panel de Notificaciones tipo Facebook */}
            <Drawer
                anchor="right"
                open={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '400px', md: '450px' },
                        backgroundColor: '#FFFFFF',
                        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
                        border: 'none'
                    }
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid #E4E6EA',
                            backgroundColor: '#FFFFFF'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1C1E21',
                                fontSize: '1.25rem'
                            }}
                        >
                            Notifications
                        </Typography>
                        <IconButton
                            onClick={() => setNotificationsOpen(false)}
                            sx={{
                                color: '#65676B',
                                '&:hover': {
                                    backgroundColor: '#F0F2F5'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: '1px solid #E4E6EA' }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    color: '#65676B',
                                    '&.Mui-selected': {
                                        color: config.primaryColor
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: config.primaryColor,
                                    height: 3
                                }
                            }}
                        >
                            <Tab label="All" />
                            <Tab 
                                label={`Unread ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
                                sx={{ 
                                    color: unreadCount > 0 ? config.primaryColor : '#65676B',
                                    fontWeight: unreadCount > 0 ? 'bold' : 600
                                }}
                            />
                        </Tabs>
                    </Box>

                    {/* Contenido */}
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        {activeTab === 0 ? (
                            // Todas las notificaciones
                            <Box>
                                {/* Sección New */}
                                {notifications.new.length > 0 && (
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 2,
                                                backgroundColor: '#F8F9FA'
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#1C1E21',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                New
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: config.primaryColor,
                                                    fontSize: '0.8rem',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                See all
                                            </Typography>
                                        </Box>
                                        <List sx={{ p: 0 }}>
                                            {notifications.new.map((notification) => (
                                                <ListItem
                                                    key={notification.id}
                                                    sx={{
                                                        p: 2,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#F0F2F5'
                                                        }
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#1C1E21',
                                                                    fontSize: '0.9rem',
                                                                    lineHeight: 1.4,
                                                                    mb: 0.5
                                                                }}
                                                            >
                                                                {notification.message}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: config.primaryColor,
                                                                    fontSize: '0.8rem'
                                                                }}
                                                            >
                                                                {notification.time}
                                                            </Typography>
                                                        }
                                                    />
                                                    {notification.unread && (
                                                        <Box
                                                            sx={{
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: '50%',
                                                                backgroundColor: config.primaryColor,
                                                                ml: 1,
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                    )}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {/* Sección Today */}
                                {notifications.today.length > 0 && (
                                    <Box>
                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: '#F8F9FA'
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#1C1E21',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                Today
                                            </Typography>
                                        </Box>
                                        <List sx={{ p: 0 }}>
                                            {notifications.today.map((notification) => (
                                                <ListItem
                                                    key={notification.id}
                                                    sx={{
                                                        p: 2,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#F0F2F5'
                                                        }
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#1C1E21',
                                                                    fontSize: '0.9rem',
                                                                    lineHeight: 1.4,
                                                                    mb: 0.5
                                                                }}
                                                            >
                                                                {notification.message}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: config.primaryColor,
                                                                    fontSize: '0.8rem'
                                                                }}
                                                            >
                                                                {notification.time}
                                                            </Typography>
                                                        }
                                                    />
                                                    {notification.unread && (
                                                        <Box
                                                            sx={{
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: '50%',
                                                                backgroundColor: config.primaryColor,
                                                                ml: 1,
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                    )}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                {/* Sección Previous */}
                                {notifications.previous.length > 0 && (
                                    <Box>
                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: '#F8F9FA'
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#1C1E21',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                Previous
                                            </Typography>
                                        </Box>
                                        <List sx={{ p: 0 }}>
                                            {notifications.previous.map((notification) => (
                                                <ListItem
                                                    key={notification.id}
                                                    sx={{
                                                        p: 2,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#F0F2F5'
                                                        }
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#1C1E21',
                                                                    fontSize: '0.9rem',
                                                                    lineHeight: 1.4,
                                                                    mb: 0.5
                                                                }}
                                                            >
                                                                {notification.message}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: config.primaryColor,
                                                                    fontSize: '0.8rem'
                                                                }}
                                                            >
                                                                {notification.time}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            // Solo notificaciones no leídas
                            <Box>
                                {unreadNotifications.length === 0 ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: 4,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <CheckCircleIcon
                                            sx={{
                                                fontSize: 48,
                                                color: '#42B883',
                                                mb: 2
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#65676B',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            You have no unread notifications
                                        </Typography>
                                    </Box>
                                ) : (
                                    <List sx={{ p: 0 }}>
                                        {unreadNotifications.map((notification) => (
                                            <ListItem
                                                key={notification.id}
                                                sx={{
                                                    p: 2,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: '#F0F2F5'
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: '#1C1E21',
                                                                fontSize: '0.9rem',
                                                                lineHeight: 1.4,
                                                                mb: 0.5
                                                            }}
                                                        >
                                                            {notification.message}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: '#1877F2',
                                                                fontSize: '0.8rem'
                                                            }}
                                                        >
                                                            {notification.time}
                                                        </Typography>
                                                    }
                                                />
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        backgroundColor: '#1877F2',
                                                        ml: 1,
                                                        flexShrink: 0
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
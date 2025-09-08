'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    IconButton,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    PersonOutline as PersonIcon,
    HelpOutline as HelpIcon,
    DescriptionOutlined as DescriptionIcon,
    DeleteOutline as DeleteIcon,
    LogoutOutlined as LogoutIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleMenuClick = (action: string) => {
        console.log(`Clicked: ${action}`);
        // Aquí puedes agregar la lógica para cada acción del menú
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(90deg, #FFD904 0%, #D4EFFF 85%)',
                position: 'relative'
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: 'transparent',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
              

                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pt: { xs: 3, sm: 2 },
                            pb: { xs: 1, sm: 2 },
                            px: { xs: 0, sm: 4, md: 6 }
                        }}
                    >
                        {/* Logo YAKKA */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    width: { xs: 32, sm: 40 },
                                    height: { xs: 32, sm: 40 },
                                    backgroundColor: '#000000',
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}
                            >
                                {/* Casco amarillo */}
                                <Box
                                    sx={{
                                        width: { xs: 16, sm: 20 },
                                        height: { xs: 12, sm: 16 },
                                        backgroundColor: '#FFD700',
                                        borderRadius: '50% 50% 40% 40%',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 2,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 2,
                                            height: 8,
                                            backgroundColor: '#000000',
                                            borderRadius: '1px'
                                        }
                                    }}
                                />
                                {/* Letra Y */}
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        bottom: 2,
                                        color: '#000000',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '10px', sm: '12px' },
                                        lineHeight: 1
                                    }}
                                >
                                    Y
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    fontSize: { xs: '18px', sm: '24px' }
                                }}
                            >
                                YAKKA
                            </Typography>
                        </Box>

                        {/* Botón Back circular al lado del logo */}
                        <IconButton
                            onClick={handleBack}
                            sx={{
                                color: '#000000',
                                backgroundColor: '#FFFFFF',
                                
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                ml: { xs: 1, sm: 2 },
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.8)'
                                }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
      

                {/* Título Profile alineado con el avatar */}
 
                <Box
                    sx={{
                        textAlign: 'left',
                        pb: { xs: 1, sm: 2 },
                        maxWidth: '1200px',
                        mx: 'auto',
                        mt: 1,
                        px: { xs: 2, sm: 4, md: 6 }
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#000000',
                            fontSize: { xs: '20px', sm: '24px', md: '28px' }
                        }}
                    >
                        Profile
                    </Typography>
                </Box>
                </Container>
            </Box>

            {/* Línea separadora con fondo gris claro */}
            <Box
                sx={{
                    backgroundColor: '#A79269',
                    height: '1px'
                }}
            />

            {/* Contenido principal */}
            <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4, md: 8 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 0
                        ,
                        alignItems: { xs: 'center', md: 'flex-start' }
                    }}
                >
                    {/* Columna izquierda - Información del perfil */}
                    <Box
                        sx={{
                            flex: { xs: 'none', md: '1' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            minWidth: { xs: '100%', md: '300px' }
                        }}
                    >

                        {/* Foto de perfil */}
                        <Avatar
                            src="/bartender_pro.webp"
                            alt="Profile"
                            sx={{
                                width: { xs: 80, sm: 100, md: 120 },
                                height: { xs: 80, sm: 100, md: 120 },
                                mt: { xs: 2, sm: 3, md: 5 },
                                mb: 1,
                                backgroundColor: '#f0f0f0'
                            }}
                        />

                        {/* Nombre */}
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: { xs: '20px', sm: '24px' },
                                mb: 1
                            }}
                        >
                            rama roman
                        </Typography>

                        {/* Empresa */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: { xs: '14px', sm: '16px' },
                                mb: 1,
                            }}
                        >
                            Company linked: Test company by Yakka
                        </Typography>

                        {/* User ID */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#000000',
                                fontSize: { xs: '12px', sm: '14px' },
                                mb: 3,
                                opacity: 0.6
                            }}
                        >
                            user ID #931
                        </Typography>

                        {/* Stats */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: { xs: 2, sm: 3 },
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}
                        >
                            {/* Jobs */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '24px', sm: '28px' },
                                        lineHeight: 1
                                    }}
                                >
                                    1
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#000000',
                                        fontSize: { xs: '12px', sm: '14px' },
                                        opacity: 0.7
                                    }}
                                >
                                    Jobs
                                </Typography>
                            </Box>

                            {/* Divider */}
                            <Divider
                                orientation="vertical"
                                sx={{
                                    height: '40px',
                                    borderColor: '#A79269'
                                }}
                            />

                            {/* Rating */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: { xs: '20px', sm: '24px' },
                                        lineHeight: 1
                                    }}
                                >
                                    5.0★
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#000000',
                                        fontSize: { xs: '12px', sm: '14px' },
                                        opacity: 0.7
                                    }}
                                >
                                    Rating
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Columna derecha - Menú de opciones */}
                    <Box
                        sx={{
                            flex: { xs: 'none', md: '1' },
                            minWidth: { xs: '100%', md: '300px' },
                            mt: { xs: 2, md: 0 }
                        }}
                    >
                        <List
                        >
                            {/* Personal details */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick('personal-details')}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <PersonIcon sx={{ color: '#000000', fontSize: 22 }} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Personal details"
                                        primaryTypographyProps={{
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            color: '#000000'
                                        }}
                                    />
                                    <ChevronRightIcon sx={{ color: '#000000', fontSize: 20 }} />
                                </ListItemButton>
                            </ListItem>

                            <Divider sx={{ borderColor: '#A79269' }} />

                            {/* Help */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick('help')}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <HelpIcon sx={{ color: '#000000', fontSize: 22 }} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Help"
                                        primaryTypographyProps={{
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            color: '#000000'
                                        }}
                                    />
                                    <ChevronRightIcon sx={{ color: '#000000', fontSize: 20 }} />
                                </ListItemButton>
                            </ListItem>

                            <Divider sx={{ borderColor: '#A79269' }} />

                            {/* Terms and conditions */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick('terms')}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <DescriptionIcon sx={{ color: '#000000', fontSize: 22 }} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Terms and conditions"
                                        primaryTypographyProps={{
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            color: '#000000'
                                        }}
                                    />
                                    <ChevronRightIcon sx={{ color: '#000000', fontSize: 20 }} />
                                </ListItemButton>
                            </ListItem>

                            <Divider sx={{ borderColor: '#A79269' }} />

                            {/* Delete account */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick('delete-account')}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <DeleteIcon sx={{ color: '#000000', fontSize: 22 }} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Delete account"
                                        primaryTypographyProps={{
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            color: '#000000'
                                        }}
                                    />
                                    <ChevronRightIcon sx={{ color: '#000000', fontSize: 20 }} />
                                </ListItemButton>
                            </ListItem>

                            <Divider sx={{ borderColor: '#A79269' }} />

                            {/* Log out */}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleMenuClick('logout')}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            transform: 'translateX(4px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 50, mr: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <LogoutIcon sx={{ color: '#000000', fontSize: 22 }} />
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Log out"
                                        primaryTypographyProps={{
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            color: '#000000'
                                        }}
                                    />
                                    <ChevronRightIcon sx={{ color: '#000000', fontSize: 20 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

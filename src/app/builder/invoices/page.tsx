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
    Fab
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    AttachMoney as AttachMoneyIcon,
    Add as AddIcon,
    Sort as SortIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import InvoiceCard from '@/components/common/InvoiceCard';
import { CURRENT_FLAVOR, getCurrentFlavorConfig } from '@/types/favorGlobal';

interface Invoice {
    id: string;
    number: string;
    clientName: string;
    amount: number;
    dueDate: string;
    status: 'sent' | 'opened' | 'paid' | 'overdue';
    overdueDays?: number;
    date: string;
}

// Datos de ejemplo para las facturas
const sampleInvoices: Invoice[] = [
    {
        id: '1',
        number: '#7292',
        clientName: 'Eduardo',
        amount: 693.00,
        dueDate: '21 Aug',
        status: 'overdue',
        overdueDays: 3,
        date: '21 Aug'
    },
    {
        id: '2',
        number: '#3',
        clientName: 'Julia',
        amount: 6600.00,
        dueDate: '17 Aug',
        status: 'opened',
        overdueDays: 7,
        date: '17 Aug'
    }
];

export default function InvoicesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [invoices] = useState<Invoice[]>(sampleInvoices);
    
    // Usar el flavor para los colores
    const selectedFlavor = CURRENT_FLAVOR;
    const config = getCurrentFlavorConfig();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
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
                backgroundColor: '#ffffff'
            }}>
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, sm: 3, md: 4 }
                    }}
                >
                    {/* Primera fila: Logo y navegación */}
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

                    {/* Segunda fila: Título centrado */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 2
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                            }}
                        >
                            Invoices
                        </Typography>
                    </Box>

                    {/* Tercera fila: Pestañas centradas con línea divisora */}
                    <Box sx={{ 
                        pb: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                    
                    }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: config.primaryColor,
                                    height: 3
                                },
                                '& .MuiTab-root': {
                                    '&:hover': {
                                        color: '#000000 !important',
                                        backgroundColor: 'transparent'
                                    },
                                    '&.Mui-selected': {
                                        color: '#000000 !important'
                                    }
                                }
                            }}
                        >
                            <Tab
                                label="Completed jobs"
                                sx={{
                                    color: activeTab === 0 ? '#000000' : '#9E9E9E',
                                    fontWeight: activeTab === 0 ? 'bold' : 'normal',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    minHeight: 48
                                }}
                            />
                            <Tab
                                label="Payment History"
                                sx={{
                                    color: activeTab === 1 ? '#000000' : '#9E9E9E',
                                    fontWeight: activeTab === 1 ? 'bold' : 'normal',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    minHeight: 48
                                }}
                            />
                        </Tabs>
                        
                        {/* Línea divisora al nivel de la franja amarilla */}
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100vw',
                            height: '1px',
                            backgroundColor: '#d1d5db',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1
                        }} />
                    </Box>
                </Container>
            </Box>

            {/* Contenido principal */}
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 20, sm: 24, md: 28 }, // Más espacio para el header expandido
                    pb: 4
                }}
            >

                {/* Filtros y ordenamiento - solo mostrar cuando hay facturas */}
                {invoices.length > 0 && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#9E9E9E',
                                fontSize: '0.875rem'
                            }}
                        >
                            Sorted by due date
                        </Typography>
                        <IconButton
                            sx={{
                                color: '#9E9E9E',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <SortIcon />
                        </IconButton>
                    </Box>
                )}

                {/* Lista de facturas */}
                {invoices.length > 0 ? (
                    <Box sx={{ mb: 4 }}>
                        {invoices.map((invoice) => (
                            <InvoiceCard key={invoice.id} invoice={invoice} />
                        ))}
                    </Box>
                ) : (
                    /* Estado vacío */
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                        textAlign: 'center'
                    }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '12px',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3
                        }}>
                            <AttachMoneyIcon sx={{ fontSize: 40, color: config.primaryColor }} />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                mb: 1
                            }}
                        >
                            No invoices yet
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666666',
                                mb: 4,
                                maxWidth: 500
                            }}
                        >
                            You currently don't have any invoices to pay. Check back later!
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: config.primaryColor,
                                color: '#ffffff',
                                borderRadius: '8px',
                                px: 6,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                minWidth: 200,
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: config.buttonHoverColor,
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            Request workers
                        </Button>
                    </Box>
                )}

                {/* Footer con total */}
                {invoices.length > 0 && (
                    <Box sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#ffffff',
                        borderTop: '1px solid #E0E0E0',
                        py: 2,
                        zIndex: 1000
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
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000'
                                    }}
                                >
                                    Total
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000'
                                    }}
                                >
                                    {formatCurrency(totalAmount)}
                                </Typography>
                            </Box>
                        </Container>
                    </Box>
                )}

                {/* Floating Action Button - solo mostrar cuando hay facturas */}
                {invoices.length > 0 && (
                    <Fab
                        color="primary"
                        sx={{
                            position: 'fixed',
                            bottom: 80,
                            right: 20,
                            backgroundColor: config.primaryColor,
                            '&:hover': {
                                backgroundColor: config.buttonHoverColor
                            }
                        }}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Container>
        </Box>
    );
}

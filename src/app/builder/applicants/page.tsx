'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ApplicantCard from '@/components/common/ApplicantCard';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';

// Datos de ejemplo para los solicitantes
const mockApplicants = [
    {
        id: 1,
        jobsite: "1 test ridge, Sydney, Sydney",
        applicantName: "testing testing",
        role: "Truck Driver",
        rating: 5.0,
        profileImage: "/img/profile-placeholder.jpg"
    },
    {
        id: 2,
        jobsite: "1 test ridge, Sydney, Sydney",
        applicantName: "John Smith",
        role: "Construction Worker",
        rating: 4.8,
        profileImage: "/img/profile-placeholder.jpg"
    },
    {
        id: 3,
        jobsite: "1 test ridge, Sydney, Sydney",
        applicantName: "Maria Garcia",
        role: "Electrician",
        rating: 4.9,
        profileImage: "/img/profile-placeholder.jpg"
    },
    {
        id: 4,
        jobsite: "1 test ridge, Sydney, Sydney",
        applicantName: "David Johnson",
        role: "Plumber",
        rating: 4.7,
        profileImage: "/img/profile-placeholder.jpg"
    }
];

export default function ApplicantsPage() {
    const router = useRouter();
    const selectedFlavor = CURRENT_FLAVOR;
    const flavorConfig = flavorConfigs[selectedFlavor];
    
    const [applicants, setApplicants] = useState(mockApplicants);
    const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
    const [actionDialog, setActionDialog] = useState<{
        open: boolean;
        type: 'hire' | 'decline' | null;
        applicant: any;
    }>({
        open: false,
        type: null,
        applicant: null
    });

    const handleBack = () => {
        router.back();
    };

    const handleChat = (applicant: any) => {
        console.log('Iniciar chat con:', applicant.applicantName);
        // Aquí implementarías la lógica para abrir el chat
    };

    const handleDecline = (applicant: any) => {
        setActionDialog({
            open: true,
            type: 'decline',
            applicant
        });
    };

    const handleHire = (applicant: any) => {
        setActionDialog({
            open: true,
            type: 'hire',
            applicant
        });
    };

    const confirmAction = () => {
        const { type, applicant } = actionDialog;
        
        if (type === 'decline') {
            // Remover el solicitante de la lista
            setApplicants(prev => prev.filter(app => app.id !== applicant.id));
            console.log('Solicitante rechazado:', applicant.applicantName);
        } else if (type === 'hire') {
            // Aquí implementarías la lógica para contratar
            console.log('Solicitante contratado:', applicant.applicantName);
            // Opcionalmente, remover de la lista o marcarlo como contratado
            setApplicants(prev => prev.filter(app => app.id !== applicant.id));
        }
        
        setActionDialog({
            open: false,
            type: null,
            applicant: null
        });
    };

    const cancelAction = () => {
        setActionDialog({
            open: false,
            type: null,
            applicant: null
        });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                pt: 8 // Espacio para el header fijo
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: 2
                }}
            >
                {/* Logo YAKKA y botón Back */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src="/YAKKA.webp"
                        alt="YAKKA Logo"
                        sx={{
                            width: { xs: 100, sm: 150},
                            height: { xs: 30, sm: 40 },
                            objectFit: 'contain'
                        }}
                    />
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: '#000000',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '50%',
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            '&:hover': {
                                backgroundColor: '#E0E0E0'
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Contenido principal */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Título de la página */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#000000',
                            fontSize: { xs: '24px', sm: '32px' },
                            mb: 1
                        }}
                    >
                        Applicants
                    </Typography>
                    
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            color: '#000000',
                            fontSize: '16px',
                            mb: 2
                        }}
                    >
                        Jobsite: 1 test ridge, Sydney, Sydney
                    </Typography>
                </Box>

                {/* Lista de solicitantes */}
                {applicants.length > 0 ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)'
                            },
                            gap: 3
                        }}
                    >
                        {applicants.map((applicant) => (
                            <ApplicantCard
                                key={applicant.id}
                                applicantName={applicant.applicantName}
                                role={applicant.role}
                                rating={applicant.rating}
                                profileImage={applicant.profileImage}
                                selectedFlavor={selectedFlavor}
                                onChat={() => handleChat(applicant)}
                                onDecline={() => handleDecline(applicant)}
                                onHire={() => handleHire(applicant)}
                            />
                        ))}
                    </Box>
                ) : (
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666666',
                                fontSize: '18px',
                                mb: 1
                            }}
                        >
                            No applicants found
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#999999',
                                fontSize: '14px'
                            }}
                        >
                            There are currently no applicants for this position.
                        </Typography>
                    </Paper>
                )}
            </Container>

            {/* Dialog de confirmación */}
            <Dialog
                open={actionDialog.open}
                onClose={cancelAction}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 3,
                        p: 2
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#000000',
                        textAlign: 'center',
                        pb: 1
                    }}
                >
                    {actionDialog.type === 'hire' ? 'Confirm Hire' : 'Confirm Decline'}
                </DialogTitle>
                
                <DialogContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: '#666666',
                            lineHeight: 1.5
                        }}
                    >
                        {actionDialog.type === 'hire' 
                            ? `Are you sure you want to hire ${actionDialog.applicant?.applicantName}?`
                            : `Are you sure you want to decline ${actionDialog.applicant?.applicantName}?`
                        }
                    </Typography>
                    {actionDialog.type === 'decline' && (
                        <Typography
                            sx={{
                                fontSize: '14px',
                                color: '#999999',
                                mt: 1
                            }}
                        >
                            This action cannot be undone.
                        </Typography>
                    )}
                </DialogContent>
                
                <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
                    <Button
                        onClick={cancelAction}
                        variant="outlined"
                        sx={{
                            borderColor: '#e0e0e0',
                            color: '#666666',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                borderColor: '#d0d0d0',
                                backgroundColor: '#f8f9fa'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmAction}
                        variant="contained"
                        sx={{
                            backgroundColor: actionDialog.type === 'hire' ? flavorConfig.primaryColor : '#666666',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: actionDialog.type === 'hire' ? flavorConfig.buttonHoverColor : '#555555',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {actionDialog.type === 'hire' ? 'Confirm Hire' : 'Confirm Decline'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

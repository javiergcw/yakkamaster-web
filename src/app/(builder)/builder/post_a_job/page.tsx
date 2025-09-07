'use client';

import React, { useCallback, useState } from 'react';
import { Box, Modal, Paper, Typography, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor } from '@/types/flavors';
import { Routes } from '@/routes/Routes';
import JobsiteSelector from '@/components/jobSites/JobsiteSelector';
import { JobsiteCardData } from '@/components/common/JobsiteCard';
import WorkerTypeSelector from '@/components/jobSites/WorkerTypeSelector';
import WorkerQuantitySelector from '@/components/jobSites/WorkerQuantitySelector';
import LabourCostCalculator from '@/components/jobSites/LabourCostCalculator';
import JobDateSelector from '@/components/jobSites/JobDateSelector';
import JobTimeTypeSelector from '@/components/jobSites/JobTimeTypeSelector';
import JobRequirementsSelector from '@/components/jobSites/JobRequirementsSelector';
import PaymentDateSelector from '@/components/jobSites/PaymentDateSelector';
import SupervisorSelector from '@/components/jobSites/SupervisorSelector';
import JobReviewSelector from '@/components/jobSites/JobReviewSelector';
import FormHeader from '@/components/common/FormHeader';
import BottomNavigation from '@/components/common/BottomNavigation';
import { useJobForm } from '@/hooks/useJobForm';

// Datos de ejemplo de jobsites
const jobsitesData: JobsiteCardData[] = [
    {
        id: 1,
        title: "1 test ridge",
        location: "Sydney",
        description: "testing jobsite"
    },
    {
        id: 2,
        title: "Labour hire and Jobs YAKKA app, York Street, Sydney NSW, Australia",
        location: "Albury-Wodonga",
        description: "Test site for Yakka Labour"
    },
    {
        id: 3,
        title: "Adelaide Hills, SA, Australia",
        location: "Adelaide",
        description: "job site on the right with the big tree in front"
    },
    {
        id: 4,
        title: "10 Bent Street, Petersham NSW, Australia",
        location: "Sydney"
    },
    {
        id: 5,
        title: "New Place Japanese Kitchen, Beaufort Street, Mount Lawley WA, Australia",
        location: "Melbourne"
    },
    {
        id: 6,
        title: "1 Australia Avenue, Sydney Olympic Park NSW, Australia",
        location: "Sydney",
        description: "the big building on the corner"
    },
    {
        id: 7,
        title: "100 Reed Street, Redfern NSW, Australia",
        location: "Adelaide"
    }
];

export default function PostAJobPage() {
    // Variable para cambiar el flavor fácilmente
    const selectedFlavor = Flavor.LABOUR;
    const router = useRouter();
    
    // Estado para el modal de confirmación
    const [showExitModal, setShowExitModal] = useState(false);
    
    const {
        currentStepIndex,
        currentStep,
        totalSteps,
        formData,
        isFirstStep,
        isLastStep,
        isCurrentStepValid,
        updateFormData,
        goToNextStep,
        goToPreviousStep
    } = useJobForm(selectedFlavor);

    const handleNext = (data?: any) => {
        console.log('Moving to next step:', currentStep.title, data);
        
        // Actualizar datos del formulario si se proporcionan
        if (data) {
            updateFormData(data);
        }
        
        goToNextStep();
    };

    const handleBack = () => {
        console.log('Going back from:', currentStep.title);
        goToPreviousStep();
    };

    // Callbacks estables para evitar violación de reglas de hooks
    const handleWorkerTypeChange = useCallback((skill: string | null) => {
        updateFormData({ selectedWorkerType: skill });
    }, [updateFormData]);

    const handleWorkerQuantityChange = useCallback((quantity: number | null) => {
        updateFormData({ workerQuantity: quantity });
    }, [updateFormData]);

    const handleCostChange = useCallback((cost: number | null) => {
        updateFormData({ labourCost: cost });
    }, [updateFormData]);

    const handleDateChange = useCallback((date: Date | null) => {
        updateFormData({ jobDate: date });
    }, [updateFormData]);

    const handleTimeTypeChange = useCallback((timeType: string | null) => {
        updateFormData({ timeType: timeType });
    }, [updateFormData]);

    const handleRequirementsChange = useCallback((requirements: string[]) => {
        updateFormData({ requirements: requirements });
    }, [updateFormData]);

    const handlePaymentDateChange = useCallback((date: Date | null) => {
        updateFormData({ paymentDate: date });
    }, [updateFormData]);

    const handleSupervisorChange = useCallback((supervisor: string | null) => {
        updateFormData({ supervisor: supervisor });
    }, [updateFormData]);

    // Funciones para manejar el modal de salida
    const handleExitClick = () => {
        setShowExitModal(true);
    };

    const handleConfirmExit = () => {
        setShowExitModal(false);
        router.push(Routes.BUILDER);
    };

    const handleCancelExit = () => {
        setShowExitModal(false);
    };

    const renderCurrentStep = () => {
        switch (currentStep.component) {
            case 'JobsiteSelector':
                return (
                    <JobsiteSelector
                        selectedFlavor={selectedFlavor}
                        jobsitesData={jobsitesData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 'WorkerTypeSelector':
                return (
                    <WorkerTypeSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSelectionChange={handleWorkerTypeChange}
                    />
                );
            case 'WorkerQuantitySelector':
                return (
                    <WorkerQuantitySelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSelectionChange={handleWorkerQuantityChange}
                    />
                );
            case 'LabourCostCalculator':
                return (
                    <LabourCostCalculator
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onCostChange={handleCostChange}
                    />
                );
            case 'JobDateSelector':
                return (
                    <JobDateSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onDateChange={handleDateChange}
                    />
                );
            case 'JobTimeTypeSelector':
                return (
                    <JobTimeTypeSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onTimeTypeChange={handleTimeTypeChange}
                    />
                );
            case 'JobRequirementsSelector':
                return (
                    <JobRequirementsSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onRequirementsChange={handleRequirementsChange}
                    />
                );
            case 'PaymentDateSelector':
                return (
                    <PaymentDateSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onPaymentDateChange={handlePaymentDateChange}
                    />
                );
            case 'SupervisorSelector':
                return (
                    <SupervisorSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSupervisorChange={handleSupervisorChange}
                    />
                );
            case 'JobReviewSelector':
                return (
                    <JobReviewSelector
                        selectedFlavor={selectedFlavor}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            default:
                return null;
        }
    };

    // Determinar si mostrar la barra de progreso en el header (no en el primer paso)
    const showHeaderProgress = currentStepIndex > 0;

    return (
        <>
            <FormHeader
                flavor={selectedFlavor}
                currentStep={currentStepIndex + 1}
                totalSteps={totalSteps}
                showProgress={false}
                onBack={handleBack}
                onNext={showHeaderProgress ? () => handleNext() : undefined}
                onExit={handleExitClick}
                canGoBack={!isFirstStep}
                canGoNext={showHeaderProgress}
                nextButtonText="Next"
            />
            <Box sx={{ 
                mt: showHeaderProgress ? '80px' : '100px', 
                pb: isFirstStep ? '20px' : '80px' 
            }}>
                {renderCurrentStep()}
            </Box>
            {/* Navegación inferior con botón Back y barra de progreso (solo desde el paso 2) */}
            {!isFirstStep && (
                <BottomNavigation
                    flavor={selectedFlavor}
                    currentStep={currentStepIndex + 1}
                    totalSteps={totalSteps}
                    onBack={handleBack}
                    onNext={() => handleNext()}
                    canGoBack={!isFirstStep}
                    canGoNext={!isLastStep && isCurrentStepValid}
                />
            )}

            {/* Modal de confirmación para salir */}
            <Modal
                open={showExitModal}
                onClose={handleCancelExit}
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
                        width: { xs: '100%', sm: '500px', md: '600px' },
                        maxWidth: { xs: '95vw', sm: '500px' },
                        borderRadius: { xs: 3, sm: 2 },
                        p: { xs: 3, sm: 4 },
                        backgroundColor: '#ffffff',
                        position: 'relative'
                    }}
                >
                    {/* Header del modal */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                fontSize: { xs: '18px', sm: '20px' }
                            }}
                        >
                            Are you sure you want to leave?
                        </Typography>
                        <IconButton
                            onClick={handleCancelExit}
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
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#000000',
                                fontSize: { xs: '14px', sm: '16px' },
                                lineHeight: 1.5,
                                textAlign: 'center'
                            }}
                        >
                            If you leave now, your progress will be lost. You can return later, but unsaved changes will be discarded.
                        </Typography>
                    </Box>

                    {/* Botones de acción */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant="outlined"
                            onClick={handleConfirmExit}
                            sx={{
                                border: '1px solid #000000',
                                borderColor: '#000000',
                                color: '#000000',
                                borderRadius: '8px',
                                py: 1.5,
                                px: 3,
                                fontSize: '16px',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                minWidth: '120px',
                                boxShadow: 'none',
                                '&:hover': {
                                    borderColor: '#000000',
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    boxShadow: 'none',
                                }
                            }}
                        >
                            Leave anyway
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCancelExit}
                            sx={{
                                backgroundColor: '#FFD700',
                                color: '#000000',
                                borderRadius: '8px',
                                py: 1.5,
                                px: 3,
                                fontSize: '16px',
                                fontWeight: 'medium',
                                textTransform: 'none',
                                minWidth: '120px',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#FFC107',
                                    boxShadow: 'none',
                                }
                            }}
                        >
                            Stay here
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
}   
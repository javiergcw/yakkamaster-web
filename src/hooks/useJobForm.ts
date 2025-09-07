'use client';

import { useState, useCallback } from 'react';
import { Flavor } from '@/types/flavors';
import { JobsiteCardData } from '@/components/common/JobsiteCard';

export interface JobFormData {
  selectedJobsite: JobsiteCardData | null;
  selectedWorkerType: string | null;
  workerQuantity: number | null;
  labourCost: number | null;
  jobDate: Date | null;
  timeType: string | null;
  requirements: string[];
  paymentDate: Date | null;
  supervisor: string | null;
}

export interface JobFormStep {
  id: string;
  title: string;
  component: string;
}

export const JOB_FORM_STEPS: JobFormStep[] = [
  { id: 'jobsite', title: 'Select Jobsite', component: 'JobsiteSelector' },
  { id: 'workerType', title: 'Worker Type', component: 'WorkerTypeSelector' },
  { id: 'workerQuantity', title: 'Worker Quantity', component: 'WorkerQuantitySelector' },
  { id: 'labourCost', title: 'Labour Cost', component: 'LabourCostCalculator' },
  { id: 'jobDate', title: 'Job Date', component: 'JobDateSelector' },
  { id: 'timeType', title: 'Time Type', component: 'JobTimeTypeSelector' },
  { id: 'requirements', title: 'Requirements', component: 'JobRequirementsSelector' },
  { id: 'paymentDate', title: 'Payment Date', component: 'PaymentDateSelector' },
  { id: 'supervisor', title: 'Supervisor', component: 'SupervisorSelector' },
  { id: 'review', title: 'Review', component: 'JobReviewSelector' }
];

export function useJobForm(flavor: Flavor) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<JobFormData>({
    selectedJobsite: null,
    selectedWorkerType: null,
    workerQuantity: null,
    labourCost: null,
    jobDate: null,
    timeType: null,
    requirements: [],
    paymentDate: null,
    supervisor: null
  });

  const currentStep = JOB_FORM_STEPS[currentStepIndex];
  const totalSteps = JOB_FORM_STEPS.length;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Función para validar el paso actual
  const validateCurrentStep = useCallback(() => {
    const step = JOB_FORM_STEPS[currentStepIndex];
    
    switch (step.component) {
      case 'JobsiteSelector':
        return formData.selectedJobsite !== null;
      case 'WorkerTypeSelector':
        return formData.selectedWorkerType !== null;
      case 'WorkerQuantitySelector':
        return formData.workerQuantity !== null && formData.workerQuantity > 0;
      case 'LabourCostCalculator':
        return formData.labourCost !== null && formData.labourCost > 0;
      case 'JobDateSelector':
        return formData.jobDate !== null;
      case 'JobTimeTypeSelector':
        return formData.timeType !== null;
      case 'JobRequirementsSelector':
        return formData.requirements.length > 0;
      case 'PaymentDateSelector':
        return formData.paymentDate !== null;
      case 'SupervisorSelector':
        // El paso es válido si se ha tomado una decisión
        // Necesitamos verificar si se ha interactuado con el componente
        // Por ahora, permitimos avanzar siempre que se haya hecho alguna selección
        return true;
      case 'JobReviewSelector':
        return true; // El último paso siempre es válido
      default:
        return false;
    }
  }, [currentStepIndex, formData]);

  const isCurrentStepValid = validateCurrentStep();

  const updateFormData = useCallback((updates: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const goToNextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [isLastStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [isFirstStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStepIndex(stepIndex);
    }
  }, [totalSteps]);

  const resetForm = useCallback(() => {
    setCurrentStepIndex(0);
    setFormData({
      selectedJobsite: null,
      selectedWorkerType: null,
      workerQuantity: null,
      labourCost: null,
      jobDate: null,
      timeType: null,
      requirements: [],
      paymentDate: null,
      supervisor: null
    });
  }, []);

  return {
    // Estado
    currentStepIndex,
    currentStep,
    totalSteps,
    formData,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,
    
    // Acciones
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm
  };
}

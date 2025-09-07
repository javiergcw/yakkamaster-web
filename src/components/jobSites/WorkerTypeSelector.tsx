'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    useTheme
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface WorkerTypeSelectorProps {
    selectedFlavor: Flavor;
    onNext?: (selectedSkill: string | null) => void;
    onBack?: () => void;
    onSelectionChange?: (selectedSkill: string | null) => void;
}

// Lista completa de habilidades/trabajos
const workerSkills = [
    'General Labourer', 'Carpenter', 'Electrician', 'Plumber', 'Bricklayer',
    'Concreter', 'Painter', 'Excavator Operator', 'Truck Driver', 'Forklift Driver',
    'Paver Operator', 'Truck LR Driver', 'Asbestos Remover', 'Elevator operator',
    'Foreman', 'Tow Truck Driver', 'Lawn mower', 'Construction Foreman',
    'Bulldozer Operator', 'Heavy Rigid Truck Driver', 'Traffic Controller', 'Bartender', 
    'Gardener', 'Truck HC Driver', 'Waitress / Waiter', 'Crane Operator - Mobile',
    'Project Manager', 'Light Truck Driver', 'Receptionist', 'Warehouse Labourer',
    'Roofer', 'Formworker', 'Dogman', 'Concrete Truck Driver', 'Safety Officer',
    'Welder', 'Truck MR Driver', 'Pipelayer', 'Surveyor', 'Drill Operator',
    'Tiler', 'Chef', 'Compactor Operator', 'Building Inspector', 'Event Manager',
    'Short-Haul Truck Driver', 'Boiler maker', 'Tipper Truck Driver', 'Kitchen Hand',
    'Floor Layer', 'Barista', 'HVAC Technician', 'Civil Engineer', 'Scaffolder',
    'Glazier', 'Earthmoving', 'Loader Operator', 'Crane Operator', 'Steel Fixer',
    'Other', 'Truck HR Driver', 'Fencer', 'Fuel Truck Driver', 'Alimak Operator',
    'Demolition Worker', 'Forklift High Reach', 'Removalist', 'EWP Operator',
    'Backhoe Operator', 'Site Supervisor', 'Dump Truck Driver', 'Runner',
    'Crane Operator - Tower', 'Boom Lift Operator', 'Scraper Operator', 'Waterproofer', 
    'Rigger', 'Cleaner', 'Handyperson', 'testing-ux', 'Event Staff', 'Landscaper', 
    'Excavator Spotter', 'Long-Haul Truck Driver', 'Plasterer', 'Scissor Lift Operator', 
    'Grader Operator'
];

export default function WorkerTypeSelector({ 
    selectedFlavor, 
    onNext, 
    onBack,
    onSelectionChange
}: WorkerTypeSelectorProps) {
    const router = useRouter();
    const config = flavorConfigs[selectedFlavor];
    
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSkillSelect = (skill: string) => {
        setSelectedSkill(skill);
        if (onSelectionChange) {
            onSelectionChange(skill);
        }
    };

    const handleNext = () => {
        if (onNext) {
            onNext(selectedSkill);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    // Filtrar habilidades basado en la búsqueda
    const filteredSkills = workerSkills.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box
            sx={{
              
                backgroundColor: '#ffffff',
                padding: { xs: '10px 0', sm: '15px', md: '20px' }
            }}
        >
            {/* Header */}
            <Container 
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Box sx={{ mb: 4 }}>

                    {/* Título y descripción */}
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
                            What kind of worker do you need?
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(0,0,0,0.7)',
                                fontSize: { xs: '14px', sm: '16px' }
                            }}
                        >
                            You can only choose 1 skill
                        </Typography>
                    </Box>

                    {/* Barra de búsqueda */}
                    <Box sx={{ mb: 4 }}>
                        <TextField
                            fullWidth
                            placeholder="Search for a type of labour"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: 'rgba(0,0,0,0.5)' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#ffffff',
                                    '& fieldset': {
                                        borderColor: '#E0E0E0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#BDBDBD',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: config.primaryColor,
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    py: 1.5,
                                    fontSize: '16px'
                                }
                            }}
                        />
                    </Box>

                    {/* Grid de habilidades como chips */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center'
                    }}>
                        {filteredSkills.map((skill) => (
                            <Chip
                                key={skill}
                                label={skill}
                                onClick={() => handleSkillSelect(skill)}
                                sx={{
                                    backgroundColor: selectedSkill === skill ? config.primaryColor : ' #F6F6F6',
                                    color: selectedSkill === skill ? '#ffffff' : '#000000',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: { xs: '10px', sm: '12px' },
                                    fontWeight: selectedSkill === skill ? '600' : '400',
                                    height: { xs: '24px', sm: '28px' },
                                    '&:hover': {
                                        backgroundColor: selectedSkill === skill ? config.primaryColor : '#e0e0e0',
                                    },
                                    '& .MuiChip-label': {
                                        px: { xs: 0.8, sm: 1.2 }
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

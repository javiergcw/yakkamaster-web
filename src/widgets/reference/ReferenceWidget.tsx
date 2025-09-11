'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Container,
  Paper,
  TextField,
  Button,
  Chip,
  Avatar,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface WorkerData {
  name: string;
  title: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  experience: {
    position: string;
    company: string;
    duration: string;
    type: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
  }[];
  skills: string[];
}

interface ReferenceFormData {
  reliability: number;
  badges: string[];
  description: string;
}

interface ReferenceWidgetProps {
  selectedFlavor: Flavor;
  workerData?: WorkerData;
}

const badgeOptions = [
  { id: 'on_time', label: 'On Time', image: '/badges/on_time.png' },
  { id: 'positive', label: 'Positive Attitude', image: '/badges/positive.png' },
  { id: 'pronleme', label: 'Problem Solver', image: '/badges/pronleme.png' },
  { id: 'extra_mile', label: 'Extra Mile', image: '/badges/extra_mile.png' },
  { id: 'strong', label: 'Strong Player', image: '/badges/strong.png' },
  { id: 'quick', label: 'Quick Learner', image: '/badges/quick.png' },
  { id: 'detail_focus', label: 'Detail Focus', image: '/badges/detail_focus.png' },
  { id: 'good_communication', label: 'Good Communication', image: '/badges/good_communication.png' }
];

export default function ReferenceWidget({ selectedFlavor, workerData }: ReferenceWidgetProps) {
  const config = flavorConfigs[selectedFlavor];
  const [formData, setFormData] = useState<ReferenceFormData>({
    reliability: 0,
    badges: [],
    description: ''
  });
  const [showFullProfile, setShowFullProfile] = useState(false);

  // Datos de ejemplo si no se proporcionan
  const defaultWorkerData: WorkerData = {
    name: 'Javier Rodriguez',
    title: 'Full Stack Developer',
    image: '/api/placeholder/150/150',
    location: 'Madrid, Spain',
    phone: '+34 123 456 789',
    email: 'javier.rodriguez@email.com',
    experience: [
      {
        position: 'Full Stack Developer',
        company: 'TechCorp - Remote',
        duration: '2 years, 8 months',
        type: 'full-time'
      },
      {
        position: 'Frontend Developer',
        company: 'StartupXYZ - On-site',
        duration: '1 year, 3 months',
        type: 'full-time'
      }
    ],
    education: [
      {
        institution: 'Polytechnic University',
        degree: 'Systems Engineering',
        duration: '4 years'
      },
      {
        institution: 'Technology Institute',
        degree: 'Programming Technician',
        duration: '2 years'
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker']
  };

  const worker = workerData || defaultWorkerData;

  const handleReliabilityChange = (value: number) => {
    setFormData(prev => ({ ...prev, reliability: value }));
  };

  const handleBadgeToggle = (badgeId: string) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.includes(badgeId)
        ? prev.badges.filter(id => id !== badgeId)
        : [...prev.badges, badgeId]
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, description: event.target.value }));
  };

  const handleSubmit = () => {
    console.log('Reference submitted:', formData);
    // Aquí se enviaría la referencia al backend
  };

  const getFlavorBadges = () => {
    return badgeOptions;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Lado Izquierdo - Perfil del Trabajador */}
        <Box flex={0.4}>
          <Paper elevation={0} sx={{ p: 3, height: 'fit-content', border: '1px solid #e0e0e0' }}>
            {/* Header del Perfil */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                src={worker.image}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
                {worker.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" textAlign="center">
                {worker.title}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />


            {/* Experience */}
            <Box mb={3}>
              <Typography variant="h6" fontWeight="bold" mb={2} color={config.primaryColor}>
                Experience
              </Typography>
              {worker.experience.map((exp, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {exp.position}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {exp.company} • {exp.duration}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Education - Solo visible en desktop o cuando showFullProfile es true en móvil */}
            <Box 
              mb={3} 
              sx={{ 
                display: { 
                  xs: showFullProfile ? 'block' : 'none', 
                  md: 'block' 
                } 
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2} color={config.primaryColor}>
                Education
              </Typography>
              {worker.education.map((edu, index) => (
                <Box key={index} mb={2}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {edu.degree}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution} • {edu.duration}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Skills - Solo visible en desktop o cuando showFullProfile es true en móvil */}
            <Box 
              mb={3}
              sx={{ 
                display: { 
                  xs: showFullProfile ? 'block' : 'none', 
                  md: 'block' 
                } 
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2} color="#000000">
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {worker.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                      borderColor: '#000000',
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Botón View More/Less en móvil - Dentro del Paper */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Button
                variant="text"
                endIcon={showFullProfile ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                onClick={() => setShowFullProfile(!showFullProfile)}
                sx={{
                  color: config.primaryColor,
                  textTransform: 'none',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: config.primaryColor + '10'
                  }
                }}
              >
                {showFullProfile ? 'View Less' : 'View More'}
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Lado Derecho - Formulario de Referencia */}
        <Box flex={0.6}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color={config.primaryColor}>
              Worker Reference
            </Typography>

            {/* Question 1: Recommendation */}
            <Box mb={4}>
              <Typography variant="h6" mb={2}>
                1. Do you recommend {worker.name}? What do you think about them?
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="body2" color="text.secondary">
                  Unreliable
                </Typography>
                <Rating
                  value={formData.reliability}
                  onChange={(_, value) => handleReliabilityChange(value || 0)}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: config.primaryColor,
                    },
                    '& .MuiRating-iconHover': {
                      color: config.buttonHoverColor,
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Reliable
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Question 2: Badges */}
            <Box mb={4}>
              <Typography variant="h6" mb={2}>
                2. What badges would you give to this worker?
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1.5}>
                {getFlavorBadges().map((badge) => (
                  <Tooltip key={badge.id} title={badge.label}>
                    <Box
                      onClick={() => handleBadgeToggle(badge.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        border: '1px solid #000000',
                        backgroundColor: formData.badges.includes(badge.id) ? config.primaryColor : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: 'fit-content',
                        '&:hover': {
                          backgroundColor: config.primaryColor,
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={badge.image}
                        alt={badge.label}
                        sx={{
                          width: 24,
                          height: 24,
                          objectFit: 'contain',
                          mr: 1,
                          filter: formData.badges.includes(badge.id) ? 'none' : 'grayscale(100%)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {badge.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Question 3: Description */}
            <Box mb={4}>
              <Typography variant="h6" mb={2}>
                3. Tell us a little more about this worker
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Share your experience working with this professional. Include details about their performance, skills, attitude and any aspect you consider relevant..."
                value={formData.description}
                onChange={handleDescriptionChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: config.primaryColor,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: config.primaryColor,
                    },
                  },
                }}
              />
            </Box>

            {/* Botón de Envío */}
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: config.buttonColor,
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  boxShadow: 'none',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: config.buttonHoverColor,
                    boxShadow: 'none',
                  },
                }}
              >
                Submit Reference
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
  
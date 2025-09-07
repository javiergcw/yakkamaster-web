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
  Star,
  CheckCircle,
  Cancel,
  ThumbUp,
  ThumbDown,
  Speed,
  Group,
  Psychology,
  Engineering,
  HealthAndSafety,
  Restaurant,
  Sports,
  Build
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
  { id: 'punctual', label: 'Punctual', icon: <Speed />, color: '#4CAF50' },
  { id: 'teamwork', label: 'Team Player', icon: <Group />, color: '#2196F3' },
  { id: 'creative', label: 'Creative', icon: <Psychology />, color: '#9C27B0' },
  { id: 'technical', label: 'Technical', icon: <Engineering />, color: '#FF9800' },
  { id: 'reliable', label: 'Reliable', icon: <CheckCircle />, color: '#4CAF50' },
  { id: 'leadership', label: 'Leadership', icon: <Star />, color: '#F44336' },
  { id: 'safety', label: 'Safety', icon: <HealthAndSafety />, color: '#795548' },
  { id: 'hospitality', label: 'Hospitality', icon: <Restaurant />, color: '#E91E63' },
  { id: 'sports', label: 'Athletic', icon: <Sports />, color: '#FF6B35' },
  { id: 'construction', label: 'Construction', icon: <Build />, color: '#607D8B' }
];

export default function ReferenceWidget({ selectedFlavor, workerData }: ReferenceWidgetProps) {
  const config = flavorConfigs[selectedFlavor];
  const [formData, setFormData] = useState<ReferenceFormData>({
    reliability: 3,
    badges: [],
    description: ''
  });

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
    switch (selectedFlavor) {
      case Flavor.SPORT:
        return badgeOptions.filter(badge => 
          ['punctual', 'teamwork', 'leadership', 'sports', 'reliable'].includes(badge.id)
        );
      case Flavor.LABOUR:
        return badgeOptions.filter(badge => 
          ['punctual', 'technical', 'reliable', 'construction', 'safety'].includes(badge.id)
        );
      case Flavor.HOSPITALITY:
        return badgeOptions.filter(badge => 
          ['punctual', 'hospitality', 'teamwork', 'creative', 'reliable'].includes(badge.id)
        );
      default:
        return badgeOptions;
    }
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

            {/* Education */}
            <Box mb={3}>
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

            {/* Skills */}
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2} color={config.primaryColor}>
                Skills
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {worker.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                      borderColor: config.accentColor,
                      color: config.primaryColor,
                      '&:hover': {
                        backgroundColor: config.accentColor + '20'
                      }
                    }}
                  />
                ))}
              </Box>
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
              <Box display="flex" flexWrap="wrap" gap={1}>
                {getFlavorBadges().map((badge) => (
                  <Tooltip key={badge.id} title={badge.label}>
                    <Chip
                      icon={badge.icon}
                      label={badge.label}
                      clickable
                      color={formData.badges.includes(badge.id) ? 'primary' : 'default'}
                      variant={formData.badges.includes(badge.id) ? 'filled' : 'outlined'}
                      onClick={() => handleBadgeToggle(badge.id)}
                      sx={{
                        ...(formData.badges.includes(badge.id) && {
                          backgroundColor: badge.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: badge.color + 'CC',
                          }
                        }),
                        ...(!formData.badges.includes(badge.id) && {
                          borderColor: badge.color,
                          color: badge.color,
                          '&:hover': {
                            backgroundColor: badge.color + '20',
                          }
                        })
                      }}
                    />
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
  
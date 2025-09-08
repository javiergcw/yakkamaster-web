'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Container,
  Button,
  Paper
} from '@mui/material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

interface UnifiedDoctorProfileProps {
  selectedFlavor: Flavor;
  doctorData?: {
    name: string;
    title: string;
    specialties: string[];
    image: string;
    location: string;
    phone: string;
    email: string;
    languages: string[];
    overallRating: number;
    totalReviews: number;
    aiSummary: string;
    detailedRatings: {
      waitTime: number;
      bedsideManner: number;
      clearExplanations: number;
    };
    visitReasons: {
      reason: string;
      percentage: number;
      color: string;
    }[];
    professionalActivities: {
      activity: string;
      percentage: number;
      color: string;
    }[];
  };
}

export default function UnifiedDoctorProfile({ selectedFlavor, doctorData }: UnifiedDoctorProfileProps) {
  const config = flavorConfigs[selectedFlavor];
  
  // Estados para el calendario y horarios
  const [selectedDate, setSelectedDate] = useState(25);
  const [selectedMorningTime, setSelectedMorningTime] = useState('11:00 AM');
  const [selectedDayTime, setSelectedDayTime] = useState('2:00 PM');
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 5, 1)); // Junio 2024
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  // Datos por defecto si no se proporcionan - usando colores del flavor
  const defaultDoctorData = {
    name: 'Dr. Emily Chen, MD',
    title: 'INTERNAL MEDICINE, CARDIOLOGY',
    specialties: ['Internal Medicine', 'Cardiology'],
    image: '/bartender_pro.webp',
    location: 'New York, NY, Manhattan Health Associates',
    phone: '(212) 555-7890',
    email: 'drchen@gmail.com',
    languages: ['English (Native)', 'Spanish (Fluent)'],
    overallRating: 4.8,
    totalReviews: 38,
    aiSummary: 'Dr. Emily Chen is praised for professionalism, empathy, and clear explanations. Patients value her cardiology expertise and easy booking. Some note rare communication delays.',
    detailedRatings: {
      waitTime: 4.63,
      bedsideManner: 4.19,
      clearExplanations: 4.74
    },
    visitReasons: [
      { reason: 'Hypertension Management', percentage: 35, color: config.primaryColor },
      { reason: 'Preventive Cardiology', percentage: 25, color: config.secondaryColor },
      { reason: 'Heart Failure Monitoring', percentage: 22, color: config.accentColor },
      { reason: 'Chest Pain Evaluation', percentage: 18, color: config.textColor + '40' } // Color con transparencia
    ],
    professionalActivities: [
      { activity: 'Clinical Practice', percentage: 47, color: config.secondaryColor },
      { activity: 'Research', percentage: 24, color: config.primaryColor },
      { activity: 'Teaching', percentage: 16, color: config.accentColor },
      { activity: 'Administration', percentage: 10, color: config.textColor + '40' }, // Color con transparencia
      { activity: 'Consulting', percentage: 3, color: config.backgroundColor }
    ]
  };

  const data = doctorData || defaultDoctorData;

  // Funciones para el calendario
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Primer día del mes y último día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Días del mes anterior para completar la primera semana
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Días del mes siguiente para completar la última semana
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate && isCurrentMonth(date);
  };

  const isUnavailable = (date: Date) => {
    // Simular fechas no disponibles (por ejemplo, fines de semana o fechas pasadas)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Domingos y sábados
  };

  // Función para crear el gráfico de dona
  const createDonutChart = (chartData: typeof data.visitReasons) => {
    let cumulativePercentage = 0;
    const radius = 50;
    const strokeWidth = 15;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    return (
      <Box sx={{ position: 'relative', width: 100, height: 100 }}>
        <svg width={100} height={100} style={{ transform: 'rotate(-90deg)' }}>
          {chartData.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -(cumulativePercentage / 100) * circumference;
            cumulativePercentage += item.percentage;

            return (
              <circle
                key={index}
                stroke={item.color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 0, md: 4 },   px: { xs: 2, sm: 4, md: 6, lg: 8}, }}> 
  
      <Box sx={{ 
        display: 'flex', 
        gap: 8, 
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' }
      }}>
        {/* Columna izquierda - Foto del doctor */}
        <Box sx={{ 
          flex: { xs: 'none', md: '0 0 300px' },
          width: { xs: '100%', md: '300px' }
        }}>
          {/* Imagen del perfil */}
          <Box
            sx={{
              position: 'relative',
              height: 350,
              width: '100%',
              overflow: 'hidden',
              borderRadius: 4,
              mb: 3
            }}
          >
            <Box
              component="img"
              src={data.image}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
            {/* Overlay sutil */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)'
              }}
            />
          </Box>

          {/* Información de contacto */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            width: '100%'
          }}>
            {/* Ubicación */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationOnIcon 
                sx={{ 
                  color: config.primaryColor, 
                  fontSize: 18,
                  flexShrink: 0
                }} 
              />
              <Typography
                variant="body2"
                sx={{
                  color: config.textColor,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  fontWeight: 500,
                  lineHeight: 1.3
                }}
              >
                {data.location}
              </Typography>
            </Box>

            {/* Teléfono */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PhoneIcon 
                sx={{ 
                  color: config.primaryColor, 
                  fontSize: 18,
                  flexShrink: 0
                }} 
              />
              <Typography
                variant="body2"
                sx={{
                  color: config.textColor,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  fontWeight: 500
                }}
              >
                {data.phone}
              </Typography>
            </Box>

            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmailIcon 
                sx={{ 
                  color: config.primaryColor, 
                  fontSize: 18,
                  flexShrink: 0
                }} 
              />
              <Typography
                variant="body2"
                sx={{
                  color: config.textColor,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  fontWeight: 500
                }}
              >
                {data.email}
              </Typography>
            </Box>

            {/* Idiomas */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {data.languages.map((language, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: config.textColor,
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      fontWeight: 500,
                      position: 'relative',
                      pl: 1,
                      '&::before': {
                        content: '"•"',
                        position: 'absolute',
                        left: 0,
                        color: config.primaryColor,
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {language}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Columna derecha - Información detallada */}
        <Box sx={{ 
          flex: 1,
          width: { xs: '100%', md: 'auto' }
        }}>
          {/* Header con nombre y especialidades */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: config.textColor,
                mb: 1,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              {data.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: config.textColor,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textTransform: 'uppercase',
                letterSpacing: 1,
                opacity: 0.7
              }}
            >
              {data.title}
            </Typography>
          </Box>

          {/* Rating general y resumen de IA unidos */}
          <Box
            sx={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 4,
              mb: 4,
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {/* Rating general */}
            <Box
              sx={{
                backgroundColor: config.primaryColor,
                color: 'white',
                p: 3,
                minWidth: 150,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'white' }}>
                {data.overallRating}
              </Typography>
              <Typography variant="body2" sx={{ 
                fontWeight: 500, 
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: 'white'
              }}>
                {data.totalReviews} reviews
              </Typography>
            </Box>

            {/* Resumen de IA */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                color: config.textColor, 
                mb: 1, 
                fontSize: { xs: '0.8rem', md: '0.9rem' } 
              }}>
                {config.aiSummaryTitle}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: config.textColor, 
                lineHeight: 1.6, 
                fontSize: { xs: '0.7rem', md: '0.8rem' },
                opacity: 0.8
              }}>
                {data.aiSummary}
              </Typography>
            </Box>
          </Box>

          {/* Ratings detallados */}
          <Box sx={{ mb: 4 }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  minWidth: 120, 
                  fontWeight: 500,
                  color: config.textColor
                }}>
                  WAIT TIME:
                </Typography>
                <Rating 
                  value={data.detailedRatings.waitTime} 
                  readOnly 
                  precision={0.01} 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFD700', // Amarillo dorado
                    },
                    '& .MuiRating-iconEmpty': {
                      color: '#E0E0E0', // Gris claro
                    }
                  }}
                />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  color: config.textColor
                }}>
                  {data.detailedRatings.waitTime}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  minWidth: 120, 
                  fontWeight: 500,
                  color: config.textColor
                }}>
                  BEDSIDE MANNER:
                </Typography>
                <Rating 
                  value={data.detailedRatings.bedsideManner} 
                  readOnly 
                  precision={0.01} 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFD700', // Amarillo dorado
                    },
                    '& .MuiRating-iconEmpty': {
                      color: '#E0E0E0', // Gris claro
                    }
                  }}
                />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  color: config.textColor
                }}>
                  {data.detailedRatings.bedsideManner}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  minWidth: 120, 
                  fontWeight: 500,
                  color: config.textColor
                }}>
                  CLEAR EXPLANATIONS:
                </Typography>
                <Rating 
                  value={data.detailedRatings.clearExplanations} 
                  readOnly 
                  precision={0.01} 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FFD700', // Amarillo dorado
                    },
                    '& .MuiRating-iconEmpty': {
                      color: '#E0E0E0', // Gris claro
                    }
                  }}
                />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  color: config.textColor
                }}>
                  {data.detailedRatings.clearExplanations}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Razones de visita */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: config.textColor, 
              mb: 2 
            }}>
              Top Patient Visit Reasons
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Gráfico de dona */}
              {createDonutChart(data.visitReasons)}
              
              {/* Leyenda */}
              <Box sx={{ flex: 1 }}>
                {data.visitReasons.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: item.color,
                        borderRadius: '50%',
                        mr: 2,
                        flexShrink: 0
                      }}
                    />
                    <Typography variant="body2" sx={{ 
                      flex: 1,
                      color: config.textColor,
                      fontSize: '0.9rem'
                    }}>
                      {item.reason}
                    </Typography>
                    <Box sx={{ 
                      flex: 1,
                      height: '1px',
                      background: `repeating-linear-gradient(to right, ${config.textColor}40 0px, ${config.textColor}40 2px, transparent 2px, transparent 4px)`,
                      mx: 1
                    }} />
                    <Typography variant="body2" sx={{ 
                      fontWeight: 'bold',
                      color: config.textColor,
                      fontSize: '0.9rem',
                      minWidth: '35px',
                      textAlign: 'right'
                    }}>
                      {item.percentage}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Actividades profesionales */}
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: config.textColor, 
              mb: 2 
            }}>
              Professional Activities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {data.professionalActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: activity.color,
                      borderRadius: 1,
                      flexShrink: 0
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={activity.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: activity.color,
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 'bold', 
                    minWidth: 40,
                    color: config.textColor
                  }}>
                    {activity.percentage}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Sección de reserva de citas */}
      <Box sx={{ mt: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'white',
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: config.textColor,
              mb: 4,
              textAlign: 'left'
            }}
          >
            Book an Appointment
          </Typography>

          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Calendario */}
            <Box sx={{ flex: 1 }}>
                {/* Navegación del mes */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: config.textColor }}>
                    {currentMonth.toLocaleDateString('es-ES', { month: 'long' })}
                  </Typography>
                  <Button
                    onClick={() => navigateMonth('prev')}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      color: config.textColor,
                      fontSize: '1.2rem',
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    &lt;
                  </Button>
                  <Button
                    onClick={() => navigateMonth('next')}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      color: config.textColor,
                      fontSize: '1.2rem',
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    &gt;
                  </Button>
                </Box>

                {/* Días de la semana */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                    <Typography
                      key={day}
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: config.textColor,
                        textAlign: 'center',
                        width: '14.28%',
                        fontSize: '0.8rem'
                      }}
                    >
                      {day}
                    </Typography>
                  ))}
                </Box>

                {/* Fechas */}
                {showFullCalendar ? (
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                    {getCalendarDays().map((date, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          if (isCurrentMonth(date) && !isUnavailable(date)) {
                            setSelectedDate(date.getDate());
                          }
                        }}
                        sx={{
                          minWidth: 'auto',
                          height: 36,
                          borderRadius: 3,
                          backgroundColor: isSelected(date) ? config.primaryColor : 'transparent',
                          color: isSelected(date) ? 'white' : 
                                 !isCurrentMonth(date) ? '#999999' :
                                 isUnavailable(date) ? '#999999' : '#000000',
                          fontWeight: isSelected(date) ? 'bold' : 'normal',
                          fontSize: '0.9rem',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: isSelected(date) ? config.primaryColor : 
                                           isUnavailable(date) ? 'transparent' : config.primaryColor + '10'
                          },
                          '&:disabled': {
                            color: '#999999',
                            backgroundColor: 'transparent'
                          }
                        }}
                        disabled={isUnavailable(date)}
                      >
                        {date.getDate()}
                      </Button>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {[22, 23, 24, 25, 26, 27, 28].map((date) => (
                      <Button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        sx={{
                          width: '14.28%',
                          minWidth: 'auto',
                          height: 36,
                          borderRadius: 3,
                          backgroundColor: selectedDate === date ? config.primaryColor : 'transparent',
                          color: selectedDate === date ? 'white' : 
                                 (date === 27 || date === 28) ? '#999999' : '#000000',
                          fontWeight: selectedDate === date ? 'bold' : 'normal',
                          fontSize: '0.9rem',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: selectedDate === date ? config.primaryColor : config.primaryColor + '10'
                          },
                          '&:disabled': {
                            color: '#999999',
                            backgroundColor: 'transparent'
                          }
                        }}
                        disabled={date === 27 || date === 28}
                      >
                        {date}
                      </Button>
                    ))}
                  </Box>
                )}

                {/* Toggle calendario completo */}
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                  <Button
                    onClick={() => setShowFullCalendar(!showFullCalendar)}
                    sx={{
                      color: config.textColor,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    {showFullCalendar ? 'Show week view ▲' : 'Show full calendar ▼'}
                  </Button>
                </Box>
              </Box>

            {/* Horarios */}
            <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: config.textColor,
                    mb: 3
                  }}
                >
                  Time
                </Typography>

                {/* Horarios de la mañana */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: config.textColor,
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    MORNING
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['9:00 AM', '10:00 AM', '11:00 AM'].map((time) => (
                      <Button
                        key={time}
                        onClick={() => setSelectedMorningTime(time)}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: selectedMorningTime === time ? config.primaryColor : 'white',
                          color: selectedMorningTime === time ? 'white' : config.textColor,
                          border: '1px solid #e0e0e0',
                          fontWeight: selectedMorningTime === time ? 'bold' : 'normal',
                          '&:hover': {
                            backgroundColor: selectedMorningTime === time ? config.primaryColor : config.primaryColor + '10'
                          }
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Horarios del día */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: config.textColor,
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    DAY
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time) => (
                      <Button
                        key={time}
                        onClick={() => setSelectedDayTime(time)}
                        disabled={time === '3:00 PM'}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: selectedDayTime === time ? config.primaryColor : 'white',
                          color: selectedDayTime === time ? 'white' : 
                                 time === '3:00 PM' ? config.textColor + '40' : config.textColor,
                          border: '1px solid #e0e0e0',
                          fontWeight: selectedDayTime === time ? 'bold' : 'normal',
                          '&:hover': {
                            backgroundColor: selectedDayTime === time ? config.primaryColor : config.primaryColor + '10'
                          },
                          '&:disabled': {
                            color: config.textColor + '40',
                            borderColor: config.textColor + '20'
                          }
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Box>
          </Box>

          {/* Botón de reserva */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: config.primaryColor,
                color: 'white',
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: config.primaryColor,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Book Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

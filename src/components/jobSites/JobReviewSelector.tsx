'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    Divider,
} from '@mui/material';
import {
    LocationOnOutlined as LocationIcon,
    CalendarTodayOutlined as CalendarIcon,
    AccessTimeOutlined as TimeIcon,
    PaymentOutlined as PaymentIcon,
    DescriptionOutlined as DescriptionIcon,
    VisibilityOutlined as VisibilityIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface JobReviewData {
    jobTitle: string;
    hourlyRate: string;
    jobsite: string;
    dates: string;
    time: string;
    paymentFrequency: string;
    description: string;
    isPublic: boolean;
}

interface JobReviewSelectorProps {
    selectedFlavor: Flavor;
    jobData?: Partial<JobReviewData>;
    onNext?: (data: any) => void;
    onBack?: () => void;
}

const JobReviewSelector: React.FC<JobReviewSelectorProps> = ({
    selectedFlavor,
    jobData,
    onNext,
    onBack
}) => {
    const config = flavorConfigs[selectedFlavor];

    const [reviewData, setReviewData] = useState<JobReviewData>({
        jobTitle: jobData?.jobTitle || 'Heavy Rigid Truck Driver',
        hourlyRate: jobData?.hourlyRate || '$28/hr',
        jobsite: jobData?.jobsite || 'Labour hire and Jobs YAKKA app, York Street, Sydney NSW, Australia',
        dates: jobData?.dates || '5-9-2025 - 12-9-2025',
        time: jobData?.time || '12:30 PM - 12:30 PM',
        paymentFrequency: jobData?.paymentFrequency || 'Weekly payment',
        description: jobData?.description || 'm.',
        isPublic: jobData?.isPublic ?? true,
        ...jobData
    });

    const handlePublicToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewData(prev => ({
            ...prev,
            isPublic: event.target.checked
        }));
    };

    const handleEdit = (section: string) => {
        // Esta función se puede conectar con la navegación del componente padre
        console.log(`Edit ${section}`);
    };

    const ReviewSection: React.FC<{
        icon: React.ReactNode;
        title: string;
        content: string;
        showEdit?: boolean;
        sectionName?: string;
    }> = ({ icon, title, content, showEdit = true, sectionName }) => (
        <Box sx={{ mb: 1.5 }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Box sx={{ 
                        color: config.primaryColor, 
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: '32px', sm: '36px' },
                        height: { xs: '32px', sm: '36px' },
                        borderRadius: '50%',
                        backgroundColor: '#FAFAFA'
                    }}>
                        {icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: { xs: '14px', sm: '16px' },
                                mb: 0.5
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666666',
                                fontSize: { xs: '12px', sm: '14px' },
                                lineHeight: 1.4
                            }}
                        >
                            {content}
                        </Typography>
                    </Box>
                </Box>
                {showEdit && sectionName && (
                    <Typography
                        onClick={() => handleEdit(sectionName)}
                        sx={{
                            color: config.primaryColor,
                            fontSize: { xs: '12px', sm: '14px' },
                            fontWeight: '500',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            '&:hover': {
                                color: config.buttonHoverColor
                            }
                        }}
                    >
                        Edit
                    </Typography>
                )}
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                padding: { xs: '8px 0', sm: '15px', md: '20px' }
            }}
        >
            <Container 
                maxWidth="lg"
                sx={{
                    px: { xs: 1, sm: 3, md: 4 }
                }}
            >
                <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                    {/* Título principal */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: '#000000',
                                fontSize: { xs: '20px', sm: '28px', md: '30px' },
                                mb: 1,
                                lineHeight: { xs: 1.2, sm: 1.3 }
                            }}
                        >
                            Ready to post your job?
                        </Typography>
                    </Box>

                    {/* Card principal con los detalles del trabajo */}
                    <Card
                        sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: 2,
                            border: '2px solid #E0E0E0',
                            boxShadow: 'none',
                            width: '100%',
                            maxWidth: 'none'
                        }}
                    >
                        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                            {/* Título del trabajo y tarifa */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#000000',
                                            fontSize: { xs: '18px', sm: '20px', md: '20px' }
                                        }}
                                    >
                                        {reviewData.jobTitle}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: config.primaryColor,
                                            fontSize: { xs: '16px', sm: '18px', md: '20px' }
                                        }}
                                    >
                                        {reviewData.hourlyRate}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Secciones de detalles */}
                            <ReviewSection
                                icon={<LocationIcon sx={{ fontSize: { xs: '18px', sm: '16px' } }} />}
                                title="Jobsite"
                                content={reviewData.jobsite}
                                sectionName="jobsite"
                            />

                            <Divider sx={{ mb:1.5, borderWidth: '1px', borderColor: '#E0E0E0' }} />

                            <ReviewSection
                                icon={<CalendarIcon sx={{ fontSize: { xs: '18px', sm: '16px' } }} />}
                                title="Dates"
                                content={reviewData.dates}
                                sectionName="dates"
                            />

                            <Divider sx={{ mb: 1.5, borderWidth: '1px', borderColor: '#E0E0E0' }} />

                            <ReviewSection
                                icon={<TimeIcon sx={{ fontSize: { xs: '18px', sm: '16px' } }} />}
                                title="Time"
                                content={reviewData.time}
                                sectionName="time"
                            />

                            <Divider sx={{ mb: 1.5, borderWidth: '1px', borderColor: '#E0E0E0' }} />

                            <ReviewSection
                                icon={<PaymentIcon sx={{ fontSize: { xs: '18px', sm: '16px' } }} />}
                                title="Payment is expected"
                                content={reviewData.paymentFrequency}
                                sectionName="payment"
                            />

                            <Divider sx={{ mb: 1.5, borderWidth: '1px', borderColor: '#E0E0E0' }} />

                            <ReviewSection
                                icon={<DescriptionIcon sx={{ fontSize: { xs: '18px', sm: '16px' } }} />}
                                title="Description"
                                content={reviewData.description}
                                sectionName="description"
                            />

                            <Divider sx={{ mb: 1.5, borderWidth: '1px', borderColor: '#E0E0E0' }} />

                            {/* Toggle para mostrar trabajo públicamente */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                        <Box sx={{ 
                                            color: config.primaryColor, 
                                            mr: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: { xs: '32px', sm: '36px' },
                                            height: { xs: '32px', sm: '36px' },
                                            borderRadius: '50%',
                                            backgroundColor: '#FAFAFA'
                                        }}>
                                            <VisibilityIcon sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#000000',
                                                    fontSize: { xs: '14px', sm: '16px' },
                                                    mb: 0.5
                                                }}
                                            >
                                                Show job public
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666666',
                                                    fontSize: { xs: '12px', sm: '14px' },
                                                    lineHeight: 1.4
                                                }}
                                            >
                                                Turn off job visibility to hide this job temporarily. Only you'll see it.
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={reviewData.isPublic}
                                                onChange={handlePublicToggle}
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: config.primaryColor,
                                                        '& + .MuiSwitch-track': {
                                                            backgroundColor: config.primaryColor,
                                                        },
                                                    },
                                                }}
                                            />
                                        }
                                        label=""
                                        sx={{ m: 0 }}
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default JobReviewSelector;

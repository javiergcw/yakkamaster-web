'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material';
import {
    EditOutlined as EditIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

export interface JobsiteCardData {
    id: number;
    title: string;
    location: string;
    description?: string;
}

interface JobsiteCardProps {
    jobsite: JobsiteCardData;
    onEdit?: (jobsite: JobsiteCardData) => void;
    showEditButton?: boolean;
}

export default function JobsiteCard({ 
    jobsite, 
    onEdit, 
    showEditButton = true 
}: JobsiteCardProps) {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(jobsite);
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid #E0E0E0',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                width: '100%',
                '&:hover': {
                    border: '1px solid #BDBDBD',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
            }}
        >
            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        p: 0
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                        {/* Icono */}
                        <BusinessIcon sx={{ color: '#000000', fontSize: 20, mt: 0.5, ml: 1 }} />
                        
                        {/* Información del jobsite */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 500,
                                    color: '#000000',
                                    fontSize: '15px'
                                }}
                            >
                                {jobsite.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(0,0,0,0.6)',
                                    fontSize: '14px',
                                    mb: jobsite.description ? 0.5 : 0
                                }}
                            >
                                {jobsite.location}
                            </Typography>
                            {jobsite.description && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(0,0,0,0.5)',
                                        fontSize: '13px'
                                    }}
                                >
                                    {jobsite.description}
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Botón de editar */}
                    {showEditButton && (
                        <Button
                            variant="text"
                            startIcon={<EditIcon sx={{ fontSize: 16, color: '#000000' }} />}
                            onClick={handleEdit}
                            sx={{
                                color: '#000000',
                                backgroundColor: 'transparent',
                                textTransform: 'capitalize',
                                fontSize: '14px',
                                fontWeight: 'normal',
                                minWidth: 'auto',
                                px: 1,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            Edit
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}



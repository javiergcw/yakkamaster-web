'use client';

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    IconButton
} from '@mui/material';
import {
    Chat as ChatIcon,
    Star as StarIcon,
    Close as CloseIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface ApplicantCardProps {
    applicantName: string;
    role: string;
    rating: number;
    profileImage?: string;
    selectedFlavor?: Flavor;
    onChat?: () => void;
    onDecline?: () => void;
    onHire?: () => void;
}

export default function ApplicantCard({
    applicantName,
    role,
    rating,
    profileImage = "/img/profile-placeholder.jpg",
    selectedFlavor = Flavor.LABOUR,
    onChat,
    onDecline,
    onHire
}: ApplicantCardProps) {
    const flavorConfig = flavorConfigs[selectedFlavor];

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#FFFFFF',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                p: 2,
                position: 'relative'
            }}
        >
            {/* Applicant info container */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 2
                }}
            >
                {/* Left side - Avatar and details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 1 }}>
                    {/* Profile image */}
                    <Avatar
                        src={profileImage}
                        alt={applicantName}
                        sx={{
                            width: 60,
                            height: 60,
                            border: '1px solid #000000'
                        }}
                    />

                    {/* Applicant details */}
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                fontSize: '16px',
                                mb: 0.5
                            }}
                        >
                            {applicantName}
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#000000',
                                fontSize: '14px',
                                mb: 0.5
                            }}
                        >
                            {role}
                        </Typography>
                        
                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon 
                                sx={{ 
                                    color: '#000000', 
                                    fontSize: '16px' 
                                }} 
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#000000',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {rating.toFixed(1)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Right side - Chat button */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={onChat}
                        variant="outlined"
                        startIcon={<ChatIcon />}
                        sx={{
                            borderColor: '#000000',
                            color: '#000000',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            '&:hover': {
                                borderColor: '#333333',
                                backgroundColor: '#f8f9fa'
                            }
                        }}
                    >
                        Chat
                    </Button>
                </Box>
            </Box>

            {/* Action buttons */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between'
                }}
            >
                {/* Decline button */}
                <Button
                    onClick={onDecline}
                    variant="contained"
                    startIcon={<CloseIcon />}
                    sx={{
                        flex: 1,
                        backgroundColor: '#666666',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#555555',
                            boxShadow: 'none'
                        }
                    }}
                >
                    Decline
                </Button>

                {/* Hire button */}
                <Button
                    onClick={onHire}
                    variant="contained"
                    startIcon={<CheckIcon />}
                    sx={{
                        flex: 1,
                        backgroundColor: flavorConfig.primaryColor,
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: flavorConfig.buttonHoverColor,
                            boxShadow: 'none'
                        }
                    }}
                >
                    Hire
                </Button>
            </Box>
        </Box>
    );
}

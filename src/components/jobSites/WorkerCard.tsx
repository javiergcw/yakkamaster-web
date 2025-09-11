'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    IconButton,
    Divider,
    useTheme,
    Modal
} from '@mui/material';
import {
    Chat as ChatIcon,
    Star as StarIcon,
    CalendarToday as CalendarIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';
import AddShiftsModal from './AddShiftsModal';
import { Dayjs } from 'dayjs';

interface WorkerCardProps {
    jobsite: string;
    workerName: string;
    role: string;
    hourlyRate: string;
    profileImage?: string;
    selectedFlavor?: Flavor;
    onChat?: () => void;
    onRate?: () => void;
    onExtend?: (shiftData: any) => void;
    onUnhire?: () => void;
}

export default function WorkerCard({
    workerName,
    role,
    hourlyRate,
    profileImage = "/img/profile-placeholder.jpg",
    selectedFlavor = Flavor.LABOUR,
    onChat,
    onRate,
    onExtend,
    onUnhire
}: WorkerCardProps) {
    const theme = useTheme();
    const flavorConfig = flavorConfigs[selectedFlavor];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUnhireModalOpen, setIsUnhireModalOpen] = useState(false);

    const handleExtendClick = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = (shiftData: any) => {
        if (onExtend) {
            onExtend(shiftData);
        }
        setIsModalOpen(false);
    };

    const handleUnhireClick = () => {
        setIsUnhireModalOpen(true);
    };

    const handleUnhireConfirm = () => {
        if (onUnhire) {
            onUnhire();
        }
        setIsUnhireModalOpen(false);
    };

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
            {/* Worker info container */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 0.5
                }}
            >
                {/* Left side - Avatar and details */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 1 }}>
                    {/* Profile image */}
                    <Avatar
                        src={profileImage}
                        alt={workerName}
                        sx={{
                            width: 50,
                            height:50,
                            border: '1px solid #000000'
                        }}
                    />

                    {/* Worker details */}
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
                            {workerName}
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666666',
                                fontSize: '12px',
                                mb: 0.5
                            }}
                        >
                            {role}
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#000000',
                                fontSize: '12px',
                            }}
                        >
                         ${hourlyRate}/hr
                        </Typography>
                    </Box>
                </Box>

                {/* Right side - Chat button */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={onChat}
                        variant="outlined"
                        startIcon={<ChatIcon />}
                        sx={{
                            borderColor: '#e0e0e0',
                            color: '#666666',
                            textTransform: 'none',
                            fontSize: '12px',
                            fontWeight: 500,
                            px: 2,
                            py: 0.5,
                            '&:hover': {
                                borderColor: '#d0d0d0',
                                backgroundColor: '#f8f9fa'
                            }
                        }}
                    >
                        Chat
                    </Button>
                </Box>
            </Box>

            {/* Divider */}
            <Divider 
                sx={{ 
                    borderColor: 'grey.300',
                    mb: 1.5
                }} 
            />

            {/* Action buttons */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between'
                }}
            >
                {/* Rate button */}
                <Button
                    onClick={onRate}
                    variant="outlined"
                    startIcon={<StarIcon />}
                    sx={{
                        flex: 1,
                        borderColor: flavorConfig.primaryColor,
                        color: flavorConfig.primaryColor,
                        textTransform: 'none',
                        fontSize: '12px',
                        fontWeight: 500,
                        py: 0.5,
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: flavorConfig.buttonHoverColor,
                            backgroundColor: `${flavorConfig.primaryColor}20`
                        }
                    }}
                >
                    Rate
                </Button>

                            {/* Extend button */}
                            <Button
                                onClick={handleExtendClick}
                                variant="contained"
                                startIcon={<CalendarIcon />}
                                sx={{
                                    flex: 1,
                                    backgroundColor: flavorConfig.primaryColor,
                                    color: '#ffffff',
                                    textTransform: 'none',
                                    fontSize: '12px',
                                    boxShadow: 'none',
                                    fontWeight: 500,
                                    py: 0.5,
                                    '&:hover': {
                                        backgroundColor: '#E6C200',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Extend
                            </Button>

                {/* Unhire button */}
                <Button
                    onClick={handleUnhireClick}
                    variant="contained"
                    startIcon={<CloseIcon />}
                    sx={{
                        flex: 1,
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontSize: '12px',
                        boxShadow: 'none',
                        fontWeight: 500,
                        py: 0.5,
                        '&:hover': {
                            backgroundColor: '#333333',
                            boxShadow: 'none'
                        }
                    }}
                >
                    Unhire
                </Button>
            </Box>

            {/* Add Shifts Modal */}
            <AddShiftsModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                selectedFlavor={selectedFlavor}
                workerName={workerName}
            />

            {/* Unhire Confirmation Modal */}
            <Modal
                open={isUnhireModalOpen}
                onClose={() => setIsUnhireModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 3,
                        width: '100%',
                        maxWidth: '400px',
                        p: 3,
                        position: 'relative'
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '18px'
                            }}
                        >
                            Confirm Unhire
                        </Typography>
                        <IconButton
                            onClick={() => setIsUnhireModalOpen(false)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: '#666666',
                            mb: 3,
                            lineHeight: 1.5
                        }}
                    >
                        Are you sure you want to unhire <strong>{workerName}</strong>? This action cannot be undone.
                    </Typography>

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setIsUnhireModalOpen(false)}
                            variant="outlined"
                            sx={{
                                borderColor: '#e0e0e0',
                                color: '#666666',
                                textTransform: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                px: 3,
                                py: 1,
                                '&:hover': {
                                    borderColor: '#d0d0d0',
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUnhireConfirm}
                            variant="contained"
                            sx={{
                                backgroundColor: '#000000',
                                color: '#FFFFFF',
                                textTransform: 'none',
                                fontSize: '14px',
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: '#333333'
                                }
                            }}
                        >
                            Confirm Unhire
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

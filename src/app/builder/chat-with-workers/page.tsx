'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Button,
    IconButton,
    TextField,
    Avatar,
    Divider
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Close as CloseIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Flavor, flavorConfigs } from '@/types/flavors';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';
import ChatWindow from '@/components/common/ChatWindow';

// Datos de ejemplo para los chats
const mockChats = [
    {
        id: 1,
        workerName: "John Smith",
        workerRole: "Construction Worker",
        lastMessage: "Hi, I'm interested in the position. When can we discuss the details?",
        timestamp: "2 min ago",
        unreadCount: 2,
        profileImage: "/img/profile-placeholder.jpg"
    },
    {
        id: 2,
        workerName: "Maria Garcia",
        workerRole: "Electrician",
        lastMessage: "Thank you for considering my application. I'm available to start next week.",
        timestamp: "1 hour ago",
        unreadCount: 0,
        profileImage: "/img/profile-placeholder.jpg"
    },
    {
        id: 3,
        workerName: "David Johnson",
        workerRole: "Plumber",
        lastMessage: "I have 10 years of experience in commercial plumbing.",
        timestamp: "3 hours ago",
        unreadCount: 1,
        profileImage: "/img/profile-placeholder.jpg"
    }
];

export default function ChatWithWorkersPage() {
    const router = useRouter();
    const selectedFlavor = CURRENT_FLAVOR;
    const flavorConfig = flavorConfigs[selectedFlavor];
    
    const [chats, setChats] = useState(mockChats);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleChatSelect = (chat: any) => {
        setSelectedChat(chat);
        setIsChatOpen(true);
        // Marcar mensajes como leídos
        setChats(prev => prev.map(c => 
            c.id === chat.id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
        setSelectedChat(null);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                pt: 8 // Espacio para el header fijo
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: 2
                }}
            >
                {/* Logo YAKKA y botón Back */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        component="img"
                        src="/YAKKA.webp"
                        alt="YAKKA Logo"
                        sx={{
                            width: { xs: 100, sm: 150},
                            height: { xs: 30, sm: 40 },
                            objectFit: 'contain'
                        }}
                    />
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            color: '#000000',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '50%',
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            '&:hover': {
                                backgroundColor: '#E0E0E0'
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                    </IconButton>
                </Box>

        
            </Box>

            {/* Contenido principal */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Título de la página */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: '#000000',
                            fontSize: { xs: '24px', sm: '32px' },
                            mb: 1
                        }}
                    >
                        Chat with Workers
                    </Typography>
                    
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            color: '#000000',
                            fontSize: '16px',
                            mb: 2
                        }}
                    >
                        Communicate with your team members
                    </Typography>
                </Box>

                {/* Lista de chats */}
                {chats.length > 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0
                        }}
                    >
                        {chats.map((chat, index) => (
                            <Box key={chat.id}>
                                <Box
                                    onClick={() => handleChatSelect(chat)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 3,
                                        cursor: 'pointer',
                                        backgroundColor: selectedChat?.id === chat.id ? '#f8f9fa' : '#FFFFFF',
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa'
                                        }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor: '#666666',
                                            color: '#FFFFFF',
                                            fontSize: '18px',
                                            fontWeight: 600
                                        }}
                                    >
                                        {chat.workerName.charAt(0).toUpperCase()}
                                    </Avatar>
                                    
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#000000',
                                                fontSize: '16px',
                                                mb: 0.5
                                            }}
                                        >
                                            {chat.workerName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#666666',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {chat.lastMessage}
                                        </Typography>
                                    </Box>
                                    
                                    {chat.unreadCount > 0 && (
                                        <Box
                                            sx={{
                                                backgroundColor: flavorConfig.primaryColor,
                                                color: '#FFFFFF',
                                                borderRadius: '50%',
                                                width: 20,
                                                height: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                fontWeight: 600
                                            }}
                                        >
                                            {chat.unreadCount}
                                        </Box>
                                    )}
                                </Box>
                                
                                {index < chats.length - 1 && (
                                    <Divider sx={{ borderColor: '#E0E0E0' }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666666',
                                fontSize: '18px',
                                mb: 1
                            }}
                        >
                            No chats available
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#999999',
                                fontSize: '14px'
                            }}
                        >
                            You don't have any active conversations with workers yet.
                        </Typography>
                    </Paper>
                )}
            </Container>

            {/* Chat Window */}
            {selectedChat && (
                <ChatWindow
                    isOpen={isChatOpen}
                    onClose={handleCloseChat}
                    worker={selectedChat}
                    selectedFlavor={selectedFlavor}
                />
            )}
        </Box>
    );
}

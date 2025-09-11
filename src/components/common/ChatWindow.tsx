'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Avatar,
    Paper,
    Divider,
    InputAdornment
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Phone as PhoneIcon,
    MoreVert as MoreVertIcon,
    AttachFile as AttachFileIcon,
    CameraAlt as CameraIcon,
    FormatBold as FormatIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface Message {
    id: number;
    text: string;
    timestamp: string;
    isSent: boolean;
    senderName?: string;
}

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
    worker: {
        id: number;
        workerName: string;
        workerRole: string;
        profileImage: string;
    };
    selectedFlavor: Flavor;
}

// Mensajes de ejemplo
const mockMessages: Message[] = [
    {
        id: 1,
        text: "Hola, estoy interesado en la posición. ¿Podemos discutir los detalles?",
        timestamp: "09:52 PM",
        isSent: false,
        senderName: "Jose"
    },
    {
        id: 2,
        text: "¡Hola! Claro, me da mucho gusto que estés interesado. ¿Cuándo podrías empezar?",
        timestamp: "09:53 PM",
        isSent: true
    },
    {
        id: 3,
        text: "Podría empezar la próxima semana. ¿Cuáles son los horarios?",
        timestamp: "09:54 PM",
        isSent: false,
        senderName: "Jose"
    },
    {
        id: 4,
        text: "Perfecto, los horarios son de 8 AM a 5 PM de lunes a viernes. ¿Te parece bien?",
        timestamp: "09:55 PM",
        isSent: true
    }
];

export default function ChatWindow({ isOpen, onClose, worker, selectedFlavor }: ChatWindowProps) {
    const flavorConfig = flavorConfigs[selectedFlavor];
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: messages.length + 1,
                text: newMessage,
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                }),
                isSent: true
            };
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const formatDate = () => {
        return new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2000,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header del chat */}
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid #E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 2,
                    minHeight: 64
                }}
            >
                {/* Lado izquierdo: Botón back, avatar y nombre */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#000000',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '50%',
                            width: 40,
                            height: 40,
                            '&:hover': {
                                backgroundColor: '#E0E0E0'
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#666666',
                            color: '#FFFFFF',
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        {worker.workerName.charAt(0).toUpperCase()}
                    </Avatar>
                    
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#000000',
                                fontSize: '16px',
                                lineHeight: 1.2
                            }}
                        >
                            {worker.workerName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666666',
                                fontSize: '12px'
                            }}
                        >
                            {worker.workerRole}
                        </Typography>
                    </Box>
                </Box>

                {/* Lado derecho: Botones de acción */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <PhoneIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Área de mensajes */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    backgroundColor: '#F8F9FA',
                    px: 2,
                    py: 2
                }}
            >
                {/* Fecha */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#666666',
                            fontSize: '12px',
                            backgroundColor: '#FFFFFF',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: '1px solid #E0E0E0'
                        }}
                    >
                        {formatDate()}
                    </Typography>
                </Box>

                {/* Mensajes */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                justifyContent: message.isSent ? 'flex-end' : 'flex-start',
                                alignItems: 'flex-end',
                                gap: 1
                            }}
                        >
                            {!message.isSent && (
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        backgroundColor: '#666666',
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        fontWeight: 600
                                    }}
                                >
                                    {message.senderName?.charAt(0).toUpperCase()}
                                </Avatar>
                            )}
                            
                            <Box
                                sx={{
                                    maxWidth: '70%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: message.isSent ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 2,
                                        backgroundColor: message.isSent ? flavorConfig.primaryColor : '#FFFFFF',
                                        color: message.isSent ? '#FFFFFF' : '#000000',
                                        borderRadius: 3,
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '14px',
                                            lineHeight: 1.4
                                        }}
                                    >
                                        {message.text}
                                    </Typography>
                                </Paper>
                                
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: '#666666',
                                        fontSize: '11px',
                                        mt: 0.5,
                                        px: 1
                                    }}
                                >
                                    {message.timestamp}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>
            </Box>

            {/* Área de entrada de mensaje */}
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderTop: '1px solid #E0E0E0',
                    p: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Botón de adjuntar archivo */}
                    <IconButton
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <AttachFileIcon />
                    </IconButton>

                    {/* Campo de texto */}
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        placeholder="Write your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 6,
                                backgroundColor: '#F8F9FA',
                                '& fieldset': {
                                    borderColor: '#E0E0E0'
                                },
                                '&:hover fieldset': {
                                    borderColor: flavorConfig.primaryColor
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: flavorConfig.primaryColor
                                }
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '14px',
                                padding: '12px 16px'
                            }
                        }}
                    />

                    {/* Botones de acción */}
                    <IconButton
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <CameraIcon />
                    </IconButton>
                    
                    <IconButton
                        sx={{
                            color: '#666666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        <FormatIcon />
                    </IconButton>

                    {/* Botón de enviar */}
                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        sx={{
                            backgroundColor: newMessage.trim() ? flavorConfig.primaryColor : '#E0E0E0',
                            color: newMessage.trim() ? '#FFFFFF' : '#999999',
                            width: 40,
                            height: 40,
                            '&:hover': {
                                backgroundColor: newMessage.trim() ? flavorConfig.buttonHoverColor : '#E0E0E0'
                            },
                            '&:disabled': {
                                backgroundColor: '#E0E0E0',
                                color: '#999999'
                            }
                        }}
                    >
                        <SendIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                {/* Botón Quick Chat */}
                <Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <Paper
                        sx={{
                            backgroundColor: flavorConfig.primaryColor,
                            color: '#FFFFFF',
                            px: 2,
                            py: 1,
                            borderRadius: 3,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            '&:hover': {
                                backgroundColor: flavorConfig.buttonHoverColor,
                                transform: 'translateY(-1px)'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '12px',
                                fontWeight: 600
                            }}
                        >
                            Quick chat
                        </Typography>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

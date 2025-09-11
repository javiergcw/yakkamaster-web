'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip
} from '@mui/material';

interface InvoiceCardProps {
    invoice: {
        id: string;
        number: string;
        clientName: string;
        amount: number;
        dueDate: string;
        status: 'sent' | 'opened' | 'paid' | 'overdue';
        overdueDays?: number;
        date: string;
    };
}

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent':
                return '#666666';
            case 'opened':
                return '#1976d2';
            case 'paid':
                return '#2e7d32';
            case 'overdue':
                return '#d32f2f';
            default:
                return '#666666';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'sent':
                return 'Sent';
            case 'opened':
                return 'Opened';
            case 'paid':
                return 'Paid';
            case 'overdue':
                return 'Overdue';
            default:
                return 'Unknown';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <Card
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 'none',
                border: '1px solid #E0E0E0',
                mb: 2,
                '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    {/* Información de la factura */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000',
                                mb: 0.5
                            }}
                        >
                            {invoice.number}: {invoice.clientName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666666',
                                mb: 1
                            }}
                        >
                            {invoice.date}
                            {invoice.status === 'overdue' && (
                                <Box
                                    component="span"
                                    sx={{
                                        color: '#d32f2f',
                                        ml: 1,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Overdue {invoice.overdueDays} days
                                </Box>
                            )}
                        </Typography>
                    </Box>

                    {/* Monto y estado */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1
                    }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#000000'
                            }}
                        >
                            {formatCurrency(invoice.amount)}
                        </Typography>
                        <Chip
                            label={getStatusText(invoice.status)}
                            sx={{
                                backgroundColor: getStatusColor(invoice.status),
                                color: '#ffffff',
                                fontSize: '0.75rem',
                                height: 24,
                                '& .MuiChip-label': {
                                    px: 1
                                }
                            }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

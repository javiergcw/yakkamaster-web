'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  IconButton
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  PhotoLibrary as GalleryIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Flavor, flavorConfigs } from '@/types/flavors';

interface ProfilePhotoUploadProps {
  flavor?: Flavor;
  onPhotoChange?: (photo: File | null) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  flavor = Flavor.LABOUR,
  onPhotoChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const config = flavorConfigs[flavor];
  
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedPhoto(file);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Notificar al componente padre
      if (onPhotoChange) {
        onPhotoChange(file);
      }
    }
  };

  const handleCameraClick = async () => {
    // Verificar si estamos en un dispositivo móvil
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobileDevice) {
      try {
        // Verificar si ya tenemos permisos
        if (cameraPermission === 'granted') {
          if (cameraInputRef.current) {
            cameraInputRef.current.click();
          }
          return;
        }

        // Solicitar permisos de cámara
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment' // Cámara trasera por defecto
          } 
        });
        
        // Si se obtienen los permisos, actualizar estado y abrir input
        setCameraPermission('granted');
        stream.getTracks().forEach(track => track.stop()); // Detener el stream inmediatamente
        
        if (cameraInputRef.current) {
          cameraInputRef.current.click();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraPermission('denied');
        
        // Mostrar mensaje más amigable
        const errorName = error instanceof Error ? error.name : 'UnknownError';
        const userMessage = errorName === 'NotAllowedError' 
          ? 'Permisos de cámara denegados. Por favor, permite el acceso a la cámara en la configuración de tu navegador.'
          : 'No se pudo acceder a la cámara. Por favor, selecciona una foto de la galería.';
        
        alert(userMessage);
        
        // Si es un error de permisos, no abrir galería automáticamente
        if (errorName !== 'NotAllowedError') {
          handleGalleryClick();
        }
      }
    } else {
      // En desktop, abrir directamente el input de cámara
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleCameraInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setPhotoPreview(null);
    if (onPhotoChange) {
      onPhotoChange(null);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* Área de foto de perfil */}
      <Box sx={{ mb: 4, position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={photoPreview || undefined}
          sx={{
            width: 200,
            height: 200,
            border: '4px solid',
            borderColor: theme.palette.text.primary,
            backgroundColor: theme.palette.grey[100],
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
          onClick={handleGalleryClick}
        >
          {!photoPreview && (
            <CameraIcon 
              sx={{ 
                fontSize: 60, 
                color: theme.palette.text.primary 
              }} 
            />
          )}
        </Avatar>
        
        {/* Botón para eliminar foto */}
        {photoPreview && (
          <IconButton
            onClick={handleRemovePhoto}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: theme.palette.error.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
              width: 32,
              height: 32
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      {/* Pregunta */}
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          mb: 4,
          fontSize: isMobile ? '1rem' : '1.2rem',
          fontWeight: 400
        }}
      >
        Take a photo or upload one?
      </Typography>

      {/* Botones de acción */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          maxWidth: 400,
          mx: 'auto'
        }}
      >
        {/* Botón Cámara */}
        <Button
          variant="contained"
          onClick={handleCameraClick}
          startIcon={<CameraIcon />}
          sx={{
            backgroundColor: theme.palette.grey[800],
            color: 'white',
            py: 1.5,
            px: 3,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            flex: 1,
            '&:hover': {
              backgroundColor: theme.palette.grey[900],
            },
          }}
        >
          Camera
        </Button>

        {/* Botón Galería */}
        <Button
          variant="contained"
          onClick={handleGalleryClick}
          startIcon={<GalleryIcon />}
          sx={{
            backgroundColor: theme.palette.grey[800],
            color: 'white',
            py: 1.5,
            px: 3,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            flex: 1,
            '&:hover': {
              backgroundColor: theme.palette.grey[900],
            },
          }}
        >
          Gallery
        </Button>
      </Box>

      {/* Inputs ocultos para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraInputChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default ProfilePhotoUpload;

import React from 'react';
import { Modal as MuiModal, Box, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Modal.css';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Handler called when the modal is closed
   */
  onClose: () => void;
  /**
   * The content of the modal
   */
  children: React.ReactNode;
  /**
   * The title of the modal
   */
  title?: string;
  /**
   * The size of the modal
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking the backdrop closes the modal
   */
  closeOnBackdropClick?: boolean;
  /**
   * Additional CSS class name for the modal container
   */
  className?: string;
  /**
   * Additional CSS class name for the modal content box
   */
  contentClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  contentClassName = '',
  ...props
}) => {
  // Map custom sizes to pixel widths
  const modalWidth = size === 'sm' ? 400 :
                    size === 'md' ? 600 :
                    size === 'lg' ? 800 :
                    size === 'xl' ? 1200 : 600;

  const handleClose = (_event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && !closeOnBackdropClick) {
      return;
    }
    onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      className={`modal-overlay ${className}`}
      {...props}
    >
      <Box
        className={`modal-content modal-${size} ${contentClassName}`}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: modalWidth,
          maxWidth: '90vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {(title || showCloseButton) && (
          <Box
            className="modal-header"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {title && (
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  marginLeft: 'auto',
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        )}
        <Box
          className="modal-body"
          sx={{
            p: 3,
            overflow: 'auto',
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};


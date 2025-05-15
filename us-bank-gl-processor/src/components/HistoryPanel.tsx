import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Description, Download, Delete } from '@mui/icons-material';

export interface HistoryItem {
  id: string;
  fileName: string;
  uploadDate: Date;
  fileSize?: string;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDownloadItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  selectedItemId?: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectItem,
  onDownloadItem,
  onDeleteItem,
  selectedItemId
}) => {
  // Format date to a readable string
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flex: 1
      }}
    >
      <Box sx={{
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.02)'
            : 'rgba(255, 255, 255, 0.02)'
      }}>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Upload History
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(10, 75, 148, 0.08)'
                : 'rgba(33, 150, 243, 0.16)',
            borderRadius: '12px',
            px: 1.5,
            py: 0.5
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'primary.main',
              fontWeight: 600
            }}
          >
            {history.length} {history.length === 1 ? 'file' : 'files'}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {history.length === 0 ? (
          <Box sx={{
            p: 3,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: '200px',
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            <Box
              sx={{
                mb: 3,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  background: (theme) =>
                    `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
                  borderRadius: '50%',
                  animation: 'pulse 3s infinite ease-in-out',
                  zIndex: -1
                }
              }}
            >
              <Description
                sx={{
                  fontSize: 60,
                  color: 'primary.main',
                  opacity: 0.6,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              No Upload History
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: '240px',
                mb: 3
              }}
            >
              Upload a bank statement to see it appear in your history
            </Typography>
            <Box
              sx={{
                width: '60%',
                height: '4px',
                borderRadius: '2px',
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40)`,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer 2s infinite linear'
                }
              }}
            />
          </Box>
        ) : (
          <List
            sx={{
              p: 0,
              '& > .MuiListItem-root:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.01)'
                    : 'rgba(255, 255, 255, 0.01)'
              }
            }}
          >
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  disablePadding
                  sx={{
                    animation: 'fadeIn 0.3s ease-in-out',
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', opacity: 0.4, transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}>
                      <Tooltip title="Download">
                        <IconButton
                          edge="end"
                          aria-label="download"
                          onClick={() => onDownloadItem(item)}
                          size="small"
                          color="primary"
                          sx={{
                            mr: 0.5,
                            transition: 'all 0.2s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <Download fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onDeleteItem(item.id)}
                          size="small"
                          color="error"
                          sx={{
                            transition: 'all 0.2s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemButton
                    selected={selectedItemId === item.id}
                    onClick={() => onSelectItem(item)}
                    sx={{
                      borderLeft: selectedItemId === item.id ? 3 : 0,
                      borderColor: 'primary.main',
                      py: 1.5,
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': selectedItemId === item.id ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: (theme) =>
                          `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      } : {},
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'rgba(0, 0, 0, 0.03)'
                            : 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Description
                        color={selectedItemId === item.id ? "primary" : "action"}
                        sx={{
                          transition: 'transform 0.2s ease',
                          transform: selectedItemId === item.id ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          noWrap
                          title={item.fileName}
                          sx={{
                            fontWeight: selectedItemId === item.id ? 600 : 400,
                            color: selectedItemId === item.id ? 'primary.main' : 'text.primary'
                          }}
                        >
                          {item.fileName}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="body2"
                            component="span"
                            display="block"
                            noWrap
                            sx={{
                              color: selectedItemId === item.id ? 'text.primary' : 'text.secondary',
                              opacity: selectedItemId === item.id ? 0.9 : 0.7
                            }}
                          >
                            {formatDate(item.uploadDate)}
                          </Typography>
                          {item.fileSize && (
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-block',
                                bgcolor: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? 'rgba(0, 0, 0, 0.04)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                px: 0.8,
                                py: 0.2,
                                mt: 0.5,
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                fontWeight: 500
                              }}
                            >
                              {item.fileSize}
                            </Box>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default HistoryPanel;

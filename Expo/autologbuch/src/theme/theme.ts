export const theme = {
    colors: {
        primary: '#2196F3',
        primaryContainer: '#BBDEFB',
        onPrimaryContainer: '#0D47A1',
        secondary: '#FF9800',
        secondaryContainer: '#FFE0B2',
        onSecondaryContainer: '#E65100',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        error: '#F44336',
        success: '#4CAF50',
        warning: '#FF9800',
        text: '#212121',
        textSecondary: '#757575',
        border: '#E0E0E0',
        disabled: '#BDBDBD',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
    },
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
    },
    fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
    } as const,
};

export type Theme = typeof theme;

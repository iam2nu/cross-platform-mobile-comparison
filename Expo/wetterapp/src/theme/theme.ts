export const colors = {
    primary: '#1976D2', // Blue 600
    primaryDark: '#1565C0', // Blue 700
    primaryLight: '#42A5F5', // Blue 400
    secondary: '#FF9800', // Orange
    background: '#F5F5F5', // Grey 100
    surface: '#FFFFFF',
    error: '#F44336',
    errorLight: '#FFEBEE',
    errorDark: '#C62828',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    cardBackground: '#FFFFFF',
    blueGradientStart: '#64B5F6', // Blue 300
    blueGradientEnd: '#1976D2', // Blue 600
    selectedBlue: '#BBDEFB', // Blue 100
    white: '#FFFFFF',
    white70: 'rgba(255, 255, 255, 0.7)',
    black: '#000000',
    black08: 'rgba(0, 0, 0, 0.08)',
    black10: 'rgba(0, 0, 0, 0.1)',
    black20: 'rgba(0, 0, 0, 0.2)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 15,
};

export const fontSize = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 48,
};

export const fontWeight = {
    normal: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
};

export const shadows = {
    small: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
};

export const theme = {
    colors,
    spacing,
    borderRadius,
    fontSize,
    fontWeight,
    shadows,
};

export type Theme = typeof theme;

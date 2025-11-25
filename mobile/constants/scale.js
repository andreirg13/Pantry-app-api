import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base design dimensions (iPhone 14 Pro)
const baseWidth = 390;
const baseHeight = 844;

// Scale factors
export const SCALE_FACTOR_WIDTH = screenWidth / baseWidth;
export const SCALE_FACTOR_HEIGHT = screenHeight / baseHeight;

// Adjust this to make everything bigger/smaller
export const GLOBAL_SCALE = 0.75;

// Helper functions
export const scale = (size) => size * SCALE_FACTOR_WIDTH * GLOBAL_SCALE;
export const scaleVertical = (size) => size * SCALE_FACTOR_HEIGHT * GLOBAL_SCALE;
export const scaleFont = (size) => Math.round(scale(size));
export const scalePadding = (size) => Math.round(scale(size));
export const scaleMargin = (size) => Math.round(scale(size));

// For maintaining aspect ratios
export const scaleSize = (size) => Math.round(scale(size));
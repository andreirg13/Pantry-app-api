import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize } from "../../constants/scale";

const { width } = Dimensions.get("window");

export const pantryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: scalePadding(32),
  },
  header: {
    paddingHorizontal: scalePadding(20),
    paddingTop: scalePadding(20),
    paddingBottom: scalePadding(16),
  },
  welcomeText: {
    fontSize: scaleFont(32),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: scaleMargin(4),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    fontWeight: "500",
  },
  
  // Input Section
  inputSection: {
    paddingHorizontal: scalePadding(20),
    marginBottom: scaleMargin(24),
  },
  inputContainer: {
    flexDirection: "row",
    gap: scaleSize(12),
  },
  textInput: {
    flex: 1,
    height: scaleSize(52),
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(16),
    paddingHorizontal: scalePadding(16),
    fontSize: scaleFont(16),
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    width: scaleSize(52),
    height: scaleSize(52),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(16),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  // Add Item Button
  addItemButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    borderRadius: scaleSize(16),
    gap: scaleSize(8),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addItemButtonText: {
    color: COLORS.white,
    fontSize: scaleFont(16),
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  // Ingredients Section
  ingredientsSection: {
    paddingHorizontal: scalePadding(20),
    flex: 1,
  },
  sectionTitle: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: scaleMargin(16),
  },
  ingredientsList: {
    flex: 1,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    padding: scalePadding(16),
    borderRadius: scaleSize(16),
    marginBottom: scaleMargin(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientInfo: {
    flex: 1,
    paddingRight: scalePadding(12),
  },
  ingredientName: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: scaleMargin(4),
  },
  ingredientQuantity: {
    fontSize: scaleFont(14),
    color: COLORS.textLight,
    marginBottom: scaleMargin(2),
  },
  ingredientBrand: {
    fontSize: scaleFont(14),
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginBottom: scaleMargin(2),
  },
  expirationText: {
    fontSize: scaleFont(12),
    color: COLORS.textLight,
    marginTop: scaleMargin(4),
  },
  expiredText: {
    color: '#FF4444',
    fontWeight: '600',
  },
  expiringSoonText: {
    color: '#FF8800',
    fontWeight: '600',
  },
  expiredItem: {
    backgroundColor: '#FFE8E8',
    borderColor: '#FFCCCC',
  },
  isExpiringSoon: {
    backgroundColor: '#FFF4E6',
    borderColor: '#FFE0B3',
  },
  removeButton: {
    padding: scalePadding(8),
    borderRadius: scaleSize(12),
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scalePadding(64),
    paddingHorizontal: scalePadding(32),
  },
  emptyTitle: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: COLORS.text,
    marginTop: scaleMargin(16),
    marginBottom: scaleMargin(8),
  },
  emptyDescription: {
    fontSize: scaleFont(14),
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: scaleSize(20),
  },

  // Generate Button
  generateSection: {
    paddingHorizontal: scalePadding(20),
    paddingBottom: scalePadding(20),
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(24),
    borderRadius: scaleSize(16),
    gap: scaleSize(8),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonDisabled: {
    backgroundColor: COLORS.textLight,
    shadowOpacity: 0.05,
  },
  generateButtonText: {
    color: COLORS.white,
    fontSize: scaleFont(18),
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  categorySection: {
  marginBottom: scaleMargin(16),
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(12),
    borderRadius: scaleSize(12),
    marginBottom: scaleMargin(8),
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryItems: {
    marginBottom: scaleMargin(8),
  },
});
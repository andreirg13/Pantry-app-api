import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize } from "../../constants/scale";

export const recipeGeneratorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scalePadding(20),
    paddingTop: scalePadding(60),
    paddingBottom: scalePadding(20),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: COLORS.text,
  },
  
  // Sections
  section: {
    paddingHorizontal: scalePadding(20),
    paddingVertical: scalePadding(16),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: scaleMargin(12),
  },
  
  // Ingredients List
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleSize(8),
  },
  ingredientChip: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: scalePadding(12),
    paddingVertical: scalePadding(6),
    borderRadius: scaleSize(16),
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
  },
  ingredientChipText: {
    fontSize: scaleFont(14),
    color: COLORS.primary,
    fontWeight: '500',
  },
  
  // Filters
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleSize(10),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: scalePadding(14),
    paddingVertical: scalePadding(10),
    borderRadius: scaleSize(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: scaleSize(6),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowOpacity: 0.15,
  },
  filterText: {
    fontSize: scaleFont(14),
    color: COLORS.text,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  
  // Recipe Display
  recipeContainer: {
    marginHorizontal: scalePadding(20),
    marginTop: scaleMargin(20),
    marginBottom: scaleMargin(100), // Space for bottom button
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(16),
    padding: scalePadding(20),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recipeTitle: {
    fontSize: scaleFont(22),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: scaleMargin(16),
  },
  recipeContent: {
    fontSize: scaleFont(15),
    color: COLORS.text,
    lineHeight: scaleSize(24),
    marginBottom: scaleMargin(20),
  },
  
  // Save Button
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary || COLORS.primary + '20',
    paddingVertical: scalePadding(12),
    borderRadius: scaleSize(12),
    gap: scaleSize(8),
  },
  saveButtonText: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: COLORS.primary,
  },
  
  // Bottom Container
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: scalePadding(20),
    paddingTop: scalePadding(10),
    paddingBottom: scalePadding(30),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  
  // Generate Button
  generateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scalePadding(16),
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
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scalePadding(40),
  },
  loadingText: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    marginTop: scaleMargin(12),
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: scalePadding(40),
  },
  emptyText: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
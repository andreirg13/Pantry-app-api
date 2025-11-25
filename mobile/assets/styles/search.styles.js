import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize } from "../../constants/scale";

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchSection: {
    paddingHorizontal: scalePadding(16),
    paddingTop: scalePadding(16),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(16),
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(12),
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
  searchIcon: {
    marginRight: scaleMargin(12),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(16),
    color: COLORS.text,
  },
  clearButton: {
    padding: scalePadding(4),
  },
  quickFilters: {
    marginTop: scaleMargin(20),
  },
  filterLabel: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: scaleMargin(12),
  },
  filterButtons: {
    flexDirection: "row",
    gap: scaleSize(12),
  },
  quickFilterButton: {
    backgroundColor: COLORS.card,
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(8),
    borderRadius: scaleSize(20),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeQuickFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  quickFilterText: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    color: COLORS.text,
  },
  activeQuickFilterText: {
    color: COLORS.white,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: scalePadding(16),
    marginTop: scaleMargin(8),
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleMargin(16),
    marginTop: scaleMargin(16),
  },
  resultsTitle: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  resultsCount: {
    fontSize: scaleFont(14),
    color: COLORS.textLight,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipesGrid: {
    gap: scaleSize(16),
    paddingBottom: scalePadding(32),
  },
  row: {
    justifyContent: "space-between",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scalePadding(64),
  },
  emptyTitle: {
    fontSize: scaleFont(20),
    fontWeight: "bold",
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
});
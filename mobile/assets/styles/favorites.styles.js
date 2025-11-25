import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize } from "../../constants/scale";

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scalePadding(20),
    paddingVertical: scalePadding(16),
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  logoutButton: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: scalePadding(16),
    marginTop: scaleMargin(24),
    gap: scaleSize(12),
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(16),
    padding: scalePadding(16),
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleMargin(8),
  },
  statValue: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: COLORS.text,
  },
  recipesSection: {
    paddingHorizontal: scalePadding(16),
    marginTop: scaleMargin(24),
    paddingBottom: scalePadding(32),
  },
  recipesGrid: {
    gap: scaleSize(16),
  },
  row: {
    justifyContent: "space-between",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: scalePadding(64),
    paddingHorizontal: scalePadding(32),
  },
  emptyIconContainer: {
    width: scaleSize(120),
    height: scaleSize(120),
    borderRadius: scaleSize(60),
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleMargin(24),
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
  },
  emptyTitle: {
    fontSize: scaleFont(24),
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: scaleMargin(24),
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: scalePadding(24),
    paddingVertical: scalePadding(12),
    borderRadius: scaleSize(24),
    gap: scaleSize(8),
  },
  exploreButtonText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: COLORS.white,
  },
});
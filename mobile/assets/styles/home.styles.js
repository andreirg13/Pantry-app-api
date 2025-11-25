import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize, scaleVertical } from "../../constants/scale";

const { width } = Dimensions.get("window");
const cardWidth = (width - scaleSize(48)) / 2;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: scalePadding(32),
  },
  welcomeSection: {
    paddingHorizontal: scalePadding(20),
    paddingTop: scalePadding(20),
    paddingBottom: scalePadding(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: scaleFont(32),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    marginTop: scaleMargin(4),
  },
  generateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(16),
    paddingVertical: scalePadding(12),
    paddingHorizontal: scalePadding(16),
    marginBottom: scaleMargin(24),
    justifyContent: "center",
  },
  generateText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: COLORS.white,
    marginLeft: scaleMargin(8),
  },
  featuredSection: {
    paddingHorizontal: scalePadding(20),
    marginBottom: scaleMargin(24),
  },
  featuredCard: {
    borderRadius: scaleSize(24),
    overflow: "hidden",
    backgroundColor: COLORS.card,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: scaleSize(12),
    },
    shadowOpacity: 0.2,
    shadowRadius: scaleSize(16),
    elevation: 12,
  },
  featuredImageContainer: {
    height: scaleVertical(240),
    backgroundColor: COLORS.primary,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    padding: scalePadding(20),
  },
  featuredBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scalePadding(12),
    paddingVertical: scalePadding(6),
    borderRadius: scaleSize(20),
    alignSelf: "flex-start",
  },
  featuredBadgeText: {
    color: COLORS.white,
    fontSize: scaleFont(12),
    fontWeight: "600",
  },
  featuredContent: {
    justifyContent: "flex-end",
  },
  featuredTitle: {
    fontSize: scaleFont(24),
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: scaleMargin(12),
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuredMeta: {
    flexDirection: "row",
    gap: scaleSize(16),
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleSize(4),
  },
  metaText: {
    fontSize: scaleFont(14),
    color: COLORS.white,
    fontWeight: "600",
  },
  recipesSection: {
    paddingHorizontal: scalePadding(20),
    marginTop: scaleMargin(8),
  },
  sectionHeader: {
    marginBottom: scaleMargin(16),
  },
  sectionTitle: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  recipesGrid: {
    gap: scaleSize(16),
  },
  row: {
    justifyContent: "space-between",
    gap: scaleSize(16),
  },
  emptyState: {
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
  },
  categoryFilterContainer: {
    marginVertical: scaleMargin(16),
  },
  categoryFilterScrollContent: {
    paddingHorizontal: scalePadding(16),
    gap: scaleSize(12),
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    paddingVertical: scalePadding(12),
    paddingHorizontal: scalePadding(16),
    borderRadius: scaleSize(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: scaleSize(80),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowOpacity: 0.15,
  },
  categoryImage: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    marginBottom: scaleMargin(4),
    backgroundColor: COLORS.border,
  },
  selectedCategoryImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  categoryText: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
  selectedCategoryText: {
    color: COLORS.white,
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
});

export const recipeCardStyles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(16),
    marginBottom: scaleMargin(16),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: scaleVertical(140),
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.border,
  },
  content: {
    padding: scalePadding(12),
  },
  title: {
    fontSize: scaleFont(15),
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: scaleMargin(4),
    lineHeight: scaleSize(20),
  },
  description: {
    fontSize: scaleFont(12),
    color: COLORS.textLight,
    marginBottom: scaleMargin(8),
    lineHeight: scaleSize(16),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: scaleFont(11),
    color: COLORS.textLight,
    marginLeft: scaleMargin(4),
    fontWeight: "500",
  },
  servingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingsText: {
    fontSize: scaleFont(11),
    color: COLORS.textLight,
    marginLeft: scaleMargin(4),
    fontWeight: "500",
  },
});

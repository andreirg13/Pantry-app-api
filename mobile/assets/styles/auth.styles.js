import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";
import { scaleFont, scalePadding, scaleMargin, scaleSize, scaleVertical } from "../../constants/scale";

const { height } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scalePadding(24),
    paddingTop: scalePadding(40),
  },
  imageContainer: {
    height: height * 0.3,
    marginBottom: scaleMargin(30),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: scaleSize(320),
    height: scaleSize(320),
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: scaleMargin(40),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: scaleMargin(30),
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: scaleMargin(20),
    position: "relative",
  },
  textInput: {
    fontSize: scaleFont(16),
    color: COLORS.text,
    paddingVertical: scalePadding(16),
    paddingHorizontal: scalePadding(20),
    backgroundColor: COLORS.background,
    borderRadius: scaleSize(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eyeButton: {
    position: "absolute",
    right: scaleSize(16),
    top: scaleSize(16),
    padding: scalePadding(4),
  },
  authButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: scalePadding(18),
    borderRadius: scaleSize(12),
    marginTop: scaleMargin(20),
    marginBottom: scaleMargin(30),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
  },
  linkContainer: {
    alignItems: "center",
    paddingBottom: scalePadding(20),
  },
  linkText: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomHeaderProps {
  title: string;
  LeftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  RightIcon?: React.ReactNode;
  onRightPress?: () => void;
}

export default function CustomHeader({
  title,
  LeftIcon,
  onLeftPress,
  RightIcon,
  onRightPress,
}: CustomHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={onLeftPress}>
        <View style={styles.backButton}>
          <View style={styles.buttonContainer}></View>
          {LeftIcon}
        </View>
      </TouchableOpacity>

      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.backButtonContainer} onPress={onRightPress}>
        <View style={styles.backButton}>
          <View style={styles.buttonContainer}></View>
          {RightIcon}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 390,
    height: 72,
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#FAFAFA",
  },
  backButtonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 48,
    height: 48,
  },
  backButton: {
    height: 24,
    width: 24,
  },
  buttonContainer: {
    width: 18,
    height: 15,
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: 310,
    height: 23,
    paddingRight: 48,
  },
  headerTitle: {
    textAlign: "center",
    width: 262,
    height: 23,
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    color: "#000",
  },
});

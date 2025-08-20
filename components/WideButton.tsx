import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ContinueButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;      
  buttonStyle?: ViewStyle;       
  textStyle?: TextStyle;          
  gradient?: boolean;             
  gradientColors?: string[];     
}

export default function ContinueButton({
  title,
  onPress,
  containerStyle,
  buttonStyle,
  textStyle,
  gradient = false,
  gradientColors = ["#8C66E3", "#BA9CF7"], 
}: ContinueButtonProps) {
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <TouchableOpacity style={[styles.continueButton, buttonStyle]} onPress={onPress}>
        {gradient ? (
          <LinearGradient
            colors={["#8C66E3", "#2900F3"]}
            start={{x:0,y:0}}
            end={{x:2, y:2}}
            style={[styles.continueButton, buttonStyle]} // same shape as button
          >
            <View style={styles.continueContainer}>
              <Text style={[styles.continueButtonText, textStyle]}>{title}</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.continueContainer}>
            <Text style={[styles.continueButtonText, textStyle]}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // flexDirection: "row",
    width: "auto",
    height: 72,
    paddingBottom: 12,
  },
  continueButton: {
    justifyContent: "center",
    // flexDirection: "row",
    width: "auto",
    height: 48,
    // minWidth: 112,
    maxWidth: "auto",
    borderRadius: 24,
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA",
  },
  continueContainer: {
    alignSelf: "center",
    width: "auto",
    height: 24,
  },
  continueButtonText: {
    width: "auto",
    height: 24,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
  },
});

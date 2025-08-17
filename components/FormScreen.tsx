// KeyboardAvoidingWrapper.tsx
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ correct import
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type KeyboardAvoidingWrapperProps = {
  children: ReactNode;
  style?: object;
  keyboardVerticalOffset?: number;
};

const KeyboardAvoidingWrapper: React.FC<KeyboardAvoidingWrapperProps> = ({
  children,
  style = {},
  keyboardVerticalOffset,
}) => {
    const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          keyboardVerticalOffset !== undefined
            ? keyboardVerticalOffset
            : Platform.OS === "ios"
            ? 64
            : -21
        }
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});

export default KeyboardAvoidingWrapper;

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
} from "react-native";

interface LabeledInputProps extends TextInputProps {
  label?: string;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  placeholderStyle?: object;

  inputRef?: React.RefObject<RNTextInput | null>;
  onNext?: () => void;                    
  isLast?: boolean;                        
  onSubmit?: () => void;                 
}

export default function LabeledInput({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  placeholder,
  placeholderStyle,
  value,
  inputRef,
  onNext,
  isLast = false,
  onSubmit,
  ...props
}: LabeledInputProps) {
  return (
    <View style={[styles.subContainer, containerStyle]}>
      <View style={styles.fieldContainer}>

        {label && <View style={styles.textContainer}>
          <Text style={[styles.text, labelStyle]}>{label}</Text>
        </View>}

        <View style={{ position: "relative" }}>
          {!value && (
            <Text style={[styles.placeholder, placeholderStyle]}>
              {placeholder}
            </Text>
          )}

          <TextInput
            ref={inputRef}
            value={value}
            style={[styles.input, inputStyle]}
            returnKeyType={isLast ? "done" : "next"}
            submitBehavior={isLast ? "blurAndSubmit" : "submit"}
            onSubmitEditing={() => {
              if (isLast) {
                onSubmit?.(); 
              } else {
                onNext?.(); 
              }
            }}
            {...props}
          />

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    width: "auto",
    height: 112,
    // maxWidth: "auto",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fieldContainer: {
    width: "auto",
    height: 88,
    minWidth: 160,
  },
  textContainer: {
    width: "auto",
    height: 32,
    paddingBottom: 8,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#120F1A",
  },
  input: {
    width: "auto",
    height: 56,
    backgroundColor: "#EBE8F2",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  placeholder: {
    position: "absolute",
    left: 16,
    top: 16,
    color: "#66578F",
    fontSize: 16,
    zIndex: 1,
  },
});

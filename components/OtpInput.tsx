import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type OtpInputProps = {
  length?: number;
  onComplete?: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    const lastChar = text.replace(/[^0-9a-zA-Z]/g, "").slice(-1);
    newValues[index] = lastChar;

    setValues(newValues);

    if (lastChar && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((val) => val !== "") && onComplete) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>

        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el!;
            }}
            style={styles.input}
            value={values[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            autoCapitalize="characters"
            autoCorrect={false}
          />
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputContainer:{
    flexDirection:"row",
    justifyContent:'space-between',
    height:56,
    gap:16
  },
  input: {
    flex:1,
    width: 48,
    height: 56,
    borderBottomWidth: 1,
    borderColor: "#D9D4E3",
    fontSize: 20,
    paddingVertical:8,
    paddingHorizontal:12
  },
});

export default OtpInput;

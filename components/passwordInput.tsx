import React, { useState, forwardRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import {Eye} from "@assets/icons/icons";
import LabeledInput from "@components/labeledInput";

type PasswordInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  inputRef?: React.RefObject<TextInput | null>;
  isLast?: boolean;
  error?: boolean;
};

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    {
      label,
      value,
      placeholder,
      maxLength = 16,
      onChangeText,
      inputRef,
      isLast,
      error,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View className="flex-row max-h-[112px] flex-1">
        <LabeledInput
          label={label}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          maxLength={maxLength}
          inputRef={inputRef}
          isLast={isLast}
          secureTextEntry={!showPassword}
          containerStyle={{ flex: 1 }}
          inputStyle={error ? { borderWidth: 1, borderColor: "red" } : {}}
        />

        <TouchableOpacity
          className="absolute right-2  top-10 p-5 items-end"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Eye width={24} height={24} fill={"#120F1A"} />
          {!showPassword && (
            <View
              className="absolute self-center w-[25px] h-[3px] rounded-md bg-[#66578F]"
              style={{
                bottom: 30,
                transform: [{ rotate: "45deg" }],
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

export default PasswordInput;

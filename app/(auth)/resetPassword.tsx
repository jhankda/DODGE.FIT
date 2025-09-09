import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import {HeaderBar, ContinueButton, KeyboardWrapper, PasswordInput} from "@components/index";
import { StatusBar } from "expo-status-bar";
import { useResetPass } from "@hooks/useSignIn";


const router = useRouter()

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>()
  const [confirmedPassword, setConfirmedPassword] = useState<string>()
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false)
  const confirmedPasswordRef = useRef<TextInput>(null)
  const [isInvalid, setIsInvalid] = useState<boolean | "testFail">(false)
  const { mutate: resetPass, isPending, error } = useResetPass();


  const handleResetPass = () => {
    if (!newPassword || newPassword !== confirmedPassword) {
      confirmedPasswordRef.current?.focus();
      setIsInvalid(true)
      return;
    }
    else if (newPassword === confirmedPassword) {
      setIsInvalid(false)
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(confirmedPassword)) {
      setIsInvalid("testFail")
      confirmedPasswordRef.current?.focus();
      return;
    }

    resetPass({
      newPassword: newPassword,
    })

  }

  const handlePassChange = (
    text: string,
    setState: (value: React.SetStateAction<string | undefined>) => void
  ) => {
    const cleanText = text.replace(/[^A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-\s]/g, "");
    setState(cleanText);
  };

  const rules = (text: string) => {
    return (
      <View style={{ height: 37, paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 }}>
        <Text
          style={{ height: 21, fontWeight: "400", fontSize: 14, lineHeight: 21, ...(isInvalid == "testFail" ? { color: "red" } : {}) }}
        >{text}</Text>
      </View>
    )
  }
  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="auto" />


        <View style={styles.upperContainer}>
          <HeaderBar
            title="Reset Password"
            LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
            onLeftPress={() => { router.replace('/forgotPassword') }}
          />

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Set a new password for your account.</Text>
          </View>

          <PasswordInput
            label="New Password"
            value={newPassword}
            onChangeText={(text) => handlePassChange(text, setNewPassword)}
            placeholder="New Password"
            maxLength={16}
            isLast={false}
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmedPassword}
            onChangeText={(text) => handlePassChange(text, setConfirmedPassword)}
            placeholder="Confirm Password"
            maxLength={16}
            inputRef={confirmedPasswordRef}
            isLast
            error={isInvalid === true}
          />


          {rules("• At least 8 characters")}
          {rules("• One uppercase & number")}
          {rules("• One special character")}
        </View>

        <ContinueButton
          title="Reset Password"
          gradient
          onPress={isPending ? undefined : handleResetPass}
        />




      </ScrollView>
    </KeyboardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 844,
    minHeight: 844,
    justifyContent: "space-between",
    color: "#FAFAFA"
  },
  upperContainer: {
    height: 447
  },
  lowerContainer: {},
  subHeaderContainer: {
    textAlign: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#120F1A",
  },
  passwordContainer: {
    flexDirection: "row",
    maxHeight: 112,
    flex: 1,

  },

})
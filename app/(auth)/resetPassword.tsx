import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "../../assets/icons/arrowLeft.svg";
import ScrollMenu from "../../assets/icons/ScrollMenu.svg";
import Eye from "../../assets/icons/Eye.svg"
import DropdownInput from "../../components/dropDownMenu";
import LabeledInput from "../../components/labeledInput";
import HeaderBar from "../../components/HeaderBar";
import ContinueButton from "../../components/WideButton";
import KeyboardWrapper from "../../components/FormScreen";
import { StatusBar } from "expo-status-bar";

const router = useRouter()

export default function ResetPassword() {

  const [newPassword, setNewPassword] = useState<string>()
  const [confirmedPassword, setConfirmedPassword] = useState<string>()

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false)

  const confirmedPasswordRef = useRef<TextInput>(null)

  const allowedRegex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-\s]*$/;

  const handlePassChange = (
    text: string,
    setState: (value: React.SetStateAction<string | undefined>) => void
  ) => {
    const cleanText = text.replace(/[^A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-\s]/g, "");
    setState(cleanText);
  };

  const rules = (text:string)=>{
    return (<View style={{ height: 37, paddingHorizontal: 16, paddingBottom: 12, paddingTop: 4 }}>
            <Text style={{ height: 21, fontWeight: "400", fontSize: 14, lineHeight: 21 }}>{text}</Text>
          </View>)
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

          <View style={styles.passwordContainer}>

            <LabeledInput
              label="New Password"
              value={newPassword}
              onChangeText={(text) => handlePassChange(text, setNewPassword)}
              placeholder="New Password"
              maxLength={16}
              onNext={() => confirmedPasswordRef.current?.focus()}
              secureTextEntry={!showNewPassword}
              containerStyle={{ flex: 1 }}
            />
            <TouchableOpacity
              style={{ alignItems: "flex-end", right: 10, top: 40, padding: 20, position: "absolute", alignContent: "center" }}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Eye width={24} height={24} fill={"#120F1A"} />
              {!showNewPassword && <View
                style={{
                  width: 25,
                  height: 3,
                  bottom: 14,
                  borderRadius: 7,
                  backgroundColor: "#66578F",
                  transform: [{ rotate: "45deg" }],
                }}
              ></View>}


            </TouchableOpacity>
          </View>


          <View style={styles.passwordContainer}>

            <LabeledInput
              label="Confirm Password"
              value={confirmedPassword}
              onChangeText={(text) => handlePassChange(text, setConfirmedPassword)}
              placeholder="Confirm Password"
              maxLength={16}
              inputRef={confirmedPasswordRef}
              isLast
              secureTextEntry={!showConfirmedPassword}
              keyboardType="default"
              containerStyle={{ flex: 1, hieght: 70 }}
            />
            <TouchableOpacity
              style={{ alignItems: "flex-end", right: 10, top: 40, padding: 20, position: "absolute", alignContent: "center" }}
              onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
            >
              <Eye width={24} height={24} fill={"#120F1A"} />
              {!showConfirmedPassword && <View
                style={{
                  width: 25,
                  height: 3,
                  bottom: 14,
                  borderRadius: 7,
                  backgroundColor: "#66578F",
                  transform: [{ rotate: "45deg" }],
                }}
              ></View>}
            </TouchableOpacity>
          </View>
            {rules("• At least 8 characters")}
            {rules("• One uppercase & number")}
            {rules("• One special character")}
        </View>

        <ContinueButton
          title="Reset Password"
          gradient
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
    color: "#120F1A"
  },
  passwordContainer: {
    flexDirection: "row",
    maxHeight: 112,
    flex: 1,

  },

})
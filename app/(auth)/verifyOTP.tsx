import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import HeaderBar from "@components/HeaderBar";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import OtpInput from "@components/OtpInput";
import ResendTimer from "@components/resendTimer";
import { useVerify, useforgotPass } from "@hooks/useSignIn";


const router = useRouter()





export default function verifyOTP() {
  const params = useLocalSearchParams<{ email?: string; phoneNo?: string; nextPath: string }>();
  const [otp, setOTP] = useState<string>()
  const { mutate: verifyOtp, isPending, error } = useVerify();
  const { mutate: forgotPass, isPending: isLoading, error: iserror = error } = useforgotPass();


  const handleVerify = () => {
    if (!otp) return;
    console.log("params",params.email,params.phoneNo)

    verifyOtp(
      {
        ...(params.email ? { email: params.email } : {}),
        ...(params.phoneNo ? { phoneNo: params.phoneNo } : {}),
        OTP: otp,
      }, {
      onSuccess: () => {
        router.push(params.nextPath)
      }
    }
    )
  }

  const handleResend = () => {

    console.log("Resend Initiated")
    forgotPass({
      ...(params.phoneNo ? { phoneNo: params.phoneNo } : {}),
      ...(params.email ? { email: params.email } : {}),
    }
    );
    console.log("Resend Complete")

  }

  const maskedValue = params.email
    ? params.email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => `${a}${"*".repeat(b.length)}${c}`)
    : params.phoneNo
      ? params.phoneNo.replace(/.(?=.{2})/g, "*")
      : "";

  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.upperContainer}>

          <HeaderBar
            title="Verify OTP"
            LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
            onLeftPress={() => { if (router.canGoBack()) router.back() }}
          />

          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>We've sent a 6-digit OTP to your email/phone.</Text>
          </View>

          <View style={styles.subTitle}><View />
            <Text style={styles.subHeader}>{maskedValue}</Text>
          </View>

          <OtpInput
            length={6}
            onComplete={(code) => setOTP(code)}
          />

          <ResendTimer
            duration={5}
            onResend={handleResend}
          />

        </View>

        <View style={styles.lowerContainer}>
          <ContinueButton
            title={isPending ? "verifying..." : "verify"}
            gradient
            onPress={handleVerify}
          />
        </View>

      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 844,
    minHeight: 844,
    justifyContent: "space-between"
  },
  upperContainer: {
    // width: 390,
    height: 295
  },
  lowerContainer: {
    height: 92,
    justifyContent: "flex-end"
  },
  subHeaderContainer: {
    // width: 390,
    height: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    textAlign: "center",
    // width: 358,
    height: 24,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#66578F"
  },
  subTitle: {
    // width: 390,
    height: 69,
    padding: 16,
    paddingBottom: 8
  },
  subHeaderText: {
    // width: 358,
    height: 46,
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: "center",
    color: "#120F1A"


  }

})
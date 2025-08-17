import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ContinueButton from "../../components/WideButton";
import KeyboardWrapper from "../../components/FormScreen";
import HeaderBar from "../../components/HeaderBar";
import ArrowLeft from "../../assets/icons/arrowLeft.svg";

const router = useRouter()

export default function verifyOTP() {
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
            onLeftPress={() => { router.replace("/signUp") }}
          />
        <View style={styles.subHeaderContainer}></View>
          <View style={styles.subTitle}><View/>
          <Text style={styles.subHeader}>jo**@email.com || email</Text>
        </View>
        </View>

      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    width: 390,
    height: 844,
    minHeight: 844,
    justifyContent: "space-between"
  },
  upperContainer: {
    width: 390,
    height: 295
  },
  subHeaderContainer: {
    width: 390,
    height: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4
  },
  subHeader: {
    textAlign: "center",
    width: 358,
    height: 24,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: "#000"
  },
  subTitle:{
    width:390,
    height:69,
    padding:16,
    paddingBottom:8
  },




})
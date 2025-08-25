import React, { useRef, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, ImageComponent, } from "react-native";
import { router, useRouter } from "expo-router";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import ScrollMenu from "@assets/icons/ScrollMenu.svg";
import DropdownInput from "@components/dropDownMenu";
import LabeledInput from "@components/labeledInput";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import HomeIcon from "@components/icons/HomeIcon.svg";
import PersonIcon from "@assets/icons/PersonIcon.svg";
import CalenderIcon from "@assets/icons/CalenderIcon.svg";
import DunbellIcon from "@assets/icons/DunbellIcon.svg";
import PlotIcon from "@assets/icons/PlotIcon.svg";
import { useWindowDimensions } from "react-native";
import ClassList from "@components/classList";
import { StatusBar } from "expo-status-bar";



function QrComponent() {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.qrContainer}>
      <View style={styles.qrBox}>
        <Image
          source={require("@assets/myQR.png")}
          style={[styles.image, { height: width * 201 / 390 }]}
        />
        <View style={styles.textContainer}>
          <View style={styles.textTitle}>
            <Text style={{
              height: 23, fontWeight: "700",
              fontSize: 18,
              lineHeight: 23
            }}>QR Placeholder</Text>
          </View>
          <View style={styles.textSubTitle}>
            <Text
              style={{
                height: 48,
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 24,
                color: "#706682"
              }}
            >
              Show this to your instructor to mark your attendance</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function UserDashboard() {
  return (
      <View
        style={styles.container}
      >
        <HeaderBar
          title="Your QR Code"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => router.back()}
        />
        <QrComponent />
        <View style={styles.classListWrapper}>
          <ClassList date={new Date()} variant="status" />
        </View>

      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    height: 844,
    minHeight: 844,
    backgroundColor:"#FAFAFA"
  },
  qrContainer: {
    padding: 16,
  },
  qrBox: {
    alignSelf: "center",
    width: "100%",

  },
  image: {
    width: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  textContainer: {
    height: 107,
    minWidth: 288,
    paddingVertical: 16,
    gap: 4,
  },
  textTitle: {
    height: 23
  },
  textSubTitle: {
    flexDirection: "row",
    height: 48,
    justifyContent: "space-between",

  },
  classListWrapper: {
    flex: 1,

  },
})


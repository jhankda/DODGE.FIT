import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "../../../assets/icons/arrowLeft.svg";
import ScrollMenu from "../../../assets/icons/ScrollMenu.svg";
import DropdownInput from "../../../../components/dropDownMenu";
import LabeledInput from "../../../components/labeledInput";
import HeaderBar from "../../../components/HeaderBar";
import ContinueButton from "../../../components/WideButton";
import KeyboardWrapper from "../../../components/FormScreen";
import HomeIcon from "../../assets/icons/HomeIcon.svg"
import PersonIcon from "../../../assets/icons/PersonIcon.svg"
import CalenderIcon from "../../../assets/icons/CalenderIcon.svg"
import DunbellIcon from "/../../../assets/icons/DunbellIcon.svg"
import PlotIcon from "/../../../assets/icons/PlotIcon.svg"

import { StatusBar } from "expo-status-bar";

export default function UserDashboard() {
  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      > 
      <HeaderBar
      title="Dodge.fit"
      RightIcon={<PersonIcon width={24} height={24} fill={"#120F1A"} />}
      />``
      

      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container:{
    height:1674,
  }
})

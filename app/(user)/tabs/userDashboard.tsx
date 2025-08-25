import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "../../../assets/icons/arrowLeft.svg";
import ScrollMenu from "../../../assets/icons/ScrollMenu.svg";
import DropdownInput from "../../../components/dropDownMenu";
import LabeledInput from "../../../components/labeledInput";
import HeaderBar from "../../../components/HeaderBar";
import ContinueButton from "../../../components/WideButton";
import KeyboardWrapper from "../../../components/FormScreen";
import HomeIcon from "../../../assets/icons/HomeIcon.svg"
import PersonIcon from "../../../assets/icons/PersonIcon.svg"
import CalenderIcon from "../../../assets/icons/CalenderIcon.svg"
import DunbellIcon from "../../../assets/icons/DunbellIcon.svg"
import PlotIcon from "../../../assets/icons/PlotIcon.svg"
import Applate from "../../../components/Applate";

import App from "../../../App";
const router = useRouter()

export default function UserDashboard() {
  return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Dodge.fit"
          RightIcon={<PersonIcon width={24} height={24} fill={"#120F1A"} />}
          onRightPress={() => router.replace('./Profile')}
        />

        <View style={{width:"auto",height:218,maxHeight:218, backgroundColor:"#D9D9D9"}}>
          <Image
          source={require("../../../assets/banner.png")}
          style={{height:218,minHeight:218,resizeMode:"contain",alignSelf:"center"}}
          />
        </View>

        <View style={{height:60,paddingTop:20,paddingHorizontal:16,paddingVertical:12}}>
          <Text style={{width:358,height:28,fontWeight:"700",fontSize:22,lineHeight:28}}>
            Good Morning, Rana
          </Text>
        </View>

        <Applate/>
    


      </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 1674,
  }
})
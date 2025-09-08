import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import ScrollMenu from "@assets/icons/ScrollMenu.svg";
import DropdownInput from "@components/dropDownMenu";
import LabeledInput from "@components/labeledInput";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import HomeIcon from "@assets/icons/HomeIcon.svg"
import PersonIcon from "@assets/icons/PersonIcon.svg"
import CalenderIcon from "@assets/icons/CalenderIcon.svg"
import DunbellIcon from "@assets/icons/DunbellIcon.svg"
import PlotIcon from "@assets/icons/PlotIcon.svg"
import ClassCalendar from "@components/classCalendar";
import RoleSelector from "@components/RoleSelector";
import BillIcon from "@assets/icons/billIcon.svg"
import CallIcon from "@assets/icons/billIcon.svg"
import MessageIcon from "@assets/icons/messageIcon.svg";
import CrossIcon from "@assets/icons/crossIcon.svg";

export default function Logout() {
  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title=""
          RightIcon={<CrossIcon />}
        />
        <View className="h-[88px] pt-5 px-4 pb-2 ">
          <Text className="  h-15 font-bold text-2xl leading-15 text-custom-blue">Are you sure you want to log out?</Text>
        </View>
        <ContinueButton
          title="Log Out"
          gradient
        />
        <ContinueButton
          title="Cancel"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => undefined}
        />
      </ScrollView>
    </KeyboardWrapper>
  )
}
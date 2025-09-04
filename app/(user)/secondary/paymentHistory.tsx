import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
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


const role  = ["Last 30 Days","June 2025","Custom Range"];

export default function PaymentHistory() {
  const [selectedFilter,setSelectedFilter] = useState<string>("Last 30 Days")
  const router = useRouter();

  const PaymentList = ()=>{
    return(
      <View className="flex-row py-3 px-4 justify-between">
        <View className="flex-row gap-4">
          <View className="h-12 w-12 justify-center items-center bg-custom-icon-bg rounded-lg">
            <BillIcon className="h-6 w-6"/>
          </View>
          <View>

          <Text className="h-6 font-sans font-medium text-base leading-6 text-custom-blue">Price</Text>
          <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">date</Text>
          <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">3rd</Text>
          </View>

        </View>
        <Text className="font-sans text-custom-green-dot font-normal text-base leading-6 h-6">Succesful</Text>
      </View>
    )
  }

  return (
    <KeyboardWrapper>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >

        <HeaderBar
          title="Payment History"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={()=>router.canGoBack()?router.back():undefined}
        />

        <RoleSelector
        roles={role}
        selectedRole={selectedFilter}
        onSelect={setSelectedFilter}
        />
        <PaymentList/>

        

        

      </ScrollView >
    </KeyboardWrapper>


  )
}
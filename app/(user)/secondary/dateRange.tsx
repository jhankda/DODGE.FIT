import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter , useLocalSearchParams} from "expo-router";
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

import { StatusBar } from "expo-status-bar";

type FilterType = "1Week" | "July 2025" | "June 2025" | "Custom Range"
const Filters: FilterType[] = ["1Week", "July 2025", "June 2025", "Custom Range"]

type params = {
  RoleList:string[],
  RoleIcon:string[],
  backPath:string
}

export default function DateRange() {
  const parmas  = useLocalSearchParams<{RoleList:string[], backPath:string}>()
  const [selectedType, setSelectedType] = useState<"1Week" | "July 2025" | "June 2025" | "Custom Range">("1Week")
  const router = useRouter()
  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Date Range"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => { if (router.canGoBack()) router.back() }}
        />

        <ClassCalendar
          notList />
        <ClassCalendar
          notList />

        <View className="py-3">

          <RoleSelector
            roles={Filters}
            selectedRole={selectedType}
            onSelect={setSelectedType}
          />
        </View>

        <ContinueButton
          title="Apply Filter"
          gradient
        />





      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {

  }
})


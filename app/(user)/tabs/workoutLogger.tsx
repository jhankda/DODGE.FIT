import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import ScrollMenu from "@assets/icons/ScrollMenu.svg";
import DropdownInput from "@components/dropDownMenu";
import LabeledInput from "@components/labeledInput";
import HeaderBar from "@components/HeaderBar";
import KeyboardWrapper from "@components/FormScreen";
import HomeIcon from "@assets/icons/HomeIcon.svg"
import PersonIcon from "@assets/icons/PersonIcon.svg"
import CalenderIcon from "@assets/icons/CalenderIcon.svg"
import DunbellIcon from "@assets/icons/DunbellIcon.svg"
import PlotIcon from "@assets/icons/PlotIcon.svg"
import ContinueButton from "@components/WideButton";

import { StatusBar } from "expo-status-bar";
import { formatClassTime } from "@utils/filterByStatus";
import RoleSelector from "@components/RoleSelector";

type ExerciseType = "All" | "Arms" | "Legs" | "Chest" | "Back"
const exerciseTypes: ExerciseType[] = ["All", "Arms", "Legs", "Chest", "Back"]

export default function WorkoutLogger() {
  const [selectedType, setSelectedType] = useState<"All" | "Arms" | "Legs" | "Chest" | "Back">("All")

  const date = new Date().toISOString()
  const longDate = formatClassTime(date, date, 'longDate')
  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Workout Logger"
        />

        <Text className="pt-1 px-4 pb-3 h-37 font-sans font-normal text-sm leading-[21px] text-center ">{longDate}</Text>

        <View className="h-[56px]">

          <RoleSelector
            roles={exerciseTypes}
            selectedRole={selectedType}
            onSelect={setSelectedType}
          />
        </View>
    <View className="h-16 py-3">

        <ContinueButton
          title="+ Add Exercise to Log"
          gradient
          />
          </View>

      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 1674,
  }
})


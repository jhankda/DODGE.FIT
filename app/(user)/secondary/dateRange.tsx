import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import ClassCalendar from "@components/classCalendar";
import RoleSelector from "@components/RoleSelector";


type FilterType = "1Week" | "July 2025" | "June 2025" | "Custom Range"
const Filters: FilterType[] = ["1Week", "July 2025", "June 2025", "Custom Range"]


export default function DateRange() {
  const parmas = useLocalSearchParams<{ RoleList?: string[], backPath: string }>()
  const [selectedType, setSelectedType] = useState<"1Week" | "July 2025" | "June 2025" | "Custom Range">("1Week")
  const [selectedStartDate,setSelectedStartDate]  = useState<string>()
  const [selectedEndDate,setSelectedEndDate]  = useState<string>()
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
        onPress={setSelectedStartDate}
          notList
           />
        <ClassCalendar
        onPress={setSelectedEndDate}
          notList />

        <View className="py-3">

          <RoleSelector
            roles={Filters.map((role) => ({ label: role }))}
            selectedRole={selectedType}
            onSelect={setSelectedType}
          />
        </View>

        <ContinueButton
          title="Apply Filter"
          gradient
          onPress={()=>{
            router.push({
              pathname:parmas.backPath,
              params:{selectedStartDate,selectedEndDate}
            })
          }}
        />





      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {

  }
})


import React, { } from "react";
import { View, Text, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import HeaderBar from "@components/HeaderBar";
import KeyboardWrapper from "@components/FormScreen";
import SmallButton from "@components/smallButton";

const AttendanceList  = ()=>{
  return(
    <View className="py-3 px-4 flex-row justify-between">
      <View>
        <Text className="h-6 font-sans font-medium text-base leading-6 text-custom-blue">Monday, 15 July 2025</Text>
        <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">Strngth Training Beginner</Text>
        <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">Coach Roahan Verma</Text>
      </View>
      <View className="flex-row h-7 w-7">
        <View className="h-3 w-3 rounded-md bg-custom-green"></View>
      </View>

    </View>
  )
}



export default function AttendanceDetails() {
  const router = useRouter()
  const box = 'rounded-xl border p-6 gap-2 flex-1 min-w-[158px] border-custom-border-gray2'
  const text1  = "h-6 font-sans font-medium text-base leading-6 text-custom-blue";
  const text2  ="h-[30px] font-sans font-bold text-2xl text-custom-blue leading-[30px]";


  return (
    <KeyboardWrapper>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Attendance Details"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
        />

        <View className="px-4 pt-4 pb-2 ">
          <Text className="h-[23px] font-bold text-lg leading-[23px] text-custom-blue">Summary</Text>
        </View>

        <View className="p-4 gap-4 flex-row flex-wrap">
          
          <View className={box}>
            <Text className={text1}>Total Classes</Text>
            <Text className={text2}>34</Text>
          
          </View>
          <View className={box}>
            <Text className={text1}>Present</Text>
            <Text className={text2}>34</Text>
          
          </View>
          <View className={box}>
            <Text className={text1}>Absent</Text>
            <Text className={text2}>34</Text>
          </View>
        </View>

        <Text className="p-4 pb-2 font-sans font-bold text-lg leading-[23px] text-custom-blue">Filter</Text>

        <View className="flex-row flex-1 gap-3 py-3 px-4">
          <View>

          <SmallButton
          title="Filter By Date"
          onPress={()=>{router.push('../secondary/dateRange')}}/>

          </View>
          <View>

          <SmallButton
          title="june1-july,2025"
          gradient
          onPress={undefined}/>
          </View>
        </View>

        <Text className="p-4 pb-2 font-sans font-bold text-lg leading-[23px] text-custom-blue">Attendance Log</Text>
        <AttendanceList/>
        <AttendanceList/>
        <AttendanceList/>

      </ScrollView>
    </KeyboardWrapper>

  )
}

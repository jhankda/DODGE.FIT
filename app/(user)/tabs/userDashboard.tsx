import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import HeaderBar from "@components/HeaderBar";
import {PersonIcon} from "@assets/icons/icons";
import Applate from "@components/Applate";
import WeeklyChart from "@components/barChart";

const router = useRouter()
export default function UserDashboard() {
  const box = 'rounded-xl border p-6 gap-2 flex-1 min-w-[158px] border-custom-border-gray2'
  const text1 = "w-[121px] font-sans font-medium text-base leading-6 text-custom-blue";
  const text2 = "h-[30px] font-sans font-bold text-2xl text-custom-blue leading-[30px]";
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar
        title="Dodge.fit"
        RightIcon={<PersonIcon width={24} height={24} fill={"#120F1A"} />}
        onRightPress={() => router.replace('./Profile')}
      />

      <View style={{ width: "auto", height: 218, maxHeight: 218, backgroundColor: "#D9D9D9" }}>
        <Image
          source={require("../../../assets/banner.png")}
          style={{ height: 218, minHeight: 218, resizeMode: "contain", alignSelf: "center" }}
        />
      </View>

      <View style={{ height: 60, paddingTop: 20, paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ width: 358, height: 28, fontWeight: "700", fontSize: 22, lineHeight: 28 }}>
          Good Morning, Rana
        </Text>
      </View>

      <Applate />

      <View className="p-4">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="h-[21px] font-sans text-sm font-normal leading-[21px] text-custom-purple2">Next Classes</Text>
            <Text className="h-5 text-base font-bold font-sans leading-5 text-custom-text-dark">FootBall Training</Text>
            <Text className="h-[21px] font-sans text-sm font-normal leading-[21px] text-custom-purple2">6:00 PM | Coach: Ethan</Text>
          </View>
          <Image
            source={{ uri: '' }}
            className="w-[130px] h-[70] rounded-xl bg-custom-icon-bg"
          />
        </View>
      </View>

      <View className="pt-5 pb-3 px-4">
        <Text className="h-7 font-sans font-bold text-[22px] leading-7 text-custom-text-dark">This Week's Summary</Text>

      </View>


      <View className="p-4 gap-4 flex-row flex-wrap">

        <View className={box}>
          <Text className={text1}>Days Attended</Text>
          <Text className={text2}>3/5</Text>

        </View>
        <View className={box}>
          <Text className={text1}>Workouts Logged</Text>
          <Text className={text2}>2</Text>

        </View>
        <View className={box}>
          <Text className={text1}>Total Hours</Text>
          <Text className={text2}>4.5h</Text>
        </View>
      </View>

      <WeeklyChart
        variant="dashboard"
        data={[
          { label: "Mon", value: 1 },
          { label: "Tue", value: 0.8 },
          { label: "Wed", value: 1.2 },
          { label: "Thu", value: 0.6 },
          { label: "Fri", value: 0.9 },
          { label: "Sat", value: 1 },
          { label: "Sun", value: 0.7 },
        ]}
      />
      
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 1674,
  }
})
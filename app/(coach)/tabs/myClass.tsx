import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import { HeaderBar, ItemList,SmallButton } from "@components/index";
import { useCoachClasses } from "@hooks/useCoachClasses";
import { ArrowRightWhite } from "@assets/icons/icons";

export default function myClass() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "present" |"past">("upcoming");
  return (
    <View style={styles.container}
    >

      <HeaderBar
        title="Your Class" />

      <View style={styles.subContainer}>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "past" && styles.activeTab]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && styles.activeTabText,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "present" && styles.activeTab]}
            onPress={() => setActiveTab("present")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "present" && styles.activeTabText,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View className="p-4">
          <View className="flex-row justify-between rounded-xl ">
              <View className="gap-0.5 flex-1">
                <View className="gap-1">
                  <Text className="h-5 font-sans font-bold text-base leading-5 text-custom-heading">Batch A - Yoga</Text>
                  <Text className="h-[42px] font-normal font-sans text-sm leading-[21px] text-custom-purple4">08:00 AM - 09:00 AM · Gym Hall A · 12 Enrolled</Text>
                </View>
                <View>
                <SmallButton
                title="View Details"
                leftIcon={<ArrowRightWhite/>}
                gradient
                />
                </View>
              </View>
              <View>

              <Image
              source={{uri:''}}
              className="rounded-xl bg-custom-icon-bg w-[130px] h-[114px]"
              />
              </View>
          </View>
        </View> */}
        {<ItemList role="coach" filter={activeTab}/>}
        {/* {activeTab === "upcoming" ? <ItemList filter="upcoming" /> : (activeTab==="past")?<ItemList filter="past"/> : <ItemList filter="present"/>} */}
      </View>

      <View className="h-5"/>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 844,
    flexGrow: 1
  },
  subContainer: { flex: 1, backgroundColor: "#FAFAFA" },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap: 20,
    paddingHorizontal: 16,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#888",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTab: {
    // borderStartWidth:10,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
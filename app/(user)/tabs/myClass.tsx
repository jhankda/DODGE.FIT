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

import { StatusBar } from "expo-status-bar";

const UpcomingPage = () => (
  <View style={styles.page}>
    
  </View>
);

const PastPage = () => (
  <View style={styles.page}>
    <Text>✅ Past Classes here</Text>
  </View>
);

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="My Classes"
          RightIcon={<CalenderIcon width={24} height={24} fill={"#120F1A"} />}
        />

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
          </View>

          {activeTab === "upcoming" ? <UpcomingPage /> : <PastPage />}
        </View>


      </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 844,
    flexGrow:1
  },
  subContainer: { flex: 1, backgroundColor: "#FAFAFA" },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap:20,
    paddingHorizontal:16,
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

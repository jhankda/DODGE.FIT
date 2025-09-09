import React, {  useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {HeaderBar,ItemList} from "@components/index";
import {CalenderIcon} from "@assets/icons/icons"



export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const router  = useRouter()
  return (
    <View
      style={styles.container}
    >
      <HeaderBar
        title="My Classes"
        RightIcon={<CalenderIcon width={24} height={24} fill={"#120F1A"} />}
        onRightPress={()=>router.push('../secondary/calenderView')}
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

        {activeTab === "upcoming" ? <ItemList  filter="upcoming" /> : <ItemList filter="past" />}
      </View>


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 844,
    flexGrow: 1
  },
  subContainer: { flex: 1 , backgroundColor: "#FAFAFA" },
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

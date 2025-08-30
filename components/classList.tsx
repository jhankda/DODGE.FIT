import { View, Text, StyleSheet, SectionList } from "react-native";
import React, { useState, useEffect } from "react";
import ClockIcon from "@assets/icons/ClockIcon.svg"
import TrueIcon from "@assets/icons/TrueIcon.svg"
import FalseIcon from "@assets/icons/FalseIcon.svg"
import { getIconComponent } from "@utils/getIconComponent";

interface Class {
  id: string;
  name: string;
  time: string;
  date: string;
  status: "upcoming" | "past";
  attended: boolean | "null";
  icon: string;
  coach?: string;
}

interface ClassListProps {
  date: Date;
  variant?: "status" | "coach";
}

const fetchClasses = async (date: Date): Promise<Class[]> => {
  return [
    {
      id: "1",
      name: "Strength Training",
      time: "10:00 AM",
      date: date.toISOString(),
      status: "upcoming",
      attended: false,
      icon: "boxing",
      coach: "Alex",
    },
    {
      id: "10",
      name: "Strength Training",
      time: "10:00 AM",
      date: date.toISOString(),
      status: "upcoming",
      attended: false,
      icon: "boxing",
      coach: "Alex",
    },
    {
      id: "2",
      name: "Yoga Flow",
      time: "12:00 PM",
      date: date.toISOString(),
      status: "past",
      attended: true,
      icon: "yoga",
      coach: "Sarah",
    },
    {
      id: "3",
      name: "Cardio Blast",
      time: "6:00 PM",
      date: date.toISOString(),
      status: "past",
      attended: false,
      icon: "swim",
      coach: "Mike",
    },
    {
      id: "5",
      name: "Cardio Blast",
      time: "6:00 PM",
      date: date.toISOString(),
      status: "past",
      attended: false,
      icon: "swim",
      coach: "Mike",
    },
    {
      id: "6",
      name: "Cardio Blast",
      time: "6:00 PM",
      date: date.toISOString(),
      status: "past",
      attended: false,
      icon: "boxing",
      coach: "Mike",
    },
    {
      id: "7",
      name: "Cardio Blast",
      time: "6:00 PM",
      date: date.toISOString(),
      status: "past",
      attended: false,
      icon: "swim",
      coach: "Mike",
    },
  ];
};

export default function ClassList({ date, variant = "status" }: ClassListProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [icons, setIcons] = useState<Record<string, React.FC<any>>>({});

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchClasses(date);
      setClasses(data);

      const loadedIcons: Record<string, React.FC<any>> = {};
      for (const c of data) {
        if (!icons[c.icon]) {
          const comp = await getIconComponent(c.icon);
          if (comp) loadedIcons[c.icon] = comp;
        }
      }
      setIcons((prev) => ({ ...prev, ...loadedIcons }));
    };
    loadData();
  }, [date]);

  const renderItem = ({ item }: { item: Class }) => {
    const LeftIcon = icons[item.icon];

    let RightComponent = null;
    if (variant === "status") {
      if (item.status === "upcoming") RightComponent = <ClockIcon />;
      else if (item.status === "past") {
        RightComponent = item.attended ? <TrueIcon /> : <FalseIcon />;
      }
    } else if (variant === "coach") {
      RightComponent = (
        <Text style={styles.coachName}>Coach: {item.coach}</Text>
      );
    }

    return (
      <View style={styles.row}>
        <View style={{ height: 48, width: 48, borderRadius: 8, backgroundColor: "#F2F2F5", justifyContent: "center" }}>
          {LeftIcon ? <LeftIcon width={32} height={32} alignContent={"center"} alignSelf={"center"} /> : <View style={{ width: 32, height: 32 }} />}
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.classTime}>{item.time}</Text>
        </View>
        {RightComponent}
      </View>
    );
  };
  const sections = variant == "status" ?
    [{ title: "Upcoming Classes", data: classes.filter((c) => c.status === "upcoming") },
    { title: "Past Classes", data: classes.filter((c) => c.status === "past") },]
    :
    [{ title: date.toDateString(), data: classes }]

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
      )}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}   // 👈 force it to fill parent View
      contentContainerStyle={{ paddingBottom: 20 }} // extra space at bottom

    />
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: "700",
    fontSize: 18,
    color: "#121217",
  },
  row: {
    flexDirection: "row",
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  className: { fontSize: 16, fontWeight: "500" },
  classTime: { fontSize: 14, color: "gray" },
  coachName: { fontSize: 14, color: "#555" },
});

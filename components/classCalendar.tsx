// components/ClassCalendar.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import LeftIcon from '@assets/icons/leftIcon.svg'
import RightIcon from '@assets/icons/rightIcon.svg'
import ClassList from "./classList";

export default function ClassCalendar() {
  const [sDate, setSDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setSDate(new Date(day.timestamp));
  };

  return (
    <View style={{ flex: 1,backgroundColor:"#ffffff", padding: 16 }}>
      {/* Calendar stays fixed at top */}
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "#C2B2E5",
            selectedTextColor: "#000",
          },
        }}
        theme={{
          monthTextColor: "#141217",
          arrowColor: "#141217",
          todayTextColor: "#088745",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "700",
          backgroundColor:"#FAFAFA"
          
        }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <LeftIcon width={20} height={20} color="#141217" />
          ) : (
            <RightIcon width={20} height={20} color="#141217" />
          )
        }
      />

      {/* Make only the list scrollable */}
      <View style={{ flex: 1 }}>
        {selectedDate !== "" && <ClassList date={sDate} variant="coach" />}
      </View>
    </View>
  );
}

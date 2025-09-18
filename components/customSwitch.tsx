import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  value: boolean;              // true = Present, false = Absent
  onToggle: () => void;
};

const AttendanceSwitch: React.FC<Props> = ({ value, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={{
        width: 51,
        height: 31,
        borderRadius: 16,
        backgroundColor: value ? "#088745" : "#F44336", // green/red
        justifyContent: "center",
        paddingHorizontal: 2,
      }}
    >
      <View
        style={{
          width: 27,
          height: 27,
          borderRadius: 14,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: value ? "flex-end" : "flex-start",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 3, 
        }}
      >
        <Text style={{ fontWeight: "bold", color: value ? "#088745" : "#F44336" }}>
          {value ? "P" : "A"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AttendanceSwitch
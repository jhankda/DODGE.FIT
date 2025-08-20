import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// ✅ Reusable Plate Component
interface PlateProps {
  title: string;
  image: any;
  onPress: () => void;
}

const Plate: React.FC<PlateProps> = ({ title, image, onPress }) => {
  const { width } = useWindowDimensions();
  const plateWidth = (width - 16 * 2 - 12) / 2; // 2 per row, padding + gap

  return (
    <TouchableOpacity
      style={[styles.plate, { width: plateWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.textConatiner}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ✅ Main Screen
export default function Applate() {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Plate
          title="Scan QR to Mark Attendance"
          image={require("../assets/QR.png")}
          onPress={() => console.log("QR clicked")}
        />
        <Plate
          title="Track Progress"
          image={require("../assets/progress.png")}
          onPress={() => console.log("Progress clicked")}
        />
      </View>

      <View style={styles.rowContainer}>
        <Plate
          title="View Roster"
          image={require("../assets/Roaster.png")}
          onPress={() => console.log("Roster clicked")}
        />
        <Plate
          title="Check Calendar"
          image={require("../assets/Calender.png")}
          onPress={() => console.log("Calendar clicked")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 510,
    padding: 16,
    gap: 12,
  },
  rowContainer: {
    flexDirection: "row",
    height: 245,
    gap: 12,
  },
  plate: {
    aspectRatio:1,
    paddingBottom: 12,
    gap: 12,
  },
  image: {
    height: 173,
    aspectRatio: 1,
    borderRadius: 12,
  },
  textConatiner: {
    height: 48,
  },
  text: {
    height: 48,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#121217",
  },
});

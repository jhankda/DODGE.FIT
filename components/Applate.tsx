import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";

interface PlateProps {
  title: string;
  image: any;
  subtitle?: string,
  onPress: () => void;
}

const router = useRouter()

const Plate: React.FC<PlateProps> = ({ title, image, subtitle, onPress }) => {
  const { width } = useWindowDimensions();
  const plateWidth = (width - 16 * 2 - 12) / 2;

  return (
    <TouchableOpacity
      style={[styles.plate, { width: plateWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Square container */}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textConatiner}>
        <Text style={styles.text}>{title}</Text>
        {subtitle && <Text style={{ height: 21, fontWeight: "400", fontSize: 14, lineHeight: 21 }}>
          {subtitle}
        </Text>}
      </View>
    </TouchableOpacity>
  );
};

export default function Applate() {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Plate
          title="Scan QR to Mark Attendance"
          image={require("../assets/QR.png")}
          onPress={() => router.push('../secondary/myQR')}
        />

        <Plate
          subtitle="3 upcoming"
          title="My Classes"
          image={require("../assets/Calender.png")}
          onPress={() => router.replace("./myClass")}
        />
      </View>

      <View style={styles.rowContainer}>
        <Plate
          title="Workout Log"
          image={require("../assets/progress.png")}
          onPress={() => console.log("Progress clicked")}
        />
        <Plate
          title="KPIs Coming Soon"
          image={require("../assets/Roaster.png")}
          onPress={() => console.log("Roster clicked")}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  plate: {
    width: "50%",
    paddingBottom: 12,
    gap: 12,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1, 
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textConatiner: {
    height: 48,
    justifyContent: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#121217",
  },
});

import { View, Text } from "react-native";

type ChartData = {
  label: string;
  value: number; 
};

type WeeklyChartProps = {
  data: ChartData[];
  variant?: "dashboard" | "workout";
};

export default function WeeklyChart({
  data,
  variant = "dashboard",
}: WeeklyChartProps) {
  const isWorkout = variant === "workout";

  return (
    <View
      className={`
        ${isWorkout ? "px-4 py-6 w-[390px] h-[311px]" : "px-4 py-6 w-[390px] h-[261px]"}
      `}
    >
      <View
        className={`
          flex-col ${isWorkout ? "p-6 border border-[#D9D4E3] rounded-xl" : ""}
        `}
      >
        {/* Title */}
        <Text
          className={`
            text-base font-medium mb-2
            ${isWorkout ? "text-[#120F1A]" : "text-[#121217]"}
          `}
        >
          {isWorkout ? "Workout History" : "Weekly Consistency"}
        </Text>

        {/* Bars */}
        <View className="flex-row justify-between px-3">
          {data.map((item, index) => (
            <View key={index} className="items-center justify-end">
              {/* Bar */}
              <View
                className={`
                  border-t-[2px] mb-2
                  ${isWorkout ? "bg-[#EDE8F2] border-[#757575]" : "bg-[#F2F2F5] border-[#757575]"}
                `}
                style={{
                  width: isWorkout ? 36 : 28,
                  height: 137 * item.value, 
                }}
              />

              {/* Label */}
              <Text
                className={`
                  text-[13px] font-bold
                  ${isWorkout ? "text-[#69598C]" : "text-[#706685]"}
                `}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

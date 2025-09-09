import React, {  useState } from "react";
import { View, Text, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {HeaderBar, KeyboardWrapper, WeeklyChart, RoleSelector} from "@components/index";
import {CalenderIcon, ArmsIcon, LegsIcon, BackIcon} from "@assets/icons/icons"
import { useFetchWorkoutList } from "@hooks/useUser";


export default function Progress() {

  const [selectedType, setSelectedType] = useState<string>('')
  const router = useRouter()
  const { data, isPending, error } = useFetchWorkoutList()

  return (
    <KeyboardWrapper>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBar
          title="Progress"
          RightIcon={<CalenderIcon width={24} height={24} fill={"#120F1A"} />}
          onRightPress={() => { router.push({
            pathname:'../secondary/dateRange',
            params:{backPath:'../secondary/progressFilter'}
          }) }}
        />

        <View className="h-15 px-4 pt-5 pb-3">
          <Text className="h-7 font-bold text-[22px] leading-7  font-sans">Your Workout History</Text>
        </View>



        <WeeklyChart
          variant="workout"
          data={[
            { label: "Jul 19", value: 1 },
            { label: "Jul 20", value: 0.8 },
            { label: "Jul 21", value: 1.2 },
            { label: "Jul 22", value: 0.6 },
            { label: "Jul 23", value: 0.9 },
          ]}
        />

        <View className="h-15 px-4 pt-5 pb-3">
          <Text className="h-7 font-bold text-[22px] leading-7  font-sans">Muscle Groups Trained</Text>
        </View>

        <RoleSelector
          roles={[
            { label: 'Arms-', icon: <ArmsIcon /> },
            { label: 'Back-', icon: <BackIcon /> },
            { label: 'Legs-', icon: <LegsIcon /> },
            { label: 'Core-' },
            { label: 'Cardio-', icon: <BackIcon /> }
          ]}
          selectedRole={selectedType}
          onSelect={setSelectedType}
        />

        <View className="h-15 px-4 pt-5 pb-3">
          <Text className="h-7 font-bold text-[22px] leading-7  font-sans">Past Workouts</Text>
        </View>

        {data?.workList.map((log) => {
          const lastMuscleGroup  = log.workout[0]
          const lastExercise  = lastMuscleGroup.exercises[0]
          return (
        <View 
        key={log.id}
        className="flex-row min-h-[72px] gap-4 py-2 px-4">
          <View>
            <Text className="h-6 font-medium text-base leading-6 font-sans">{log.date}</Text>
            <Text className="h-[21px] text-sm font-normal leading-[21px] text-custom-purple1">
              • {lastMuscleGroup.name} - {lastExercise.name} - {lastExercise.sets}x{lastExercise.reps} @ {lastExercise.weight}
            </Text>
          </View>
        </View>
          )
        })}








      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {

  }
})


import React, { useState } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {HeaderBar, KeyboardWrapper, ContinueButton, RoleSelector} from "@components/index";
import {PencilIcon} from "@assets/icons/icons";
import { formatClassTime } from "@utils/filterByStatus";
import { Exercise } from "@schemas/user.schema";
import { useFetchWorkout } from "@hooks/useUser";

type ExerciseType = "All" | "Arms" | "Legs" | "Chest" | "Back";
const exerciseTypes: ExerciseType[] = ["All", "Arms", "Legs", "Chest", "Back"];

export default function WorkoutLogger() {
  const [selectedType, setSelectedType] = useState<ExerciseType>("All");
  const router = useRouter();
  const date = new Date().toISOString();
  const longDate = formatClassTime(date, date, 'longDate');
  const { data, isLoading, error } = useFetchWorkout();

  const HandleEdit = (item:Exercise,MuscleGrouP:string)=>{
    router.push({
      pathname:'/secondary/addExercise',
      params:{...item,muscleGroupName:MuscleGrouP}
    })
  }

  const sections = data?.workout
  .filter(mg => selectedType === "All" || selectedType === mg.name)
  .map(mg => ({
    title: mg.name,
    data: mg.exercises,
  })) || [];



  const renderItem = ({ item,section }: { item: Exercise,section:{title:string} }) => (
    <View className="flex-row min-h-[72px] items-center justify-between px-4 py-2">
      <View>
        <Text className="h-6 font-sans font-medium text-base leading-6 text-custom-blue">{item.name}</Text>
        <Text className='h-[21px] font-sans font-normal text-sm text-custom-purple1 leading-[21px]'>{item.sets}x{item.reps}@{item.weight || 0}kg</Text>
      </View>
      <TouchableOpacity 
      onPress={()=>HandleEdit(item,section.title)}
      className="flex-row justify-center items-center flex-0 h-7 w-7">
        <PencilIcon className='w-6 h-6 self-center' />
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = (title: string) => (
    <View className="px-4 pt-5 pb-3">
      <Text className="h-7 font-sans text-[22px] leading-7 text-custom-blue font-bold">{title}</Text>
    </View>
  );

  const ListHeader = () => (
    <>
      <Text className="pt-1 px-4 pb-3 font-sans font-normal text-sm leading-[21px] text-center">{longDate}</Text>
      <View className="h-[56px]">
        <RoleSelector
          roles={exerciseTypes.map((type) => ({ label: type }))}
          selectedRole={selectedType}
          onSelect={setSelectedType}
        />
      </View>
      <View className="h-16 py-3">
        <ContinueButton
          title="+ Add Exercise to Log"
          gradient
          onPress={() => { router.push('../secondary/addExercise'); }}
        />
      </View>
    </>
  );

  return (
    <KeyboardWrapper style={{ flex: 1 }}>
      <HeaderBar title="Workout Logger" />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => renderSectionHeader(title)}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </KeyboardWrapper>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
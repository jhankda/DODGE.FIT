import React from "react";
import { View, Text, SectionList, StyleSheet, } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {ArrowLeft, CalenderIcon, DumbellIcon, EngineIcon} from "@assets/icons/icons";
import HeaderBar from "@components/HeaderBar";
import KeyboardWrapper from "@components/FormScreen";
import RoleSelector from "@components/RoleSelector";
import { MuscleGroup } from "@schemas/user.schema";
import { useFetchWorkoutList } from "@hooks/useUser";

export default function UserDashboard() {
  const params: { selectedStartDate: string, selectedEndDate: string } = useLocalSearchParams()
  const router = useRouter()
  const { data, isPending, error } = useFetchWorkoutList()

  const sections = data?.workList
    .map(mg => ({
      title: mg.date,
      data: mg.workout,
    })) || [];

  const sectionHeader = (title:string) => {
    return (
      <View className="pt-5 pb-3 px-4">
        <Text className="h-7 font-bold font-sans text-[22px] leading-7 text-custom-blue">{title}</Text>
      </View>
    )
  }
  const renderItem = ({item}:{item:MuscleGroup}) => {
    return item.exercises.map((Exercise)=>{
      return (
        <View 
        key={Exercise.id}
        className="flex-row px-4 py-3 justify-between">
  
          <View className="flex-1">
            <Text className="h-6 font-medium text-base leading-6 text-custom-blue">{item.name}</Text>
            <Text className="h-[21px] text-sm font-normal font-sans leading-[px] text-custom-purple3">{Exercise.name}</Text>
            <Text className="h-[21px] text-sm font-normal font-sans leading-[px] text-custom-purple3">{Exercise.sets} x {Exercise.reps} @ {Exercise.weight}</Text>
          </View>
  
          <View>
            <Text className="h-[21px] text-sm font-normal font-sans leading-[px] text-custom-purple3">{Exercise.time}</Text>
          </View>
  
        </View>
      )
    })
  }

  const ListHeader = () => {
    return (
      <>

        <View className="pt-1 pb-3 px-4 ">
          <Text className="h-[21px] font-normal text-sm self-center font-sans leading-[21px] text-custom-purple3">Showing Results for {params.selectedStartDate} - {params.selectedEndDate}</Text>
        </View>

        <RoleSelector
          roles={[
            { label: 'Sessions', icon: <DumbellIcon /> },
            { label: 'exercises', icon: <DumbellIcon /> },
            { label: 'Arms', icon: <EngineIcon /> }
          ]}
          selectedRole={''}
          onSelect={() => { }}
        />

      </>
    )
  }

  return (
    <KeyboardWrapper>

      <HeaderBar
        title="Progress: Filtered"
        RightIcon={<CalenderIcon width={24} height={24} fill={"#120F1A"} />}
        LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
        onLeftPress={() => { if (router.canGoBack()) router.back() }}
        onRightPress={() => { if (router.canGoBack()) router.back() }}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => sectionHeader(title)}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />


    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 1674,
  }
})


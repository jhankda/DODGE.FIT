import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "../../../assets/icons/arrowLeft.svg";
import ScrollMenu from "../../../assets/icons/ScrollMenu.svg";
import DropdownInput from "../../../components/dropDownMenu";
import LabeledInput from "../../../components/labeledInput";
import HeaderBar from "../../../components/HeaderBar";
import ContinueButton from "../../../components/WideButton";
import KeyboardWrapper from "../../../components/FormScreen";
import HomeIcon from "../../../assets/icons/HomeIcon.svg"
import PersonIcon from "../../../assets/icons/PersonIcon.svg"
import CalenderIcon from "../../../assets/icons/CalenderIcon.svg"
import DunbellIcon from "../../../assets/icons/DunbellIcon.svg"
import PlotIcon from "../../../assets/icons/PlotIcon.svg"

import { StatusBar } from "expo-status-bar";
import { formatClassTime } from "@utils/filterByStatus";

export default function AddExercise() {
  const [exerciseName, setExercideName] = useState<string>('')
  const [muscleGroup, setMuscleGroup] = useState<string>('')
  const [sets, setSets] = useState<string>('')
  const [reps, setReps] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [time, setTime] = useState<string>('')

  const muscleGroupRef  = useRef<TextInput>(null)
  const exerciseNameRef  = useRef<TextInput>(null)
  const setsRef  = useRef<TextInput>(null)
  const repsRef  = useRef<TextInput>(null)
  const weightRef  = useRef<TextInput>(null)
  const timeRef  = useRef<TextInput>(null)

  const getTime = ()=>{
    return new Date().toISOString()
  }

  const HandleAddExercise = ()=>{
    
  }

  const router = useRouter()

  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Add to Exercise"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => { if(router.canGoBack())router.back()}}
        />

        <DropdownInput
          label="Muscle Group"
          options={["Legs", "Chest", "Arms"]}
          placeholder="Select Muscle Group"
          icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
          onSelect={(value) => setMuscleGroup(value)}
          


        />
        <DropdownInput
          label="Exercise Name"
          options={["Curls", "Biceps"]}
          placeholder="Select Exercise"
          icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
          onSelect={(value) => setExercideName(value)}


        />

        <LabeledInput
          label="Sets"
          value={sets}
          onChangeText={setSets}
          placeholder="e.g., 3"
        inputRef={setsRef}
        onNext={() => { repsRef.current?.focus() }}
        
        />
        <LabeledInput
          label="Reps"
          value={reps}
          onChangeText={setReps}
          placeholder="e.g., 12"
        inputRef={repsRef}
        onNext={() => { weightRef.current?.focus() }}
        />
        <LabeledInput
          label="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g., 10"
        inputRef={weightRef}
        onNext={() => { timeRef.current?.focus() }}
        // className="flex-0"
        />
        <Text className="font-sans font-normal text-sm px-4 pb-2 text-custom-purple1">Logging for {formatClassTime(getTime(),getTime(),'longDate')}</Text>
        <LabeledInput
          label="Time (Optional)"
          value={time}
          onChangeText={setTime}
          placeholder="Select Time"
        inputRef={timeRef}
        />



        <ContinueButton
          title='Add to Log'
          gradient
           />


      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    // height: 1674,
    flex:0

  }
})

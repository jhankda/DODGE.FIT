import React, {  useRef, useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {ArrowLeft, ScrollMenu} from "@assets/icons/icons";
import DropdownInput from "../../../components/dropDownMenu";
import LabeledInput from "../../../components/labeledInput";
import HeaderBar from "../../../components/HeaderBar";
import ContinueButton from "../../../components/WideButton";
import KeyboardWrapper from "../../../components/FormScreen";
import { Exercise } from "@schemas/user.schema";
import { formatClassTime } from "@utils/filterByStatus";
import { useAddWorkout, useUpdateWorkout } from "@hooks/useUser";

type AddExerciseScreenParams = Partial<{ [K in keyof Exercise]: string }> & {
  muscleGroupName?: string;
};

export default function AddExercise() {
  const { id, ...item } = useLocalSearchParams<AddExerciseScreenParams>()
  const ID = id ? id : '';
  const [exerciseName, setExercideName] = useState<string>(item.name || '')
  const [muscleGroup, setMuscleGroup] = useState<string>(item.muscleGroupName || '')
  const [sets, setSets] = useState<string>(item.sets || '')
  const [reps, setReps] = useState<string>(item.reps || '')
  const [weight, setWeight] = useState<string>(item.weight || '')
  const [time, setTime] = useState<string>(item.time || '')
  const { mutate: addWorkout, isPending, error } = useAddWorkout();
  const { mutate: updateWorkout, isPending: isLoading, error: updateError } = useUpdateWorkout();
  const isEditMode = !!item


  const muscleGroupRef = useRef<TextInput>(null)
  const exerciseNameRef = useRef<TextInput>(null)
  const setsRef = useRef<TextInput>(null)
  const repsRef = useRef<TextInput>(null)
  const weightRef = useRef<TextInput>(null)
  const timeRef = useRef<TextInput>(null)

  const getTime = () => {
    return new Date().toISOString()
  }

  const goback = () => router.canGoBack() ? router.back() : undefined

  const HandleAddExercise = () => {
    const numRegex = /^\d+$/;
    if (!muscleGroup) return muscleGroupRef.current?.focus();
    if (!exerciseName) return exerciseNameRef.current?.focus();
    if (!numRegex.test(sets)) return setsRef.current?.focus();
    if (!numRegex.test(reps)) return repsRef.current?.focus();
    if (!numRegex.test(weight)) return weightRef.current?.focus();
    if (!numRegex.test(time) && time) return timeRef.current?.focus();
    isEditMode ?
      addWorkout({
        muscleGroup,
        name: exerciseName,
        sets,
        reps,
        weight,
      }, {
        onSuccess:()=>{
          goback()
          console.log('success')
        }
      })
      :
      updateWorkout({
        id: ID,
        muscleGroup,
        name: exerciseName,
        sets,
        reps,
        weight,
        time
      }, {
         onSuccess:()=>{
          goback()
          console.log('success')
        }
      }
    )

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
          onLeftPress={goback}
        />

        <DropdownInput
          initialValue={item.muscleGroupName}
          label="Muscle Group"
          options={["Legs", "Back", "Chest", "Arms"]}
          placeholder="Select Muscle Group"
          icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
          onSelect={(value) => setMuscleGroup(value)}



        />
        <DropdownInput
          initialValue={item.name}
          label="Exercise Name"
          options={["Curls", "DeadLift", "Biceps"]}
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
          keyboardType="number-pad"

        />
        <LabeledInput
          label="Reps"
          value={reps}
          onChangeText={setReps}
          placeholder="e.g., 12"
          inputRef={repsRef}
          onNext={() => { weightRef.current?.focus() }}
          keyboardType="number-pad"
        />
        <LabeledInput
          label="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g., 10"
          inputRef={weightRef}
          onNext={() => { timeRef.current?.focus() }}
          keyboardType="number-pad"
        // className="flex-0"
        />
        <Text className="font-sans font-normal text-sm px-4 pb-2 text-custom-purple1">Logging for {formatClassTime(getTime(), getTime(), 'longDate')}</Text>
        <LabeledInput
          label="Time (Optional)"
          value={time}
          onChangeText={setTime}
          placeholder="Select Time"
          inputRef={timeRef}
          keyboardType="number-pad"

        />



        <ContinueButton
          title='Add to Log'
          gradient
          onPress={HandleAddExercise}
        />


      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    // height: 1674,
    flex: 0

  }
})

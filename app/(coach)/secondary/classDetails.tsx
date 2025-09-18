import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView, } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { HeaderBar, ContinueButton, SmallButton, Applate, WeeklyChart, KeyboardWrapper } from "@components/index";
import { ArrowLeft, PersonIcon } from "@assets/icons/icons";
import { ClassList } from "@schemas/coach.schema";
import { formatClassTime } from "@utils/filterByStatus";
import { useFetchClassDetail } from "@hooks/useCoach";

export default function Profile() {
  const { data, isPending, error } = useFetchClassDetail()
  const item = useLocalSearchParams<ClassList>()
  const [context, setContext] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setContext(data.notes)
    }
  }, [data])

  console.log("QQQQQQQQ", data)
  return (
    <KeyboardWrapper>
      <ScrollView>

        <HeaderBar
          title="Class Details"
          LeftIcon={<ArrowLeft />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined} />

        <View className="p-4">
          <View className="rounded-xl bg-custom-offwhite shadow shadow-black/10 shadow-sm">
            <Image
              source={{ uri: item.imageLink }}
              className="aspect-[358/201] bg-custom-icon-bg  rounded-xl "
            />

            <View className="min-w-[288px] p-4 gap-1">
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple5">{item.name}</Text>
              <Text className="h-[23px] font-sans font-bold   text-lg leading-[23px] text-custom-blue">{formatClassTime(item.startDate, item.endDate, 'display')}</Text>
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple5">Coach: {item.coach}</Text>
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple5">{item.enrolled} Users</Text>
            </View>
          </View>
        </View>

        <View className='pt-5 px-4 pb-3 h-15'>
          <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Enrolled Users</Text>
        </View>


        <View className="flex-row">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }} // spacing between cards
          >
            {data?.enrolledStudentsSample.map((student) => (
              <View
                key={student.id}
                className="min-w-[128px] pt-4 gap-4"
              >
                <View>
                  <Image
                    source={{ uri: student.image }}
                    className="w-32 h-32 rounded-[64px] bg-custom-icon-bg"
                  />
                </View>
                <Text className="h-6 font-medium text-base font-sans leading-6 self-center">
                  {student.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>



        <View className="gap-2.5 ">
          <View className="flex-row py-3 px-4 justify-evenly">
            <SmallButton
              title="View All Students"
              onPress={() => router.push({
                pathname: './ViewAllStudents',
                params: item
              })} />
            <SmallButton
              title="Marks Attendance"
              gradient
              onPress={() => {
                router.push({
                  pathname: './markStudentAbsent',
                  params: item
                })
              }} />
          </View>
        </View>

        <View className='pt-5 px-4 pb-3 h-15'>
          <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Coach Notes</Text>
        </View>

        <TextInput
          className=" border border-custom-border-gray2 flex-1 rounded-xl m-4 text-base h-[200px] text-gray-800"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          value={context}
          onChangeText={setContext}
        />

        <ContinueButton
          title="Save Note"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => { }}
        />

        <ContinueButton
          title="MARK ALL PRESENT"
          gradient />

      </ScrollView>
    </KeyboardWrapper>
  )
}
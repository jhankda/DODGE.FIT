import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HeaderBar, FilterSelector, LabeledInput, DropdownInput, KeyboardWrapper } from "@components/index";
import { ArrowLeft, ScrollMenu, SearchIcon, RefreshIcon } from "@assets/icons/icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ClassList, student } from "@schemas/coach.schema";
import { useFetchEnrolledStudents } from "@hooks/useCoach";

export default function Profile() {
  const router = useRouter()
  const item = useLocalSearchParams<ClassList>()
  const { data ,isLoading, refetch} = useFetchEnrolledStudents(item.startDate, item.id)
  const [date, setDate] = useState((item.startDate) ? new Date(item.startDate) : new Date());
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState<student[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");

  useEffect(() => {
    if (data?.allEnrolledStudents) {
      setStudents(data.allEnrolledStudents);
    } else {
      setStudents([]); // always keep it as array
    }
  }, [data]);

  const filteredStudents = useMemo(() => {
    return (students ?? []).filter((s) => {
      if (!(s.name.toLowerCase().includes(search.toLowerCase()))) { return false }
      switch (filter) {
        case "present":
          return s.attendance === true;
        case "absent":
          return s.attendance === false;
        default: return true;
      }
    }
    );
  }, [students, filter, search]);


  const rendederItem = ({ item }: { item: student }) => {
    return (
      <View className="flex-row items-center min-h-18 justify-between py-2 px-4">
        <View className="flex-row items-center gap-4">
          <Image
            source={{ uri: item.image }}
            className="h-14 w-14 rounded-[28px] bg-custom-icon-bg "
          />
          <View>
            <Text className="h-6 font-sans font-medium text-base leading-6 text-custom-heading">{item.name}</Text>
            <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple4">{item.id}</Text>
          </View>
        </View>
        <View className="flex-row h-7 items-center w-7">
          <View className={`rounded-md h-3 w-3 ${item.attendance ? 'bg-custom-green-dot' : 'bg-custom-red-dot'}`} />
        </View>
      </View>
    )
  }



  return (
    <KeyboardWrapper>
      <View className="flex-1">
        <HeaderBar
          title={`Attendance - ${item.name}`}
          LeftIcon={<ArrowLeft />}
          RightIcon={<RefreshIcon />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
          onRightPress={() => {refetch()}}
        />

        <View className="px-4 py-3 gap-4">
          <Text className="h-6 font-sans font-medium text-base text-custom-heading">
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            className="flex-row items-center border-custom-border-gray2 justify-between h-14 p-4 rounded-lg border"
          >
            <Text className="h-6 font-normal text-base leading-6">
              {date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
            <ScrollMenu />
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <FilterSelector selected={filter} onSelect={setFilter} />

        <View>
          <LabeledInput
            placeholder="       Search by student name"
            value={search}
            onChangeText={setSearch}
            isLast
          />
          {!search && <SearchIcon className="absolute top-7 left-9" />}
        </View>

        <FlatList
          data={filteredStudents}
          renderItem={rendederItem}
          keyExtractor={(e) => e.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }} 
        />
      </View>
    </KeyboardWrapper>

  )
}
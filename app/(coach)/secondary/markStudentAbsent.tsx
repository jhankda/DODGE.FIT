import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Switch,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  HeaderBar,
  ContinueButton,
  LabeledInput,
  AttendanceSwitch
} from "@components/index";
import { ArrowLeft, SearchIcon } from "@assets/icons/icons";
import { useFetchEnrolledStudents } from "@hooks/useCoach";
import { allStudents, ClassList, student } from "@schemas/coach.schema";
import { formatClassTime } from "@utils/filterByStatus";






export default function MarkStudentAbsent() {
  const { data, isPending, error } = useFetchEnrolledStudents();
  const [students, setStudents] = useState<student[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const item = useLocalSearchParams<ClassList>();

  useEffect(() => {
    if (data?.allEnrolledStudents) {
      setStudents(data.allEnrolledStudents);
    } else {
      setStudents([]);
    }
  }, [data]);

  console.log('PPPPP', data);




  const filteredStudents = useMemo(() => {
    return (students ?? []).filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  console.log("Students:", students);
  console.log("Filtered:", filteredStudents);




  const toggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, attendance: !s.attendance } : s
      )
    );
  };

  const renderItem = ({ item }: { item: student }) => (
    <View className="flex-row min-h-18 items-center justify-between py-2 px-4 bg-white rounded-lg mb-2 shadow">
      <View className="flex-row gap-4 items-center">
        <Image
          source={{ uri: item.image }}
          className="h-14 w-14 rounded-[28px]"
        />
        <View>
          <Text className="h-6 font-sans font-medium text-base  leading-6 text-custom-blue">{item.name}</Text>
          <Text className="h-[21px] fonts-sans font-normal text-sm  text-custom-purple4">User ID: {item.id}</Text>
        </View>
      </View>

      <AttendanceSwitch
        value={item.attendance ?? false}
        onToggle={() => toggleAttendance(item.id)}
      />

    </View>
  );

  const handleSave = async () => {

  };

  return (
    <View className="flex-1 bg-gray-50">
      <HeaderBar
        title="Mark Student Absent"
        LeftIcon={<ArrowLeft />}
        onLeftPress={() => (router.canGoBack() ? router.back() : undefined)}
      />

      <View className="p-4">
        <View className="flex-row justify-between">
          <View className="gap-1 aspect-[228/64]">
            <Text className="font-sans text-sm text-custom-purple5">
              {item.name}
            </Text>
            <Text className="font-sans text-sm text-custom-purple5">
              {formatClassTime(item.startDate, item.endDate, "display")}
            </Text>
          </View>
          <Image
            source={{ uri: item.imageLink }}
            className="aspect-[130/64] rounded-xl bg-custom-icon-bg"
          />
        </View>
      </View>

      <View>
        <LabeledInput
          placeholder="       Search by student name"
          value={search}
          onChangeText={setSearch}
        />
        {!search && <SearchIcon className="absolute top-7 left-9 " />}
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderItem}
        keyExtractor={(e) => e.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <ContinueButton title="Save Changes" gradient onPress={handleSave} />
    </View>
  );
}

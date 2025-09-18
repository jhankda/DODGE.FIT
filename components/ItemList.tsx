import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFetchClassList } from "@hooks/useUser";
import { filterByStatus, formatClassTime } from "@utils/filterByStatus";
import { ClassItem } from '@schemas/user.schema';
import { useRouter } from "expo-router";
import { UpcomingCard } from "./upcomingCard";
import { PastClassCard } from "./pastClassCard";
import { useFetchClassList as useFetchClass } from "@hooks/useCoach";
import { CoachClassCard } from "./coachClassCard";
import { ClassList } from "@schemas/coach.schema";

type Props = {
  filter: "upcoming" | "present" | "past";
  role?: "coach" | "user"
};




const ItemList = ({ filter, role }: Props) => {
  const { data, isLoading, error } = role == "coach" ? useFetchClass() : useFetchClassList();
  
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{"Error: " + error.message}</Text>
      </View>
    );
  }
  const filteredData = data ? filterByStatus(data, filter, role) : [];

  console.log("FD", filteredData)

  const renderListItem = ({ item }: any) => {
    if (role != "coach") {
      if (filter === "past") {
        return <PastClassCard item={item} filter={filter} />;
      }
      return <UpcomingCard item={item} filter={filter} />;
    }
    else {
      return <CoachClassCard item={item} filter={filter} />
    }
  };



  return (
    <View className="pb-20">

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ItemList;
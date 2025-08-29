import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFetchClassList } from "@hooks/useUser";
import { getClassImage } from "@utils/getClassImage";
import { filterByStatus } from "@utils/filterByStatus";
import {ClassItem} from '@schemas/user.schema'
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

type Props = {
  filter: "upcoming" | "present" | "past";
};

const ItemList = ({ filter }: Props) => {
  const { data, isLoading, error } = useFetchClassList();
  
  const router =useRouter()
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

  const filteredData = data ? filterByStatus(data, filter) : [];

  const HanldeViewDetails=(id:{$oid:string})=>{
    router.push({
      pathname:"../secondary/classDetails",
      params:{id:JSON.stringify(id)}
    })
  }

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.$oid}
      renderItem={({ item }: { item: ClassItem }) => (
        <View className="bg-custom-off-white rounded-xl mb-8 flex-row justify-between items-start">
          
          <View className="flex-col gap-y-4 flex-1 pr-4">
            
            <View className="flex-col gap-y-1">
              <Text className="text-sm text-custom-text-light font-normal leading-[21px]">Enrolled</Text>
              <Text className="text-base text-custom-text-dark font-bold leading-[20px]">{item.name}</Text>
              <Text className="text-sm text-custom-text-light font-normal leading-[21px]">{item.date}</Text>
            </View>

            {/* Updated Button with your specific Gradient */}
            <TouchableOpacity className="self-start"
            onPress={()=>{HanldeViewDetails(item.id.$oid)}}
            >
              <LinearGradient
                // Updated props to match your request
                colors={['#8C66E3', '#2900F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 2 }}
                className="h-8 px-5 rounded-full flex-row items-center justify-center"
              >
                <Text className="text-sm font-medium text-custom-off-white mr-2 leading-[21px]">View Details</Text>
                <Text className="text-custom-off-white">→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Image
            source={getClassImage(item.image)}
            className="w-[130px] h-[139px] rounded-xl"
          />
        </View>
      )}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ItemList;
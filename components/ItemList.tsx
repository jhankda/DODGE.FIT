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
import { filterByStatus, formatClassTime } from "@utils/filterByStatus";
import { ClassItem } from '@schemas/user.schema';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {CalendarIcon,ArrowLeft} from "@assets/icons/icons"
import SmallButton from "./smallButton";

type Props = {
  filter: "upcoming" | "present" | "past";
};




type CardProps = {
  item: ClassItem;
  filter: "upcoming" | "present" | "past";
};




const UpcomingCard: React.FC<CardProps> = ({ item, filter }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push({
      pathname: "../secondary/classDetails",
      params: { id: item.id.$oid },
    });
  };

  return (
    <View className="bg-custom-off-white rounded-xl mb-8 flex-row justify-between items-start">
      <View className="flex-col gap-y-4 flex-1 pr-4">
        <View className="flex-col gap-y-1">
          <Text className="text-sm text-custom-text-light font-normal leading-[21px]">
            Enrolled
          </Text>
          <Text className="text-base text-custom-text-dark font-bold leading-[20px]">
            {item.name}
          </Text>
          <Text className="text-sm text-custom-text-light font-normal leading-[21px]">
            {formatClassTime(item.startDate, item.endDate, filter)}
          </Text>
        </View>

        <SmallButton
          title='View Details'
          rightIcon={<ArrowLeft />}
          gradient
          onPress={()=>router.push('../secondary/classDetails')}
        />

      </View>

      <Image
        source={getClassImage(item.image)}
        className="w-[130px] h-[139px] rounded-xl"
      />
    </View>
  );
};

const PastClassCard: React.FC<CardProps> = ({ item, filter }) => {

  return (
    <View>

      <View className="flex-row h-56px items-center">
        <View className="flex justify-center mr-2 rounded-lg items-center w-10 h-10 bg-custom-icon-bg p-0">
          <View className="w-6 h-6 relative ">
            <CalendarIcon className="absolute w-6 h-6 self-center color-custom-blue" />
            <View className="absolute w-[18px] h-[20px] left-0 top-0 font-normal flex flex-col items-start p-0" />
          </View>
        </View>

        <Text className='font-sans  text-base leading-6 tracking-normal'>
          {formatClassTime(item.startDate, item.endDate, 'longDate')}</Text>
      </View>
      <View className="flex-row items-start gap-x-4 py-4">
        <View className="flex-1">
          <Text className="text-sm font-normal text-[#69598C]">Absent</Text>
          <Text className="text-base font-bold text-[#120F1A] mt-1">{item.name}</Text>
          <Text className="text-sm font-normal text-[#69598C] mt-1">
            {formatClassTime(item.startDate, item.endDate, filter)} · Coach {item.coach}
          </Text>
        </View>
        <View className="w-32 aspect-[130/70]">
          <Image source={getClassImage(item.image)} className="w-full h-full rounded-lg" resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};

const ItemList = ({ filter }: Props) => {
  const { data, isLoading, error } = useFetchClassList();

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
  console.log("dATA", data)
  const filteredData = data ? filterByStatus(data, filter) : [];

  console.log("FD", filteredData)
  const renderListItem = ({ item }: { item: ClassItem }) => {
    if (filter === "past") {
      return <PastClassCard item={item} filter={filter} />;
    }
    return <UpcomingCard item={item} filter={filter} />;
  };



  return (
    <View className="pb-20">

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.$oid}
        renderItem={renderListItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ItemList;
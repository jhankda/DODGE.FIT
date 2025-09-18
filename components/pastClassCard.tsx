import { View,Text, Image  } from "react-native";
import { ClassItem } from "@schemas/user.schema";
import { formatClassTime } from "@utils/filterByStatus";
import { CalendarIcon } from "@assets/icons/icons";
import { getClassImage } from "@utils/getClassImage";

type CardProps = {
  item: ClassItem;
  filter: "upcoming" | "present" | "past";
};

export const PastClassCard: React.FC<CardProps> = ({ item, filter }) => {

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
          <Image source={{uri:`${item.image}`}} className="w-full h-full rounded-lg bg-custom-icon-bg" resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};
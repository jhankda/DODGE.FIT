import { View, Text, Image } from "react-native";
import SmallButton from "./smallButton";
import { ClassItem } from "@schemas/user.schema";
import { useRouter } from "expo-router";
import { formatClassTime } from "@utils/filterByStatus";
import { ArrowRightWhite } from "@assets/icons/icons";
import { getClassImage } from "@utils/getClassImage";

type CardProps = {
  item: ClassItem;
  filter: "upcoming" | "present" | "past";
};




export const UpcomingCard: React.FC<CardProps> = ({ item, filter }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push({
      pathname: "../secondary/classDetails",
      params: { id: item.id  },
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
          rightIcon={<ArrowRightWhite />}
          gradient
          onPress={handleViewDetails}
        />

      </View>

      <View>

        <Image
          source={{ uri: `${item.image}` }}
          className="rounded-xl bg-custom-icon-bg w-[130px] h-[114px]"
        />
      </View>
    </View>
  );
};

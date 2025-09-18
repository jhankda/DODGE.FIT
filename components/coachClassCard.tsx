import { View, Text, Image } from "react-native";
import SmallButton from "./smallButton";
import { ClassList } from "@schemas/coach.schema";
import { useRouter } from "expo-router";
import { formatClassTime } from "@utils/filterByStatus";
import { ArrowRightWhite } from "@assets/icons/icons";

type CardProps = {
  item: ClassList;
  filter: "upcoming" | "present" | "past";
};




export const CoachClassCard: React.FC<CardProps> = ({ item, filter }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push({
      pathname: "../secondary/classDetails",
      params: { id: item.id },
    });
  };

  return (
     <View className="py-4">
          <View className="flex-row justify-between rounded-xl ">
              <View className=" flex-1">
                <View className="gap-1">
                  <Text className="h-5 font-sans font-bold text-base leading-5 text-custom-heading">{item.name}</Text>
                  <Text className="h-[42px] font-normal font-sans text-sm leading-[21px] text-custom-purple4">{formatClassTime(item.startDate,item.endDate,'coach')} · {item.location} · {item.enrolled} Enrolled</Text>
                </View>
                <View>
                <SmallButton
                title="View Details"
                leftIcon={<ArrowRightWhite/>}
                gradient
                onPress={()=>{
                  router.push({
                    pathname:'(coach)/secondary/classDetails',
                    params:item
                  })}}
                />
                </View>
              </View>
              <View>

              <Image
              source={{uri:`${item.imageLink}`}}
              className="rounded-xl bg-custom-icon-bg w-[130px] h-[114px]"
              />
              </View>
          </View>
        </View> 
    // <View className="bg-custom-off-white rounded-xl mb-8 flex-row justify-between items-start">
    //   <View className="flex-col gap-y-4 flex-1 pr-4">
    //     <View className="flex-col gap-y-1">
    //       <Text className="text-sm text-custom-text-light font-normal leading-[21px]">
    //         Enrolled
    //       </Text>
    //       <Text className="text-base text-custom-text-dark font-bold leading-[20px]">
    //         {item.name}
    //       </Text>
    //       <Text className="text-sm text-custom-text-light font-normal leading-[21px]">
    //         {formatClassTime(item.startDate, item.endDate, filter)}
    //       </Text>
    //     </View>

    //     <SmallButton
    //       title='View Details'
    //       rightIcon={<ArrowRightWhite />}
    //       gradient
    //       onPress={() => router.push('../secondary/classDetails')}
    //     />

    //   </View>

    //   <Image
    //     source={getClassImage(item.image)}
    //     className="w-[130px] h-[139px] rounded-xl"
    //   />
    // </View>
  );
};

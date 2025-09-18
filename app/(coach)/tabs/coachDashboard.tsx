import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import { HeaderBar, SmallButton } from "@components/index";
import { ArrowRightWhite, BookIcon, CalenderIcon, DumbellIcon, GroupIcon } from "@assets/icons/icons";
import { useFetchClassList } from "@hooks/useCoach";
import { ClassList, coacProfile } from "@schemas/coach.schema";
import { formatClassTime } from "@utils/filterByStatus";
import { useFetchProfile } from "@hooks/useCoach";
type ActionCardProps = {
  label: string;
  Icon: React.ComponentType<any>;
  onPress: () => void;
};

const ActionCard = ({ label, Icon, onPress }: ActionCardProps) => (
  <TouchableOpacity
    className="flex-1 flex-row items-center mx-1 p-4 border rounded-lg bg-custom-offwhite3 border-custom-border-gray2"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Icon size={24} />
    <Text className="ml-2">{label}</Text>
  </TouchableOpacity>
);

export default function CoachDashboard() {
  const { data, isPending, error } = useFetchClassList();
    const {data:profile} = useFetchProfile()
  
  const router = useRouter()
  const [presentClass, setPresentClass] = useState<ClassList>()
  const [myprofile,setMyProfile]  = useState<coacProfile>()



  useEffect(() => {
    if (data?.length) {
      setPresentClass(data[0])
    }
  }, [data]);

  useEffect(() => {
    if(profile){
      if(profile.stats[0]){}
      setMyProfile(profile)
    }
    console.log("KKLKL",myprofile);
  }, [profile]);


  const actions = [
    {
      label: "Assign\nWorkout Plan",
      Icon: DumbellIcon,
      onPress: () => console.log("Assign Workout Plan"),
    },
    {
      label: "View\nAttendance\nLogs",
      Icon: CalenderIcon,
      onPress: () => router.push({
        pathname: '../secondary/ViewAllStudents',
        params: presentClass
      }),
    },
    {
      label: "Mark\nStudent\nAbsent",
      Icon: GroupIcon,
      onPress: () => {
        router.push({
          pathname: '../secondary/markStudentAbsent',
          params: presentClass
        })
      },
    },
    {
      label: "View All\nClasses",
      Icon: BookIcon,
      onPress: () => router.push('./myClass'),
    },
  ];
  return (


    <ScrollView className="bg-white">

      <HeaderBar
        title="Dashboard" />

      <View className='pt-5 px-4 pb-3 h-15'>
        <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Today's Classes</Text>
      </View>

      <View className="p-4">
        <View
          className="flex-row p-4  justify-between rounded-xl bg-custom-offwhite2 shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-white rounded-xl p-4"
          style={{ elevation: 2 }}
        >
          <View className="gap-4">
            <View className="gap-1 flex-1">
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple4">{presentClass?.name}</Text>
              <Text className="h-5 font-bold font-sans text-base leading-5 text-custom-heading">{presentClass?.name}</Text>
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple4">{presentClass ? formatClassTime(presentClass?.startDate, presentClass?.endDate, 'coach') : ''}· {presentClass?.enrolled} Users</Text>
            </View>
            <View>

              <SmallButton
                title="View Details"
                rightIcon={<ArrowRightWhite />}
                gradient
                onPress={() => {
                  router.push({
                    pathname: "../secondary/classDetails",
                    params:presentClass,
                  });
                }} />
            </View>
          </View>
          <Image
            source={{ uri: presentClass?.imageLink }}
            className="flex-wrap w-[119px] h-[118px] self-center rounded-xl bg-custom-icon-bg" />
        </View>
      </View>

      <View className='pt-5 px-4 pb-3 h-15'>
        <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Quick Actions</Text>
      </View>

      <View className="p-4 gap-3 ">
        <View className="flex-row">
          <ActionCard {...actions[0]} />
          <ActionCard {...actions[1]} />
        </View>
        <View className="flex-row gap-3">
          <ActionCard {...actions[2]} />
          <ActionCard {...actions[3]} />
        </View>
      </View>

      <View className='pt-5 px-4 pb-3 h-15'>
        <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Coach Profile Summary</Text>
      </View>

      <View className="flex-row p-4">
        <View className="flex-row gap-4 justify-center items-center">
          <Image
            source={{ uri: myprofile?.image }}

            className="rounded-[64px] w-32 h-32 bg-custom-icon-bg"
          />
          <View>
            <View>
              <Text className="h-7 font-bold text-[22px] leading-7 text-custom-heading">Coach {myprofile?.name}</Text>
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple4">Classes assigned: {myprofile?.stats[0]?.totalClassAssigned} </Text>
              <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple4">Total users: {myprofile?.stats[0]?.UserManaged}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-5" />

    </ScrollView>
  )
}
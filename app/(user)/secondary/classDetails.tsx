import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import { useFetchClassDetailsList } from "@hooks/useUser";
import { getClassImage } from "@utils/getClassImage";
import { formatClassTime } from "@utils/filterByStatus";

export default function classDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error } = useFetchClassDetailsList(id)
  const [isLive, setIsLive] = useState<boolean>(false)

  const router = useRouter()
  console.log(data, "PPPPPPPPPPPPPPPPPPPPPPPPPPP")

  useEffect(() => {

    if (data) {
      if (formatClassTime(data.startDate, data.endDate, 'live')) {
        setIsLive(false)
      }
    }
    setIsLive(false)
  }, [])
  type NotesProps  = {
            title:string,
            content:string | undefined
        }
  const Notes = ({title,content}:NotesProps) => {
    return (
      <>
        <View className=" px-4 pt-5 pb-3">
          <Text className="font-sans font-bold text-custom-heading text-[22px] leading-[28px]">
            {title}
          </Text>
        </View>
        <Text className="font-sans font-normal text-base px-4 pt-1 pb-3 leading-6">
        {content}
        </Text>
      </>
    )
  }




  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Dodge.fit"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={() => { if (router.canGoBack()) router.back() }}
        />

        <View className=" px-4 pt-5 pb-3">
          <Text className="font-sans font-bold text-custom-heading text-[22px] leading-[28px]">
            Live Classes
          </Text>
        </View>

        <View className="flex-row items-center px-4 mb-4 py-2 gap-4  h-[72px]">
          <Image
            source={getClassImage(data?.image)}
            className="w-14 h-14 rounded-lg"
          />
          <View className="flex flex-col justify-center">
            <Text className="text-base font-medium leading-6 text-[#120D1C]">
              {data?.name}
            </Text>
            <Text className="text-sm leading-[21px] text-[#634F96]">
              {data?.slug}
            </Text>
          </View>
        </View>

        <View className="w-full px-4">
          <View className="flex-row  gap-6 w-full">
            <View className="w-[72px] border-t border-[#E6E8EB] py-5">
              <Text className="text-sm text-[#634F96]">Time</Text>
              <Text className="text-sm text-[#120D1C] mt-1">
                {data ? formatClassTime(data.startDate, data.endDate, 'classDetail') : "NA"}
              </Text>
            </View>

            <View className=" border-t border-[#E6E8EB] py-5 pl-6">
              <Text className="text-sm text-[#634F96]">Location</Text>
              <Text className="text-sm text-[#120D1C] mt-1">
                {data?.loaction}
              </Text>
            </View>
          </View>

          {/* Coach (spans whole row, left-aligned like in Figma) */}
          <View className="flex-row w-full">
            <View className="w-[72px] border-t border-[#E6E8EB] py-5">
              <Text className="text-sm text-[#634F96]">Coach</Text>
              <Text className="text-sm text-[#120D1C] mt-1">Coach{"\n"}{data?.coach}</Text>
            </View>

            {/* Empty right side for spacing consistency */}
            <View className="flex-1 border-t border-[#E6E8EB] py-5" />
          </View>
        </View>

        <View className="flex-row items-center h-[56px] w-full px-[16px] justify-between">
          <Text className="h-[24px] font-sans font-medium text-base leadingg-6 text-custom-heading">
            Live
          </Text>
          <View className="w-min h-min">
            <View className={`${isLive ? 'bg-custom-green' : 'bg-red-500'} w-[12px] h-[12px] rounded-md`}>
            </View>
          </View>
        </View>

        <View className=" px-4 pt-5 pb-3">
          <Text className="font-sans font-bold text-custom-heading text-[22px] leading-[28px]">
            Attendance
          </Text>
        </View>

        <View className="flex-row items-center h-14 w-full px-4 justify-between">
          <Text className="h-[24px] font-sans font-medium text-base leadingg-6 text-custom-heading">
            Present
          </Text>
          <View className="w-min h-min">
            <View className={`${data?.attended ? 'bg-custom-green' : 'bg-red-500'}` + " w-3 h-[12px] rounded-md"}>
            </View>
          </View>
        </View>

        <Notes title={"Coach's Notes"} content={data?.notes}/>
        <Notes title={"info"} content={data?.info}/>
        <Notes title={"Workout Log"} content={data?.workoutLog}/>

        <ContinueButton
        title="Present"
        buttonStyle={{backgroundColor: "#EBE8F2",marginHorizontal:16}}
        textStyle={{color:'#120D1C'}}
        />

      </ScrollView>
    </KeyboardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
  }
});
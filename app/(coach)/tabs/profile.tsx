import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import { HeaderBar, Applate, WeeklyChart, Account_Action } from "@components/index";
import { CallIcon, CopyIcon, EditIcon, LockIcon, LogoutIcon } from "@assets/icons/icons";
import { useFetchProfile } from "@hooks/useCoach";
import * as Clipboard from "expo-clipboard";
import { coacProfile } from "@schemas/coach.schema";

export default function Profile() {
  const box = 'rounded-xl border p-6 gap-2 flex-1 min-w-[158px] border-custom-border-gray2'
  const text1 = " font-sans font-medium text-base leading-6 text-custom-blue";
  const text2 = " font-sans font-bold text-2xl text-custom-blue leading-[30px]";
  const {data} = useFetchProfile()
  const router = useRouter()
  const [myprofile, setMyProfile]  = useState<coacProfile>()

  useEffect(()=>{
    if(data){
      setMyProfile(data)
    }
  },[])





 
  const handleCopy = async (textToCopy: string) => {
    await Clipboard.setStringAsync(textToCopy);
  };
  return (
    <ScrollView>

      <HeaderBar
        title="Profile" />

      <View className="p-4 justify-center items-center flex-row">
        <View className="gap-4"><View className="gap-4 self-center">
          <Image
            source={{ uri: myprofile?.image }}
            className="w-32 h-32 rounded-[64px] bg-custom-icon-bg"
          />
          <View className="self-center">
            <Text className="h-7 font-sans font-bold text-[22px] leading-[28px]">{myprofile?.name}</Text>
            <Text className="h-6 font-sans font-normal text-base text-custom-purple7 leading-6">Coach</Text>
          </View>

        </View>

        </View>
      </View>

      <View className="flex-row h-18 items-center justify-between py-2 px-4">
        <View>
          <Text className="h-6 font-sans font-medium text-base leading-6 ">EMAIL ID</Text>
          <Text className="h-[21px] font-sans font-normal text-sm text-custom-purple7 leading-[21px]">{myprofile?.email}</Text>
        </View>
        <TouchableOpacity
          onPress={() => data ? handleCopy(data?.email) : undefined}
        >
          <CopyIcon className='size-6' />
        </TouchableOpacity>
      </View>

      <View className="flex-row h-18 items-center justify-between py-2 px-4">
        <View>
          <Text className="h-6 font-sans font-medium text-base leading-6 ">PHONE NO</Text>
          <Text className="h-[21px] font-sans font-normal text-sm text-custom-purple7 leading-[21px]">{myprofile?.phoneNo}</Text>
        </View>
        <TouchableOpacity
          onPress={() => data ? handleCopy(data?.phoneNo) : undefined}
        >
          <CopyIcon className='size-6' />
        </TouchableOpacity>
      </View>

      <View className="p-4 pb-2 h-[47px]">
        <Text className="h-[23px] text-[18px] font-bold ">Stats Summary</Text>
      </View>

      <View className="p-4 gap-4">

        <View className={box}>
          <Text className={text1}>Total Classes Assigned</Text>
          <Text className={text2}>{myprofile?.stats[0]?.totalClassAssigned}</Text>

        </View>
        <View className={box}>
          <Text className={text1}>Users Managed</Text>
          <Text className={text2}>{myprofile?.stats[0]?.UserManaged}</Text>

        </View>
        <View className={box}>
          <Text className={text1}>Avg Attendance %</Text>
          <Text className={text2}>{myprofile?.stats[0]?.AttendanceAvg}%</Text>
        </View>
      </View>

      <View className="h-[47px] px-4 pt-4 pb-2">
        <Text className="h-[23px] font-sans text-lg font-bold leading-[23px] text-custom-blue2">Account Accounts</Text>
      </View>

      <Account_Action
        title="Change Password"
        LeftIcon={<LockIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        onPress={() => router.push('/shared/changePassword')}
      />
      <Account_Action
        title="Edit Profile"
        LeftIcon={<EditIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        onPress={() => router.push('/shared/editProfile')}
      />
      <Account_Action
        title="Contact Support"
        LeftIcon={<CallIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        onPress={() => router.push('/shared/contactSupport')}
      />
      <Account_Action
        title="Logout"
        LeftIcon={<LogoutIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        onPress={() => router.push('/shared/logout')}
      />

    </ScrollView>
  )
}
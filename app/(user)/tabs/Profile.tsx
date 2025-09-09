import React  from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowRight, EditIcon, LockIcon, CallIcon, LogoutIcon} from "@assets/icons/icons";
import {HeaderBar,ContinueButton, KeyboardWrapper, SmallButton} from "@components/index";

type ActionListProps = {
  title: string,
  LeftIcon: React.ReactNode,
  onPress?: () => void,
  notArrow?:boolean
}

export const Account_Action = ({ title, LeftIcon, onPress, notArrow }: ActionListProps) => {
  return (
    <TouchableOpacity className="px-4 min-h-[56px] flex-row  justify-between"
      onPress={onPress}
    >
      <View className="flex-row gap-4 self-center items-center">
        <View className="h-10 w-10 justify-center rounded-lg bg-custom-icon-bg">
          {LeftIcon}
        </View>
        <Text className="h-6 self-center font-sans font-normal text-base leading-6">{title}</Text>
      </View>
      {!notArrow && <View
        className="self-center justify-center h-7 w-7">
        <ArrowRight className='h-6 w-6 self-center custom-blue2' />
      </View>}
    </TouchableOpacity>
  )
}
export default function Profile() {

  const router = useRouter()

  const sty1 = "font-sans font-normal text-sm leading-[21px] text-custom-purple-text"
  const sty2 = "font-sans font-medium text-sm leading-[21px] text-custom-heading";



  return (
    <KeyboardWrapper>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderBar
          title="Profile"

        />

        <View className="flex-row p-4 justify-between">
          <View className="gap-1">
            <Text
              className="h-[21px] font-sans text-sm font-normal text-custom-purple1 leading-[21px]"
              onPress={() => router.push('../secondary/editProfile')}>Edit Profile</Text>
            <Text className="h-[20px] font-sans text-base font-bold ">Rana </Text>
            <Text
              className="h-[21px] font-sans text-sm font-normal text-custom-purple1 leading-[21px]"
            >Email</Text>
          </View>

          <View className="w-[130px] h-[70px] rounded-xl bg-custom-icon-bg">
            {/* <Image
        // source={{uri:''}}
        // alt="Not Available"
        /> */}
          </View>
        </View>

        <View className="p-4">
          <Text className="h-[47px] pt-4 pb-2 font-sans font-bold text-lg leading-[23px]">Attendance Summary</Text>
          <View className="flex-row justify-between py-2">
            <Text className="font-sans font-normal text-sm leading-[21px]">Total Class</Text>
            <Text className="font-sans font-normal text-sm leading-[21px]">48</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="font-sans font-normal text-sm leading-[21px]">Present</Text>
            <Text className="font-sans font-normal text-sm leading-[21px]">48</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-sans font-normal text-sm leading-[21px]">Absent</Text>
            <Text className="font-sans font-normal text-sm leading-[21px]">48</Text>
          </View>
        </View>

        <View className="flex-row p-4 justify-end  py-4">
          <SmallButton
            title="View Details Attendance"
            leftIcon={<ArrowRight />}
            onPress={() => router.push('../secondary/attendanceDetails')}
          />
        </View>

        <View className="h-15 px-4 pt-5 pb-3 ">
          <Text className="h-7 font-sans text-lg font-bold leading-7">Health Metrics</Text>
        </View>

        <View className="p-4">

          <View className="flex-row px-4">
            <View className="flex-1  gap-1 py-4 border-t border-custom-border-gray">
              <Text className={sty1}>Height</Text>
              <Text className={sty2}>170</Text>
            </View>
            <View className="flex-1 gap-1 py-4 border-t border-custom-border-gray">
              <Text className={sty1}>Weight</Text>
              <Text className={sty2}>170</Text>
            </View>
          </View>

          <View className="flex-row px-4">
            <View className="flex-1 gap-1 py-4 border-t border-custom-border-gray">
              <Text className={sty1}>Heigt</Text>
              <Text className={sty2}>170</Text>
            </View>
            <View className="flex-1 gap-1 py-4 border-t border-custom-border-gray">
              <Text className={sty1}>Heigt</Text>
              <Text className={sty2}>170</Text>
            </View>
          </View>
        </View>

        <View className="p-4 pb-2 flex-row ">
          <Text className="flex-1 font-sans font-bold text-lg items-center leading-[23px]">Subscription</Text>
        </View>

        <View className="flex-row justify-between px-4 py-3 min-h-[72px] items-center">
          <View>
            <Text className="font-sans font-medium text-base leading-6">Premium Plan</Text>
            <Text className="font-sans font-normal text-sm leading-[21px]">Expires On</Text>
          </View>
          <Text className="font-sans font-medium -text-base leading-6">Active</Text>

        </View>

        <ContinueButton
          title="Manage-Subscription"
          gradient
          onPress={() => router.push('../secondary/manageSubscription')}

        />
        <ContinueButton
          title="View Payment History"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => router.push('../secondary/paymentHistory')}
        />
        <View className="h-[47px] px-4 pt-4 pb-2">
          <Text className="h-[23px] font-sans text-lg font-bold leading-[23px] text-custom-blue2">Account Accounts</Text>
        </View>

        <Account_Action
          title="Change Password"
          LeftIcon={<LockIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
          onPress={() => router.push('/secondary/changePassword')}
        />
        <Account_Action
          title="Edit Profile"
          LeftIcon={<EditIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
          onPress={() => router.push('../secondary/editProfile')}
        />
        <Account_Action
          title="Contact Support"
          LeftIcon={<CallIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
          onPress={() => router.push('../secondary/contactSupport')}
        />
        <Account_Action
          title="Logout"
          LeftIcon={<LogoutIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
          onPress={() => router.push('../secondary/logout')}
        />















      </ScrollView>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  }
})


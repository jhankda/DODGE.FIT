import React from "react";
import { View, Text, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {HeaderBar,ContinueButton,KeyboardWrapper} from "@components/index";
import {CrossIcon} from "@assets/icons/icons";
import * as SecureStore from "expo-secure-store";


export default function Logout() {
  const router  = useRouter()
  const HandleLogout  = async()=>{
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("role")
    router.replace('(auth)/signIn');
  }

  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title=""
          RightIcon={<CrossIcon />}
          onRightPress={()=>router.canGoBack()?router.back():undefined}
        />
        <View className="h-[88px] pt-5 px-4 pb-2 ">
          <Text className="  h-15 font-bold text-2xl leading-15 text-custom-blue">Are you sure you want to log out?</Text>
        </View>
        <ContinueButton
          title="Log Out"
          gradient
          onPress={HandleLogout}
        />
        <ContinueButton
          title="Cancel"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => router.canGoBack()?router.back():undefined}
        />
      </ScrollView>
    </KeyboardWrapper>
  )
}
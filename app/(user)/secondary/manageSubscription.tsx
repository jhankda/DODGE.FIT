import React from "react";
import { View, ImageBackground, Text, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import {HeaderBar,ContinueButton,KeyboardWrapper} from "@components/index";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchInvoiceList } from "@hooks/useUser";

export default function ManageSubscription() {
  const router = useRouter()
  const { data, isPending, error } = useFetchInvoiceList()
  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title="Manage Subscription"
          LeftIcon={<ArrowLeft />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
        />

        <View className="p-4">
          <ImageBackground
            source={{ uri: '' }}
            className="h-[307px] w-full justify-end overflow-hidden rounded-xl"
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              className="absolute bottom-0 left-0 right-0 h-2/3"
            />

            <View className="w-full flex-row items-end justify-between p-4">

              <View className="gap-1 flex-wrap flex-1">
                <Text className="font-['SpaceGrotesk-Regular'] text-sm text-white">
                  ₹1,200 / month
                </Text>
                <Text className="font-['SpaceGrotesk-Bold'] text-2xl leading-[30px] text-white">
                  Custom {'\n'}Payment{'\n'}Plan
                </Text>
                <Text className="font-['SpaceGrotesk-Medium'] text-base text-white">
                  Active
                </Text>
              </View>

              <View className="rounded-full bg-[#805ED1] px-4 py-2.5">
                <Text className="font-['SpaceGrotesk-Bold'] text-center text-sm text-[#FAFAFA]">
                  Renewal Date: 2024-08-15
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View className="flex-row py-2 px-4  justify-between">
          <View className="flex-row gap-4">
            <View className="w-10 h-6 border self-center rounded-[3.5px]" />
            <View className='flex-0'>
              <Text className="h-6 font-medium text-base leading-6">Payment Method</Text>
              <Text className="font-sans font-normal text-sm">Visa **** 2311</Text>
            </View>
          </View>
          <Text className="h-6 font-medium text-base font-sans leading-6">Update</Text>
        </View>

        <View className="pt-5 pb-3 px-4 h-15">
          <Text className="font-bold text-[22px] font-sans text-custom-blue">Invoice History</Text>
        </View>

        {data?.map((iv) => {
          return (
            <View
              key={iv.id}
              className="flex-row  py-3 px-4  justify-between"><View>
                <Text className="h-6 font-medium text-base font-sans text-custom-blue">{iv.InvoiceId}</Text>
                <Text className="h-[21px] font-normal text-sm font-sans text-custom-purple2">{iv.amount}</Text>
                <Text className="h-[21px] font-normal text-sm font-sans text-custom-purple2">{iv.date}</Text>
              </View><View className="flex-row self-start h-7 w-7"><View className={`h-3 w-3 self-center bg-${iv.status ? 'custom-green-dot' : 'red300'} rounded-md`} /></View></View>
          )
        })}

        <ContinueButton
          title="Auto Renew On"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => undefined}
        />

        <ContinueButton
          title="Cancel Subscription"
          gradient
          onPress={() => undefined}

        />


      </ScrollView>
    </KeyboardWrapper>
  )
}
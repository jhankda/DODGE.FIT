import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft, BillIcon} from "@assets/icons/icons";
import {HeaderBar, KeyboardWrapper, RoleSelector} from "@components/index";


const role  = ["Last 30 Days","June 2025","Custom Range"];

export default function PaymentHistory() {
  const [selectedFilter,setSelectedFilter] = useState<string>("Last 30 Days")
  const router = useRouter();

  useEffect(()=>{
    if(selectedFilter=='Custom Range'){
      router.push('./dateRange');
      setSelectedFilter("Last 30 Days");
    }
  })

  const PaymentList = ()=>{
    return(
      <View className="flex-row py-3 px-4 justify-between">
        <View className="flex-row gap-4">
          <View className="h-12 w-12 justify-center items-center bg-custom-icon-bg rounded-lg">
            <BillIcon className="h-6 w-6"/>
          </View>
          <View>

          <Text className="h-6 font-sans font-medium text-base leading-6 text-custom-blue">Price</Text>
          <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">date</Text>
          <Text className="h-[21px] font-sans font-normal text-sm leading-[21px] text-custom-purple1">3rd</Text>
          </View>

        </View>
        <Text className="font-sans text-custom-green-dot font-normal text-base leading-6 h-6">Succesful</Text>
      </View>
    )
  }

  return (
    <KeyboardWrapper>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >

        <HeaderBar
          title="Payment History"
          LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
          onLeftPress={()=>router.canGoBack()?router.back():undefined}
        />

        <RoleSelector
        roles={role.map((role) => ({ label: role }))}
        selectedRole={selectedFilter}
        onSelect={setSelectedFilter}
        />
        <PaymentList/>

        

        

      </ScrollView >
    </KeyboardWrapper>


  )
}
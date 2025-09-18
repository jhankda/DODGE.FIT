import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft, ScrollMenu, CallIcon, MessageIcon} from "@assets/icons/icons";
import {ContinueButton, HeaderBar, DropdownInput, KeyboardWrapper, UploadBox} from "@components/index";
import {Account_Action} from "@components/index";
import * as Clipboard from "expo-clipboard";

export default function () {
  const router = useRouter()
  const [supportType, setSupportType] = useState<string>()
  const [context, setContext] = useState<string>()

  const HandleCopy  = async(text:string)=>{
    await Clipboard.setStringAsync(text)
  }

  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title="Contact Support"
          LeftIcon={<ArrowLeft />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
        />

        <DropdownInput
          options={["Council", "Software", "Complaint"]}
          placeholder="What  can  we  help  you  with?"
          icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
          onSelect={(value) => setSupportType(value)}
        />

        <TextInput
          className="bg-custom-icon-bg flex-1 rounded-xl m-4 text-base h-[200px] text-gray-800"
          placeholder="Type your message here..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          value={context}
          onChangeText={setContext}
        />

        <Text className="pb-2 p-4 font-bold text-xl font-sans text-custom-blue  leading-[23px]">Add Screenshot (optional)</Text>

        <View className="p-4 items-center">
          <UploadBox />
        </View>

        <ContinueButton
        title="Save Message"
        gradient
        />

        <Account_Action
        title="Call:XXX"
        LeftIcon={<CallIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        notArrow
        onPress={()=>HandleCopy('XXX')}
        />
        <Account_Action
        title="support@dodgefit.com:XXX"
        LeftIcon={<MessageIcon className={'self-center h-6 w-6 bottom-[2px]'} />}
        notArrow
        onPress={()=>HandleCopy('XXX')}
        />



      </ScrollView>
    </KeyboardWrapper>
  )
}
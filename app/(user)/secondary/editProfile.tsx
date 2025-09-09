import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, TextInput, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft,ScrollMenu} from "@assets/icons/icons";
import {DropdownInput,LabeledInput, HeaderBar,ContinueButton,KeyboardWrapper} from "@components/index";

export default function EditProfile() {
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNo, setPhoneNo] = useState<string>('')
  const [Height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [DOB, setDOB] = useState<string>('')

  const fullNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneNoRef = useRef<TextInput>(null)
  const DOBRef = useRef<TextInput>(null)

  const router = useRouter()
  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title="Edit Profile"
          LeftIcon={<ArrowLeft />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
        />

        <View className="p-4 justify-center flex-row">
          <View className="gap-4">
            <View className=" gap-4">
              <Image
                source={{ uri: '' }}
                className="w-32  h-32 rounded-[64px] min-h-32 bg-custom-icon-bg" />
              <Text className="font-bold text-[22px] font-sans leading-7">Tap to change</Text>
            </View>
          </View>
        </View>

        <LabeledInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder=""
          inputRef={fullNameRef}
          onNext={() => { emailRef.current?.focus() }}
        />
        <LabeledInput
          label="Email Adress"
          value={email}
          onChangeText={setEmail}
          placeholder=""
          inputRef={emailRef}
          onNext={() => { phoneNoRef.current?.focus() }}
        />
        <LabeledInput
          label="Phone Number"
          value={phoneNo}
          onChangeText={setPhoneNo}
          placeholder=""
          inputRef={phoneNoRef}
          onNext={() => { DOBRef.current?.focus() }}
        />
        


      <DropdownInput
        label="Gnder"
        options={["Male","Female"]}
        placeholder="Select"
        icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
        onSelect={(value) => setGender(value)}
      />
      <DropdownInput
        label="Height"
        options={["3ft","4ft","5ft","6ft","7ft","8ft","9ft"]}
        placeholder="Select"
        icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
        onSelect={(value) => setGender(value)}
      />
      <DropdownInput
        label="Weight"
        options={["20-40","40-50","50-60","70-80","80-100","Over 100"]}
        placeholder="Select"
        icon={<ScrollMenu height={26} width={13} right={29} bottom={8} fill="#66578F" alignSelf={"flex-end"} />}
        onSelect={(value) => setGender(value)}
      />

      <LabeledInput
        label="Date of Birth"
        value={DOB}
        onChangeText={setDOB}
        placeholder=""
        inputRef={DOBRef}
        isLast
      />

      <ContinueButton
      title="Save Changes"
      gradient/>
      <View className="h-5"/>

      </ScrollView>
    </KeyboardWrapper>
  )
}
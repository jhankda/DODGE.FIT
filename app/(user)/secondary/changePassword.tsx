import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeft from "@assets/icons/arrowLeft.svg";
import ScrollMenu from "@assets/icons/ScrollMenu.svg";
import DropdownInput from "@components/dropDownMenu";
import LabeledInput from "@components/labeledInput";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import HomeIcon from "@assets/icons/HomeIcon.svg"
import PersonIcon from "@assets/icons/PersonIcon.svg"
import CalenderIcon from "@assets/icons/CalenderIcon.svg"
import DunbellIcon from "@assets/icons/DunbellIcon.svg"
import PlotIcon from "@assets/icons/PlotIcon.svg"
import ClassCalendar from "@components/classCalendar";
import RoleSelector from "@components/RoleSelector";
import BillIcon from "@assets/icons/billIcon.svg"
import PasswordInput from "@components/passwordInput";


export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()
  const [confirmedPassword, setConfirmedPassword] = useState<string>()

  const currentPasswordRef = useRef<TextInput>(null)
  const newPasswordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)


  const handlePassChange = (
    text: string,
    setState: (value: React.SetStateAction<string | undefined>) => void
  ) => {
    const cleanText = text.replace(/[^A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-\s]/g, "");
    setState(cleanText);
  };

  const getPasswordStrength = (password: string = "") => {
    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-[#805ED1]", width: "w-1/3" };
    if (score <= 4) return { label: "Medium", color: "bg-[#F5A623]", width: "w-2/3" };
    return { label: "Strong", color: "bg-[#2ECC71]", width: "w-full" };
  };



  const router = useRouter()
  return (
    <KeyboardWrapper>
      <ScrollView contentContainerStyle={{justifyContent:'space-between',flex:1}}>
        <View className="flex-1">
        <HeaderBar
          title="Change Password"
          LeftIcon={<ArrowLeft />}
          onLeftPress={() => router.canGoBack() ? router.back() : undefined}
          />

        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChangeText={(text) => handlePassChange(text, setCurrentPassword)}
          placeholder="Enter your current password"
          maxLength={16}
          inputRef={currentPasswordRef}
          isLast={false}
          />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChangeText={(text) => handlePassChange(text, setNewPassword)}
          placeholder="Enter your new password"
          maxLength={16}
          inputRef={newPasswordRef}
          isLast={false}
          />
          {newPassword ? (
            <View className="flex flex-col items-start p-4 w-[390px] h-[76px]">
              <Text className="text-[#120F1A] font-sans font-medium text-[16px] leading-6">
                Password Strength: {getPasswordStrength(newPassword).label}
              </Text>
              <View className="w-[358px] h-2 bg-[#D9D4E3] rounded-md mt-3">
                <View
                  className={`h-2 rounded-md ${getPasswordStrength(newPassword).color} ${getPasswordStrength(newPassword).width}`}
                  />
              </View>
            </View>
          ) : null}
          <View className="pt-1 pb-3 px-4">

        <Text className='leading-[21px] h-[21px] font-normal text-sm sont-sans text-custom-purple2'>Minimum 8 characters, 1 number</Text>
          </View>




        <PasswordInput
          label="Confirm New Password"
          value={confirmedPassword}
          onChangeText={(text) => handlePassChange(text, setNewPassword)}
          placeholder="Confirm your new password"
          maxLength={16}
          inputRef={confirmPasswordRef}
          isLast={false}
          />

          </View>
        <View>

        <ContinueButton
        title="Update Password"
        gradient
        />
        <TouchableOpacity
        className="pt-1 pb-3 px-4"
        onPress={undefined}
        >
          <Text className="font-sans font-normal text-sm text-custom-purple2 self-center">Forgot your current password?</Text>
        </TouchableOpacity>
        <View className="h-5"/>

        </View>





      </ScrollView>
    </KeyboardWrapper>
  )
}
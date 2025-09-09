import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useRouter } from "expo-router";
import HeaderBar from "@components/HeaderBar";
import ContinueButton from "@components/WideButton";
import KeyboardWrapper from "@components/FormScreen";
import {CrossIcon} from "@assets/icons/icons";

export default function Logout() {
  return (
    <KeyboardWrapper>
      <ScrollView>
        <HeaderBar
          title=""
          RightIcon={<CrossIcon />}
        />
        <View className="h-[88px] pt-5 px-4 pb-2 ">
          <Text className="  h-15 font-bold text-2xl leading-15 text-custom-blue">Are you sure you want to log out?</Text>
        </View>
        <ContinueButton
          title="Log Out"
          gradient
        />
        <ContinueButton
          title="Cancel"
          buttonStyle={{ backgroundColor: "#EBE8F2", marginHorizontal: 16 }}
          textStyle={{ color: '#120D1C' }}
          onPress={() => undefined}
        />
      </ScrollView>
    </KeyboardWrapper>
  )
}
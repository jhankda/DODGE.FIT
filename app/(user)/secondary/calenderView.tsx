import React  from "react";
import { View, StyleSheet, } from "react-native";
import { useRouter } from "expo-router";
import {ArrowLeft} from "@assets/icons/icons";
import HeaderBar from "@components/HeaderBar";
import KeyboardWrapper from "@components/FormScreen";
import ClassCalendar from "@components/classCalendar";

export default function CalenderView() {
  const router  = useRouter();
  return (
    <KeyboardWrapper>
      <View
        style={styles.container}
      > 
      <HeaderBar
      title="Class Calendar"
      LeftIcon={<ArrowLeft width={24} height={24} fill={"#120F1A"} />}
      onLeftPress={()=>{
        router.canGoBack()?router.back():router.replace('(user)');
      }}
      />

      <ClassCalendar/>


      

      </View>
    </KeyboardWrapper>
  )
}
const styles = StyleSheet.create({
  container:{
    height:1674,
    flex:1
  }
})


import { View,Text } from "react-native"

type SummaryBoxProps = {
  T:string,
  V:string,

}
export default function SummaryBox ({T,V}:SummaryBoxProps){
   const box = 'rounded-xl border p-6 gap-2 flex-1 min-w-[158px] border-custom-border-gray2'
  const text1  = "h-6 font-sans font-medium text-base leading-6 text-custom-blue";
  const text2  ="h-[30px] font-sans font-bold text-2xl text-custom-blue leading-[30px]";
  return (
    
              <View className={box}>
                <Text className={text1}>{T}</Text>
                <Text className={text2}>{V}</Text>
            </View>
  )
}
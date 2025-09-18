import { TouchableOpacity, View, Text } from "react-native"
import { ArrowRight } from "@assets/icons/icons"
type ActionListProps = {
  title: string,
  LeftIcon: React.ReactNode,
  onPress?: () => void,
  notArrow?:boolean
}

export default function  Account_Action  ({ title, LeftIcon, onPress, notArrow }: ActionListProps) {
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
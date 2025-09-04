import { TouchableOpacity,Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";

type smallButtonProps = {
  title: string,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  onPress?: () => void,
  gradient?:boolean
}

export default function  SmallButton  ({ title, leftIcon, rightIcon, onPress,gradient=false }: smallButtonProps) {
  return (
    <TouchableOpacity className="self-start pt-3" onPress={onPress ? onPress : undefined}>
      <LinearGradient
        colors={gradient?["#8C66E3", "#2900F3"]:["#EDE8F2","#EDE8F2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 2 }}
        className="h-8 px-4 rounded-full flex-row items-center justify-center"
      >
        {leftIcon}
        <Text className={`text-sm font-medium ${gradient?'text-custom-off-white':'text-custom-blue'} mr-2 leading-[21px]`}>
          {title}
        </Text>
        {/* <A> */}
        {rightIcon}
      </LinearGradient>
    </TouchableOpacity>
  )
}
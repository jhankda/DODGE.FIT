import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ContinueButton,
  KeyboardWrapper,
  LabeledInput,
  RoleSelector,
} from "@components/index";
import { useLogin } from "@hooks/useSignIn";

export default function LoginScreen() {
  const [role, setRole] = useState<"User" | "Coach" | "Scanner Device">("User");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [input, setInput] = useState("");

  const [password, setPassword] = useState<string | undefined>();
  const { mutate: login, isPending, error } = useLogin();

  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const router = useRouter();
  type Role = "User" | "Coach" | "Scanner Device";
  const roles: Role[] = ["User", "Coach", "Scanner Device"];

  const handleSignUp = () => {
    router.push("/signUp");
  };

  const HandleLogin = () => {

    if (!email && !phoneNumber) {
      emailRef.current?.focus();
      console.log("Invalid input");
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    login({
      ...(phoneNumber ? { phoneNo: phoneNumber } : {}),
      ...(email ? { email } : {}),
      password,
      role,
    });
  };

  const handleChange = (text: string) => {
    setInput(text);
    setEmail("");
    setPhoneNumber("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,15}$/;

    if (emailRegex.test(text)) {
      setEmail(text);
    } else if (phoneRegex.test(text)) {
      setPhoneNumber(text);
    }
  };

  return (
    <KeyboardWrapper>
      <ScrollView
        className="flex-1 bg-white flex-grow"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow:1}}
      >
        <View className="bg-black h-[218px] items-center border border-black">
          <Image
            source={require("../../assets/5704763513866df30b54994f20a78ec4bbb793ce.png")}
            className="h-[218px] w-full"
            resizeMode="contain"
          />
        </View>

        <View className="py-5 px-4 items-center">
          <Text className="text-2xl font-bold text-black">Welcome Back!</Text>
        </View>

        <View className="px-4 py-4">
          <Text className="text-lg font-bold text-black">Continue as</Text>
        </View>

        <RoleSelector
          roles={roles.map((role) => ({ label: role }))}
          selectedRole={role}
          onSelect={(role) => setRole(role)}
        />

        <LabeledInput
          label="Phone number or email"
          value={input}
          onChangeText={handleChange}
          placeholder="Enter your phone number or email"
          inputRef={emailRef}
          onNext={() => {
            passwordRef.current?.focus();
          }}
          keyboardType="email-address"
        />
        <LabeledInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          inputRef={passwordRef}
          isLast
        />

        <ContinueButton title={isPending?"Signing In ...":"Sign In"} gradient onPress={isPending?undefined:HandleLogin} />

        <TouchableOpacity
          className="px-3 pt-1 pb-3"
          onPress={() => {
            router.push("/forgotPassword");
          }}
        >
          <Text className="text-custom-purple-text text-sm font-normal">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <View className="mt-auto py-3">
          <Text className="text-center text-sm font-normal text-custom-purple-text">
            Don’t have an account?
            <Text
              className="text-custom-purple-text"
              onPress={handleSignUp}
            >{` Sign Up`}</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}

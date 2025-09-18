import { useMutation } from "@tanstack/react-query";
import { loginApi, LoginPayload, forgotPassApi, ForgotPassPayload, verifyPayload, verifyAPI, resetPassPayload, resetPassAPI, signUpPayload, signUpAPI } from "@api/signIn";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";


export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.session_token);
      await SecureStore.setItemAsync("role", data.role);
      switch (data.role) {
        case "User":
          router.replace("(user)/tabs");
          break;
        case "Coach":
          router.replace("/(coach)/tabs");
          break;
        case "Scanner Device":
          router.replace("/(scanner)/scanScreen");
          break;
        default:
          break;
      }
      Toast.show({
        position:'bottom',
        type:'success',
        text2:'Welcome Back',
        text2Style:{fontSize:16,fontFamily:'space-grotesk',color:'#69598C'}
      })
    },
    onError: (error: any) => {
      Toast.show({
        position:'bottom',
        type:"error",
        text1:error.message || "Login Failed"
      })
    },
  });
};


export function useforgotPass() {

  return useMutation({
    mutationFn: (payload: ForgotPassPayload) => forgotPassApi(payload),
    onSuccess: async (payload) => {
      if (payload.email) await SecureStore.setItemAsync("email", payload.email);
      if (payload.phoneNo) await SecureStore.setItemAsync("phoneNo", payload.phoneNo);
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
};

export function useVerify() {

  return useMutation({
    mutationFn: (payload: verifyPayload) => verifyAPI(payload),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("pass_regenrate_token", data.pass_regenrate_token);
    },
    onError: (error: any) => {
      console.error("verification Failed:", error.message);
    },
  });
};

export function useResetPass() {
  const router = useRouter()
  return useMutation({
    mutationFn: async (payload: { newPassword: string }) => {
      const token = await SecureStore.getItemAsync("pass_regenrate_token");

      if (!token) throw new Error("No reset token found");

      return resetPassAPI({ ...payload, token });
    },
    onSuccess: async () => {
      await SecureStore.deleteItemAsync("pass_regenrate_token");
      router.dismissAll()
      console.log("YAHA")
      router.replace("/signIn")
    },
    onError: (error: any) => {
      console.error("Password reset failed:", error.message);
    },
  });
}

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: signUpPayload) => signUpAPI(payload),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("signUp_token", data.pass_regenrate_token)
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
};

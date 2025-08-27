import { useMutation } from "@tanstack/react-query";
import { loginApi, LoginPayload, forgotPassApi, ForgotPassPayload, verifyPayload, verifyAPI, resetPassPayload, resetPassAPI } from "@api/signIn";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.session_token);
      await SecureStore.setItemAsync("role", data.role);
      console.log("Success");

      if (data.role === "user") router.replace("/tabs/userDashboard");
      if (data.role === "coach") router.replace("/(coach)");
      if (data.role === "admin") router.replace("/(admin)");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
};


export function useforgotPass() {
  const router = useRouter();

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
  const router  = useRouter()
  return useMutation({
    mutationFn: async (payload:{newPassword:string}) => {
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

import { useMutation } from "@tanstack/react-query";
import { loginApi, LoginPayload } from "@api/signIn";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("role", data.role);

      if (data.role === "user") router.replace("/(user)");
      if (data.role === "coach") router.replace("/(coach)");
      if (data.role === "admin") router.replace("/(admin)");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
}

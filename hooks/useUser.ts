import { useQuery } from "@tanstack/react-query";
import { fetchClassApi, fetchClassDetailsApi } from "@api/user";
import * as SecureStore from "expo-secure-store";
import {ClassDetail, ClassItem} from '@schemas/user.schema'


export function useFetchClassList() {
  console.log("fetch")
  return useQuery<ClassItem[], Error>({
    queryKey: ["classList"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchClassApi(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
export function useFetchClassDetailsList() {
  console.log("fetch")
  return useQuery<ClassDetail, Error>({
    queryKey: ["classDetail"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchClassDetailsApi(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};

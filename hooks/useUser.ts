import { useQuery } from "@tanstack/react-query";
import { addWorkout, fetchClassApi, fetchClassDetailsApi, fetchInvoiceList, fetchUserProfile, fetchWorkout, fetchWorkoutList, updateWorkout, updateWorkoutPayload, workoutPayload } from "@api/user";
import * as SecureStore from "expo-secure-store";
import {ClassDetail, ClassItem, workoutLog, workList, invoice} from '@schemas/user.schema'
import { useMutation } from "@tanstack/react-query";


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
export function useFetchClassDetailsList(id:string) {
  console.log("fetch")
  return useQuery<ClassDetail, Error>({
    queryKey: ["classDetail"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchClassDetailsApi(token,id);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};


export function useFetchUserProfile() {
  console.log("fetchProfile")
  return useQuery<ClassDetail, Error>({
    queryKey: ["Profile"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchUserProfile(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
export function useFetchWorkout() {
  console.log("fetchWorkout")
  return useQuery<workoutLog, Error>({
    queryKey: ["workout"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchWorkout(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};

export function useAddWorkout() {
  const token = ''
  return useMutation({
    mutationFn: (payload: workoutPayload) => addWorkout(payload,token),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
};

type workoutMutationVariable = {
  id:string
} & updateWorkoutPayload

export function useUpdateWorkout() {
  const token = ''
  return useMutation({
    mutationFn: ({id,...payload}:workoutMutationVariable) => updateWorkout(payload,token,id),
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });
};

export function useFetchWorkoutList() {
  console.log("fetchWorkout")
  return useQuery<workList, Error>({
    queryKey: ["workoutList"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchWorkoutList(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
export function useFetchInvoiceList() {
  console.log("fetchWorkout")
  return useQuery<invoice[], Error>({
    queryKey: ["invoiceList"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchInvoiceList(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
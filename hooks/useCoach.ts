import { useQuery } from "@tanstack/react-query";
import { fetchClassApi, fetchClassDetail, fetchCoachProfile, fetchEnrolledStudents } from "@api/coach";
import * as SecureStore from "expo-secure-store";
import { allStudents, ClassDetail, ClassList, coacProfile } from "@schemas/coach.schema";
import { useMutation } from "@tanstack/react-query";

export function useFetchClassList() {
  console.log("fetch")
  return useQuery<ClassList[], Error>({
    queryKey: ["classListCoach"],
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


export function useFetchClassDetail() {
  console.log("fetchDetails")
  return useQuery<ClassDetail, Error>({
    queryKey: ["classDetailCoach"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchClassDetail(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};

export function useFetchEnrolledStudents(date?:string,id?:string) {
  return useQuery<allStudents, Error>({
    queryKey: ["AllStudents",date,id],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"
      if (!token) throw new Error("No token found");

      return fetchEnrolledStudents(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};

export function useFetchProfile() {
  return useQuery<coacProfile, Error>({
    queryKey: ["CoachProfile"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"
      if (!token) throw new Error("No token found");

      return fetchCoachProfile(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
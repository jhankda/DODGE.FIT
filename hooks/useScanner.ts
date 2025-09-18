import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { fetchScannerClasses } from "@api/scanner";
import { useMutation } from "@tanstack/react-query";
import { Classes } from "@schemas/scanner.schema";


export function useFetchScannerClasses() {
  return useQuery<Classes, Error>({
    queryKey: ["ScannerClasses"],
    queryFn: async () => {
      // const token = await SecureStore.getItemAsync("AUTH_TOKEN");
      const token="harsh"

      if (!token) throw new Error("No token found");

      return fetchScannerClasses(token);
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false
  });
};
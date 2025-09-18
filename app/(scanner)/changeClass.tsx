import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { HeaderBar, KeyboardWrapper, LabeledInput } from "@components/index";
import { ArrowLeft, LogoutIcon } from "@assets/icons/icons";
import { useFetchScannerClasses } from "@hooks/useScanner";
import { Class } from "@schemas/scanner.schema";
import { formatClassTime } from "@utils/filterByStatus";
import * as SecureStore from "expo-secure-store";


export default function ChangeClasses() {
  const { data, isPending, error } = useFetchScannerClasses()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [classes, SetClasses] = useState<Class[]>([])

  useEffect(() => {
    if (data?.Class) {
      SetClasses(data.Class);
    } else {
      SetClasses([]);
    }
  }, [data]);

  const HandleLogout = async () => {
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("role")
    router.replace('(auth)/signIn');
  }



  const filteredClass = useMemo(() => {
    return (classes ?? []).filter((s) =>
      (s.name ?? "").toLowerCase().includes(search.toLowerCase())
    );
  }, [classes, search]);

  console.log("HJWDBJ", data);
  console.log("HJWDBJ", filteredClass);

  const renderItem = ({ item }: { item: Class }) => {
    console.log(item?.startDate)
    return (
      <View className="flex-row min-h-18 items-center py-3 justify-between">
        <View>
          <Text className="h-6 font-medium text-base leading-6 text-custom-blue2">{item.name}</Text>
          <Text className="h-[21px] font-normal text-sm leading-[21px] text-[#4D479E]">{formatClassTime(item.startDate, item.endDate, "coach")}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push({
          pathname: '(scanner)/scanScreen',
          params: item
        })}>
          <View className="flex-row h-8 w-[84px] justify-center min-w-21 max-w-[480px] px-4 rounded-xl bg-custom-icon-bg">
            <Text className="font-medium text-base h-[21px] leading-[21px] self-center">Select</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View>
      <HeaderBar
        title="Change Class"
        LeftIcon={<ArrowLeft />}
        onLeftPress={() => router.canGoBack() ? router.back() : undefined}
        RightIcon={<LogoutIcon style={{ Right: 1 }} />}
        onRightPress={HandleLogout}
      />

      <View>
        <LabeledInput
          placeholder="Search Class name"
          value={search}
          onChangeText={setSearch}
          inputStyle={{ borderWidth: 1, backgroundColor: '#F7F7FC' }}
        />
      </View>

      <FlatList
        data={filteredClass}
        renderItem={renderItem}
        keyExtractor={(e) => e.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-6">
            {search ? "No classes match your search" : "No classes available"}
          </Text>
        }
      />

    </View>
  )
}
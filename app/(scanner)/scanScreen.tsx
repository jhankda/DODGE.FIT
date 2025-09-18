import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { HeaderBar } from "@components/index";
import { SettingIcon, ArrowLeft } from "@assets/icons/icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFetchScannerClasses } from "@hooks/useScanner";
import { Class } from "@schemas/scanner.schema";
import { formatClassTime } from "@utils/filterByStatus";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function QRScannerScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<Class>();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const { data: classData, isPending, error } = useFetchScannerClasses()
  const [currentClass, setCurrentClass] = useState<Class>();
  const [cameraActive, setCameraActive] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setCameraActive(true);

      return () => {
        setCameraActive(false);
      };
    }, []))

  useEffect(() => {
    if (params?.id) {
      setCurrentClass(params)
    } else if (classData?.Class?.length) {
      setCurrentClass(classData.Class[0])
    }
  }, [params?.id, classData])

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
  };

  if (!permission) {
    return <Text className="text-center text-base">Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center px-5 bg-gray-100">
        <Text className="text-center text-lg mb-4">
          Camera permission is required to scan QR codes.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="px-5 py-3 bg-blue-500 rounded-xl"
        >
          <Text className="text-white font-semibold text-base">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-between">

      <View>
        <HeaderBar
          title="Dodge.fit Scanner"
          RightIcon={<SettingIcon style={{}} />}
          onRightPress={() => router.push('./changeClass')}
        />
        <View className=" pt-1 justify-center px-4 pb-3 ">
          <Text className="h-6 font-sans font-normal text-base self-center">Scan your QR code to mark attendance</Text>
        </View>

        <View className="justify-center px-5 bg-gray-100">
          <View className=" aspect-[358/239] rounded-2xl overflow-hidden bg-black shadow-lg">
            <CameraView
              key={cameraActive.toString()}
              className="flex-1"
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
          </View>



          {scanned && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              className="mt-6 px-5 py-3 bg-custom-purple8 rounded-xl"
            >
              <Text className="text-white font-semibold text-base">Scan Again</Text>
            </TouchableOpacity>
          )}

        </View>


      </View>
      <View className="pt-1 px-4 pb-3  self-center items-center">
        {currentClass && <Text className="flex-wrap text-center w-[80vw] font-bold text-sm text-custom-purple8 ">{currentClass?.name} | {formatClassTime(currentClass.startDate, currentClass.endDate, "coach")} |{formatClassTime(currentClass?.startDate, currentClass?.startDate, "longDate")}  | {new Date().toLocaleTimeString()}</Text>}
        <Text className="flex-wrap font-bold text-sm text-custom-purple8"></Text>
      </View>
      {scanned && (
        <View className="h-full flex-1 p-4 z-10 absolute  justify-center items-center self-center  bg-custom-icon-bg bg-opacity-20">
          <View className="aspect-[3/4] shadow elevation-4 justify-evenly shadow p-4 w-full rounded-2xl bg-white ">
            <TouchableOpacity
              onPress={() => setScanned(!scanned)}
              className="h-7 w-7 justify-center items-center rounded-2xl bg-custom-border-gray"
            >
              <ArrowLeft />
            </TouchableOpacity>
            <View className="aspect-[1] w-[120px] self-center justify-center  rounded-[64px] bg-custom-green-dot">
              <Image
                source={{ uri: '' }}
                className="aspect-[1] self-center w-[100px] bg-custom-icon-bg rounded-[64px] "
              />
            </View>
            <Text className="py-2 font-bold text-2xl self-center text-custom-green-dot">Success</Text>
            <Text className="py-1 font-bold text-3xl self-center text-custom-heading">Hi! Harsh</Text>
            <Text className="py-1font-sans font-normal text-sm text-custom-purple8 self-center">{new Date().toLocaleTimeString()}</Text>
            <Text className="py-4 font-sans w-3/4 text-center font-normal text-sm text-custom-purple8 self-center">Your Attendance for class has been Marked</Text>
          </View>
        </View>
      )}
    </View>
  );
}
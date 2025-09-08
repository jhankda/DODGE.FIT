import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadBox() {
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    name: string;
  } | null>(null);

  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage({
        uri: asset.uri,
        name: asset.fileName || "selected_image.jpg",
      });
    }
  };

  return (
      <TouchableOpacity
        onPress={pickImage}
        className="flex-1  border-dashed border-2 border-custom-border-gray2  rounded-lg p-14 "
      >
        {selectedImage ? (
          <View className="items-center">
            <Image
              source={{ uri: selectedImage.uri }}
              className="w-20 h-20 rounded-md mb-2"
            />
            <Text className="text-[#120F1A] font-bold text-base text-center">
              {selectedImage.name}
            </Text>
          </View>
        ) : (
          <Text className="text-[#120F1A] font-bold text-lg text-center">
            Upload from gallery or files
          </Text>
        )}
      </TouchableOpacity>
  );
}

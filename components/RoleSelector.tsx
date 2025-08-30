// components/RoleSelector.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type RoleSelectorProps<T extends string> = {
  roles: T[];
  selectedRole: T;
  onSelect: (role: T) => void;
};

export default function RoleSelector<T extends string>({
  roles,
  selectedRole,
  onSelect,
}: RoleSelectorProps<T>) {
  return (
    <View className="h-14 px-3 flex-row gap-3 items-center">
      {roles.map((role) => (
        <TouchableOpacity
          key={role}
          className={`h-8 px-4 rounded-xl justify-center items-center ${
            selectedRole === role ? "bg-purple-200" : "bg-custom-button-bg"
          }`}
          onPress={() => onSelect(role)}
        >
          <Text className="font-sans text-sm font-medium leading-[21px] text-[#120F1A]">{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

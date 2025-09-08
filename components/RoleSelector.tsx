import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

type RoleItem<T extends string> = {
  label: T;
  icon?: React.ReactNode; // optional icon
};

type RoleSelectorProps<T extends string> = {
  roles: RoleItem<T>[];
  selectedRole: T;
  onSelect: (role: T) => void;
};

export default function RoleSelector<T extends string>({
  roles,
  selectedRole,
  onSelect,
}: RoleSelectorProps<T>) {
  return (
    <View className="h-14">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, alignItems: "center" }}
      >
        {roles.map((role) => (
          <TouchableOpacity
            key={role.label}
            className={`h-8 px-4 mr-3 rounded-xl flex-row items-center justify-center ${
              selectedRole === role.label
                ? "bg-purple-200"
                : "bg-custom-button-bg"
            }`}
            onPress={() => onSelect(role.label)}
          >
            {/* Icon placeholder keeps alignment consistent */}
            {role.icon && (
              <View className="w-4 h-4 mr-2 items-center justify-center">
                {role.icon}
              </View>
            )}
            <Text className="font-sans text-sm font-medium leading-[21px] text-custom-blue">
              {role.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

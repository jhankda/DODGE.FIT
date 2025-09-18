import React from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";

type FilterOption = "all" | "present" | "absent";

interface FilterSelectorProps {
  selected: FilterOption;
  onSelect: (value: FilterOption) => void;
}

export default function FilterSelector({ selected, onSelect }: FilterSelectorProps) {
  const options = [
    { key: "all", label: "All" },
    { key: "present", label: "Present only" },
    { key: "absent", label: "Absent only" },
  ] as const;

  return (
    <View className="w-[390px] h-[64px] flex-row items-center px-4">
      <View className="flex-row items-center justify-between bg-[#EBE6F5] rounded-xl p-1 w-[358px] h-10">
        {options.map((option) => {
          const isActive = selected === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              onPress={() => onSelect(option.key)}
              className={`flex-1 h-8 rounded-xl justify-center items-center ${
                isActive ? "bg-[#FAF7FC]" : ""
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: "#FAF7FC",
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: 4, // <- Android shadow
                      zIndex: 10, // <- ensure it draws above others
                    }
                  : {}
              }
            >
              <Text
                className={`text-[14px] font-medium ${
                  isActive ? "text-[#120D1C]" : "text-[#61479E]"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

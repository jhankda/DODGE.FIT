import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  label?:string;
  initialValue?:string;
  onSelect?: (value: string) => void;
  icon?: React.ReactNode;
  styleOverrides?: {
    container?: object;
    label?: object;
    inputBox?: object;
    inputText?: object;
    modalBox?: object;
    option?: object;
    optionText?: object;
  };
}

export default function DropdownInput({
  options,
  placeholder = "Please choose an option",
  label='Signing up as',
  onSelect,
  initialValue,
  icon,
  styleOverrides = {},
}: DropdownProps) {
  const [selected, setSelected] = useState<string | null>(initialValue||null);
  const [visible, setVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setVisible(false);
    if (onSelect) onSelect(option);
  };

  return (
    <View style={[styles.signUpRoleContainer, styleOverrides.container]}>
      <View style={styles.signUpRole}>
        <View style={styles.signUpRoleTextContainer}>
          <Text style={[styles.signUpRoleText, styleOverrides.label]} className="font-sans" >
            {label}
          </Text>
        </View>
        <View style={styles.signUpRoleInputContainer}>

        <TouchableOpacity
          style={[styles.signUpRoleInputBox, styleOverrides.inputBox]}
          onPress={() => setVisible(true)}
        >
          <Text style={[styles.signUpRoleInputText, styleOverrides.inputText]}>
            {selected ? selected : placeholder}
          </Text>
          {icon}

        </TouchableOpacity>
        </View>
      </View>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.modalBox, styleOverrides.modalBox]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, styleOverrides.option]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.optionText, styleOverrides.optionText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpRoleContainer: {
    // flexDirection:"row",
    width:"auto",
    height:112,
    maxWidth:"auto",
    paddingHorizontal:16,
    paddingVertical:12,
    gap:16
  },
  signUpRole: {
    width:"auto",
    height:88,
    minWidth:160
  },
  signUpRoleTextContainer: {
    width:"auto",
    height:32,
    paddingBottom:8,
  },
  signUpRoleText: {
    width:"auto",
    height:24,
    fontSize: 16,
    lineHeight:24,
    fontWeight: "500",
    color: "#120F1A",
    letterSpacing:0
  },
  signUpRoleInputContainer:{
    width:"auto",
    height:56,
    minWidth:160,
  },
  signUpRoleInputBox: {
    flex:1,
    width:"auto",
    height:56,
    borderRadius:8,
    backgroundColor:"#EBE8F2"
  },
  signUpRoleInputText: {
    alignSelf:"flex-start",
    width:"auto",
    height:24,
    top:16,
    left:14,
    fontWeight:"400",
    lineHeight:24,
    letterSpacing:0,
    fontSize: 16,
    color: "#66578F",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#222",
  },
});

import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  placeholder,
  icon,
  labelStyle,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg font-JakartaSemiBold mb-3 mx-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row items-center bg-gray-100 rounded-full p-2  w-full ${containerStyle}`}
          >
            {icon && <Image source={icon} className={`mx-2 w-6 h-6 ${iconStyle}`} />}
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              className={`w-10/12 rounded-full text-[15px] ${inputStyle}`}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;

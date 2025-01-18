import { View, Text, Image } from "react-native";
import React from "react";
import CustomBtn from "./CustomBtn";
import { icons } from "@/constants";

const OAuth = () => {
  const oAuthHandler = async () => {
    console.log("OAuth Handler");
  };
  return (
    <View>
      <View className="flex flex-row items-center justify-center mt-6 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>
      <CustomBtn
        title="Log In with Google"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        className="mt-5 w-full shadow-none flex items-center justify-center"
        bgVariant="outline"
        textVariant="primary"
        onPress={() => {
          oAuthHandler();
        }}
      />
    </View>
  );
};

export default OAuth;

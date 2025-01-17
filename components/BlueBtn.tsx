import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const BlueBtn = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity className="bg-[#0286FF] rounded-full w-1/2 p-5 mb-6 flex justify-center items-center">
      <Text className="text-lg font-JakartaBold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default BlueBtn;

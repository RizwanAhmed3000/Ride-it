import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import BlueBtn from "@/components/BlueBtn";

const Onboarding = () => {
  const swriperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white px-6">
      <TouchableOpacity
        className="w-full flex justify-end items-end py-5"
        onPress={() => {
          router.replace(`/(auth)/sign-up`);
        }}
      >
        <Text className="text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swriperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex justify-center items-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row justify-center items-center w-full mt-10">
              <Text className="text-3xl font-bold text-black mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md text-center mx-10 font-JakartaSemiBold mt-3 text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <BlueBtn title="Next"/>
    </SafeAreaView>
  );
};

export default Onboarding;

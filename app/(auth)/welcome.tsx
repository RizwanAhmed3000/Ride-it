import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomBtn from "@/components/CustomBtn";

const Onboarding = () => {
  // let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;
  const swriperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const customHeight = deviceHeight / 2.8;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white px-6 py-3">
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
              style={{ width: "100%", height: customHeight }}
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

      <CustomBtn
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        onPress={() => {
          if (isLastSlide) {
            router.replace(`/(auth)/sign-up`);
          } else {
            swriperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;

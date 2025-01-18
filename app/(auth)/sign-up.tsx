import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomBtn from "@/components/CustomBtn";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;
  // console.log(deviceHeight / 2.5)
  // console.log(deviceWidth)

  const signUpHandler = async () => {
    console.log(form);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your account
          </Text>
        </View>
        <View className="px-5 pb-3">
          <InputField
            label={"Name"}
            placeholder={"Enter your name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomBtn
            title={"Sign Up"}
            className="mt-5"
            onPress={signUpHandler}
          />
          <Link href={`/sign-in`} className="mt-10 text-lg text-center text-general-200">
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

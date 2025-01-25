import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomBtn from "@/components/CustomBtn";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const router = useRouter();
  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    code: "",
    error: "",
    status: "default",
  });
  const [successModal, setSuccessModal] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  // console.log(deviceHeight / 2.5)
  // console.log(deviceWidth)

  const signUpHandler = async () => {
    // console.log(form);
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        // username: form.name,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({ ...verification, status: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, status: "success" });
        // router.replace("/(root)/(tabs)/home");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification failed!!",
          status: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        status: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
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

          {/* oauth */}
          <OAuth />

          <Link
            href={`/sign-in`}
            className="mt-10 text-lg text-center text-general-200"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
        {/* Verification modal */}
        <ReactNativeModal
          isVisible={verification.status === "pending"}
          onModalHide={() => {
            if (verification.status === "success") setSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl text-center font-JakartaExtraBold text-black">
              Verification
            </Text>
            <Text className="font-Jakarta text-center mt-3 mb-5">
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="1234"
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-center text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomBtn
              title="Verify Email"
              className="mt-5 bg-success-500"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={successModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold text-black">
              Verified
            </Text>
            <Text className="text-base text-center text-general-200 mt-3">
              You have successfully Verified your account
            </Text>
            <CustomBtn
              title="Go to Home"
              className="mt-5"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;

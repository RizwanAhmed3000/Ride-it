import { View, Text } from "react-native";
import React from "react";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
//   console.log(ride);
  return (
    <View>
      <Text>{ride.driver.first_name}</Text>
    </View>
  );
};

export default RideCard;

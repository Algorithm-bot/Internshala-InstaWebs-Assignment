import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmailValidation from "./EmailValidation";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Flashcards">
        <Stack.Screen
          name="EmailValidation"
          component={EmailValidation}
          options={{ headerShown: false }}
        />
        

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

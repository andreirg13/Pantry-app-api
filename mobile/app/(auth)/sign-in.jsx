import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import {Image} from 'expo-image'

import { COLORS } from '../../constants/colors';
import {authStyles} from "../../assets/styles/auth.styles"
import {Ionicons} from "@expo/vector-icons"


const SignInScreen = () => {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.")
      return
    }
    if(!isLoaded) return;

    setLoading(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password
        })
         if (result.status === 'complete') {
          await setActive({session:result.createSessionId})
        } else {
          Alert.alert("Error", "Sign in failed hello ");
          console.error(JSON.stringify(signInAttempt, null, 2));

        }
    
    } catch (err){
      console.log("Raw error:", err);
      console.log("Error message:", err.message);
      console.log("Error code:", err.code);
      console.log("Errors array:", err.errors);
      
      // Better error display
      if (err.errors && err.errors.length > 0) {
          Alert.alert("Error", err.errors[0].message);
      } else if (err.message) {
          Alert.alert("Error", err.message);
      } else {
          Alert.alert("Error", "Sign in failed");
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
        
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          >

          <View style={authStyles.imageContainer}>
            <Image 
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/*FORM CONTAINER*/}
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter email"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/*PASSWORD INPUT */}
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter password"
              placeholderTextColor={COLORS.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={authStyles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              authStyles.authButton,
              loading && authStyles.buttonDisabled
            ]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={authStyles.buttonText}>
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>
            {/* Sign Up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignInScreen
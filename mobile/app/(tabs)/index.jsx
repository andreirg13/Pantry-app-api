import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { homeStyles, recipeCardStyles } from '../../assets/styles/home.styles';

const API_URL = 'http://192.168.0.210:5001';

const HomeScreen = () => {
  const router = useRouter();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const { user } = useUser();
  


   const fetchPantryItems = async () => {
      try {
        setLoading(true);
  
        // Call backend API
        const response = await fetch(`${API_URL}/api/pantry/${user.id}`);
        const data = await response.json();
  
        setIngredients(data); // Update state with backend data
      } catch (error) {
        console.error('Error fetching pantry:', error);
        Alert.alert('Error', 'Failed to load pantry items');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  
  const expiringSoon = ingredients.filter(item => item.isExpiringSoon).length;
  const lowStock    = ingredients.filter(item => /* your qty logic */ false).length;
  const ingredientNames = ingredients.map(item => item.name)
  return (
    <ScrollView
      style={homeStyles.container}
      contentContainerStyle={homeStyles.scrollContent}
    >
      {/* Welcome / Header */}
      <View style={homeStyles.welcomeSection}>
        <Text style={homeStyles.welcomeText}>
          Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}
        </Text>
        <Text style={homeStyles.welcomeSubtitle}>
          {expiringSoon} expiring soon • {lowStock} low-stock
        </Text>
      </View>

      {/* Generate Button */}
      {/* NOTE: you’ll need to add generateBtn & generateText to home.styles.js */}
      <View style={homeStyles.generateSection}>
        <TouchableOpacity
          style={[
            homeStyles.generateButton,
            ingredients.length === 0 && homeStyles.generateButtonDisabled
          ]}
          onPress={() => router.push({
            pathname: '/recipe-generator',
            params: { 
              ingredients: JSON.stringify(ingredientNames),
            }})}
          disabled={ingredients.length === 0}
          activeOpacity={0.8}
        >
          <Ionicons
            name="restaurant-outline"
            size={24}
            color="#fff"
          />
          <Text style={homeStyles.generateButtonText}>
            What's your next meal?
          </Text>
        </TouchableOpacity>
      </View>

      {/* (You can put a Featured section here) */}
      <View style={homeStyles.featuredSection}>
        {/* …your featured card(s) with homeStyles.featuredCard, featuredImageContainer, etc. */}
      </View>

      {/* Recipes Grid */}
      <View style={homeStyles.recipesSection}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>
            Your Recipes
          </Text>
        </View>
        <View style={homeStyles.recipesGrid}>
          {/* render rows: <View style={homeStyles.row}>…</View> */}
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
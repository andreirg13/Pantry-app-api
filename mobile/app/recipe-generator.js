import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { recipeGeneratorStyles as styles } from '../assets/styles/recipemaker.styles';


const API_URL = 'http://192.168.0.210:5001';

const RecipeGeneratorScreen = () => {
    const router = useRouter();
    const { user } = useUser();
    const params = useLocalSearchParams();

    // States
    const [ingredients, setIngredients] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    // Parse ingredients
    if (params.ingredients) {
        try {
            const parsedIngredients = JSON.parse(params.ingredients);
            setIngredients(parsedIngredients);
        } catch (error) {
            console.error('Error parsing ingredients:', error);
            setIngredients([]);
        }
    }
    
    // Parse priorities
    if (params.priorities) {
        try {
            const parsedPriorities = JSON.parse(params.priorities);
            setPriorities(parsedPriorities);
        } catch (error) {
            console.error('Error parsing priorities:', error);
            setPriorities([]);
        }
    }
}, [params.ingredients, params.priorities]);

    const filterOptions = [
    { id: 'strict-ingredients', label: 'Only what I have', icon: 'basket' },
    { id: 'quick', label: 'Under 30 mins', icon: 'timer' },
    { id: 'high-protein', label: 'High Protein', icon: 'barbell' },
    { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf' },
    { id: 'low-carb', label: 'Low Carb', icon: 'nutrition' },
    ];

    const toggleFilter = (filterId) => {
        setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
    };

    const generateRecipe = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/recipes/generate`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            userId: user.id,
            ingredients: ingredients,
            filters: selectedFilters,
            priorityIngredients: priorities
            }),
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);


        const data = await response.json();

        if (response.ok) {
            setGeneratedRecipe(data.recipe);
        } else {
        Alert.alert('Errrror', data.error || 'Failed to generate recipe hiiii');
        }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to generate recipe byeee');
        } finally {
        setLoading(false);
        }
    };

   return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Generate Recipe</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Selected Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Ingredients</Text>
          <View style={styles.ingredientsList}>
            {ingredients.map((ing, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientChipText}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Selected Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Ingredients </Text>
          <View style={styles.ingredientsList}>
            {priorities.map((ing, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientChipText}>{ing}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe Preferences</Text>
          <View style={styles.filtersContainer}>
            {filterOptions.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilters.includes(filter.id) && styles.filterButtonActive
                ]}
                onPress={() => toggleFilter(filter.id)}
              >
                <Ionicons 
                  name={filter.icon} 
                  size={20} 
                  color={selectedFilters.includes(filter.id) ? COLORS.white : COLORS.primary} 
                />
                <Text style={[
                  styles.filterText,
                  selectedFilters.includes(filter.id) && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generated Recipe Display */}
        {generatedRecipe && (
          <View style={styles.recipeContainer}>
            <Text style={styles.recipeTitle}>Your Recipe</Text>
            <Text style={styles.recipeContent} selectable={true}>
              {generatedRecipe}
            </Text>
            
            {/* Save Recipe Button */}
            <TouchableOpacity style={styles.saveButton}>
              <Ionicons name="bookmark-outline" size={20} color={COLORS.white} />
              <Text style={styles.saveButtonText}>Save Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Generate Button - Fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}
          onPress={generateRecipe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Ionicons name="restaurant" size={24} color={COLORS.white} />
              <Text style={styles.generateButtonText}>Generate Recipe</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default RecipeGeneratorScreen
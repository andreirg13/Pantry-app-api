import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  LayoutAnimation
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { pantryStyles } from '../../assets/styles/pantry.styles';
import { COLORS } from '../../constants/colors';
import AddItemModal from '../../components/AddItemModal';
import EditDetailsModal from '../../components/EditDetailsModal';

const API_URL = 'http://192.168.0.210:5001';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PantryScreen = () => {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [priorityIngredients, setPriorityIngredients] = useState([]);

  const categoryIcons = {
  'Dairy': 'ice-cream-outline',
  'Proteins': 'fish-outline',
  'Produce': 'leaf-outline',
  'Grains': 'bread-slice-outline',
};


  const { user } = useUser();

  useEffect(() => {
    if (user?.id) { // Only fetch if we have a user
      fetchPantryItems();
    }
  }, [user]); // Run whenever 'user' changes

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


  const groupedIngredients = ingredients.reduce((groups, item) => {
    const category = item.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  const allCollapsed = Object.keys(groupedIngredients).reduce((acc, category) =>  {
    acc[category] = true;
    return acc;
  }, {});

  // State for collapsed actions
  const [collapsedSections, setCollapsedSections] = useState({});

  
  useEffect(() => {
  const allCollapsed = Object.keys(groupedIngredients).reduce((acc, cat) => {
    acc[cat] = true;
    return acc;
  }, {});
  setCollapsedSections(allCollapsed);
}, [ingredients]); 

  const toggleSection = (category) => {
    LayoutAnimation.configureNext({
    duration: 200,                 // 200ms = quick but still noticeable
    update: { 
      type: LayoutAnimation.Types.easeInEaseOut, 
      property: LayoutAnimation.Properties.opacity 
    },
  });

    setCollapsedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }


 
  const togglePriority = (item) => {
  setPriorityIngredients(prev => 
    prev.some(ing => ing.id === item.id)
      ? prev.filter(ing => ing.id !== item.id)
      : [...prev, item]
  );
};




  const updateItem = async (updatedItem) => {
    try {
      const response = await fetch(`${API_URL}/api/pantry/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(updatedItem)
      })

      if (response.ok) {
        fetchPantryItems();
        Alert.alert('Success', 'Item updated!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/api/pantry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell backend we're sending a JSON
        },
        body: JSON.stringify({
          userId: user.id,
          ...newItem
        }),
      });

      if (response.ok) {
        fetchPantryItems();
        Alert.alert('Success', 'Item added to pantry!');
      } else {
        throw new Error ('Failed to add item')
      }
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  const removeIngredient = (item) => {
    Alert.alert(
      'Remove Ingredient',
      `Remove ${item.name} from pantry?`,
      [
        { text:'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/api/pantry/${item.id}`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                fetchPantryItems();  // Refresh list after delete
              } else {
                throw new Error('Failed to delete');
              } 
            } catch (error) {
              console.error('Error removing item:', error);
              Alert.alert('Error', 'Failed to remove item');
            }
          }

        }
      ]
    )
  };

  const generateRecipes = () => {
    if (ingredients.length === 0) {
      Alert.alert('Empty Pantry', 'Add some ingredients first!');
      return;
    }
    const ingredientNames = ingredients.map(item => item.name)
    const priorityNames = priorityIngredients.map(item => item.name);
    // Navigate to recipe generation screen
    router.push({
      pathname: '/recipe-generator',
      params: { 
        ingredients: JSON.stringify(ingredientNames),
        priorities: JSON.stringify(priorityNames)
       }
    });
  };

  const renderIngredient = ({ item }) => {
    const expired = item.isExpired;
    const expiringSoon = item.isExpiringSoon;

    return (
      <TouchableOpacity style={[
        pantryStyles.ingredientItem,
        expired && pantryStyles.expiredItem,
        expiringSoon && pantryStyles.isExpiringSoon,
      ]}
        onPress={() => {
          setSelectedItem(item);
          setShowEditDetailsModal(true);
        }}
        activeOpacity={0.4}
        >
        <View style={pantryStyles.ingredientInfo}>
          <Text style={[
            pantryStyles.ingredientName,
            expired && pantryStyles.expiredText
          ]}>
            {item.name}
          </Text>

          {item.quantity && (
            <Text style={pantryStyles.ingredientQuantity}>
              {item.quantity}
            </Text>
          )}

           {item.brand && (
            <Text style={pantryStyles.ingredientBrand}>
              {item.brand}
            </Text>
          )}

          <Text style={[
            pantryStyles.expirationText,
            expired && pantryStyles.expiredText,
            expiringSoon && pantryStyles.expiringSoon
          ]}>
            {expired ? 'Expired' : expiringSoon ? 
            (item.daysUntilExpiry === 0 ? 'Expires today' :
            `Expires in ${item.daysUntilExpiry} day${item.daysUntilExpiry > 1 ? 's' : ''}`) : 
            `Expires ${new Date(item.expiration).toLocaleDateString()}`
}
          </Text>
        </View>


        <TouchableOpacity onPress={() => !item.isExpired && togglePriority(item)}
          disabled={item.isExpired}
          >
          <Ionicons 
            name={priorityIngredients.some(ing => ing.id === item.id) ? "star" : "star-outline"} 
            size={20} 
            color={item.isExpired ? "#999" : "#FFD700"}   // Gold color
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeIngredient(item)}
          style={pantryStyles.removeButton}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>      

      </TouchableOpacity>
    )
  };

  const renderEmptyState = () => (
    <View style={pantryStyles.emptyState}>
      <Ionicons name="restaurant-outline" size={64} color={COLORS.textLight} />
      <Text style={pantryStyles.emptyTitle}>Your pantry is empty</Text>
      <Text style={pantryStyles.emptyDescription}>
        Add ingredients you have available to get personalized recipe suggestions
      </Text>
    </View>
  );

  if (loading && !refreshing) {
     return (
      <View style={[pantryStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10 }}>Loading your pantry...</Text>
      </View>
    );
  }
  return (
    
    <View style={pantryStyles.container}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={pantryStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={pantryStyles.header}>
            <Text style={pantryStyles.welcomeText}>My Pantry</Text>
            <Text style={pantryStyles.subtitle}>
              {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} available
            </Text>
          </View>

          {/* Add Item Button */}
          <View style={pantryStyles.inputSection}>
            <TouchableOpacity
              style={pantryStyles.addItemButton}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.white} />
              <Text style={pantryStyles.addItemButtonText}>Add Items</Text>
            </TouchableOpacity>
          </View>
          <View style={pantryStyles.ingredientsSection}>
          <Text style={pantryStyles.sectionTitle}>Your Ingredients</Text>
          
          {Object.keys(groupedIngredients).length === 0 ? (
            renderEmptyState()
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.entries(groupedIngredients).map(([category, items]) => (
                <View key={category} style={pantryStyles.categorySection}>
                  {/* Category Header */}
                  <TouchableOpacity 
                    style={pantryStyles.categoryHeader}
                    onPress={() => toggleSection(category)}
                    activeOpacity={0.7}
                  >
                    <Text style={pantryStyles.categoryTitle}>
                      {category} ({items.length})
                    </Text>
                    <Ionicons 
                      name={categoryIcons[category] || 'pricetag-outline'}
                      size={20} 
                      color={COLORS.textLight} 
                    />
                  </TouchableOpacity>
                  
                  {/* Category Items */}
                  {!collapsedSections[category] && (
                    <View style={pantryStyles.categoryItems}>
                      {items.map((item) => (
                        <View key={item.id}>
                          {renderIngredient({ item })}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        </ScrollView>

        {/* Generate Recipes Button - Fixed at bottom */}
        <View style={pantryStyles.generateSection}>
          <TouchableOpacity
            style={[
              pantryStyles.generateButton,
              ingredients.length === 0 && pantryStyles.generateButtonDisabled
            ]}
            onPress={generateRecipes}
            disabled={ingredients.length === 0}
            activeOpacity={0.8}
          >
            <Ionicons 
              name="restaurant" 
              size={24} 
              color={COLORS.white} 
            />
            <Text style={pantryStyles.generateButtonText}>
              Generate Recipes
            </Text>
          </TouchableOpacity>
        </View>
        {/* Add Item Modal */}
        <AddItemModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddItem={addItem}
        />
        <EditDetailsModal 
          visible={showEditDetailsModal}
          onClose={() => setShowEditDetailsModal(false)}
          onUpdateItem={updateItem}
          item={selectedItem}
        />
    </View>
  );
};

export default PantryScreen;
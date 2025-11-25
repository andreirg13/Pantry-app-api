import React, { useState } from 'react';
import { scaleFont, scalePadding, scaleSize } from '../constants/scale';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/colors';
import { useEffect } from 'react';

const EditDetailsModal = ({visible, onClose, onUpdateItem, item}) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        brand: '',
        expiration: new Date(),
        notes: '',
        category: '',
    });
    useEffect(() => {
        if (item && visible) {
            setFormData({
                name: item.name || '',
                quantity: item.quantity || '',
                brand: item.brand || '',
                expiration: item.expiration ? new Date(item.expiration) : new Date(),
                notes: item.notes || '', 
                category: item.category || 'Other',
            })
        }
    }, [item, visible]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    const categories = [
        'Produce',
        'Proteins',
        'Dairy & Eggs',
        'Grains & Pasta',
        'Seasonings & Spices',
        'Canned & Jarred',
        'Frozen',
        'Snacks & Sweets',
        'Beverages',
        'Other'
    ];

    const handleUpdateItem = () => {
        if (!formData.name.trim()) {
            Alert.alert('Missing Information', 'Please enter an item name');
            return;
        };

        const UpdatedItem = {
            name: formData.name.trim(),
            quantity: formData.quantity || '1',
            brand: formData.brand,
            expiration: formData.expiration,
            notes: formData.notes,
            category: formData.category,
        };

        onUpdateItem(UpdatedItem);
        onClose();
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setFormData({...formData, expiration: selectedDate})
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
       });
    };

    return (
        <Modal  
            visible={visible}
            animationType="slide"
            presentationStyle='pageSheet'
        >
            <View style={styles.modalContainer}>
                {/** Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Edit Item</Text>
                    <TouchableOpacity
                        onPress={handleUpdateItem}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveText}>Update</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/** Item Name */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Item Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='e.g., Chicken breast, Rice, Milk'
                            placeholderTextColor={COLORS.textLight}
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name:text})}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />
                    </View>

                    {/** Quantity */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput
                        style={styles.textInput}
                        placeholder="e.g., 2 lbs, 1 gallon, 500g"
                        placeholderTextColor={COLORS.textLight}
                        value={formData.quantity}
                        onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                        returnKeyType="next"
                        />
                    </View>
                    {/** Category */}
                    <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity
                        style={styles.dateButton}  // Reuse your date button style
                        onPress={() => setShowCategoryPicker(true)}
                    >
                        <Ionicons name="pricetag-outline" size={scaleSize(20)} color={COLORS.primary} />
                        <Text style={styles.dateText}>{formData.category || 'Select Category'}</Text>
                        <Ionicons name="chevron-down" size={scaleSize(20)} color={COLORS.textLight} />
                    </TouchableOpacity>
                    </View>

                    {/** Brand */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Brand (Optional)</Text>
                        <TextInput
                        style={styles.textInput}
                        placeholder="e.g., Great Value, Kirkland, Tyson"
                        placeholderTextColor={COLORS.textLight}
                        value={formData.brand}
                        onChangeText={(text) => setFormData({ ...formData, brand: text })}
                        autoCapitalize='words'
                        returnKeyType="next"
                        />
                    </View>

                    {/** Date */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Expiration Date</Text>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name='calendar-outline' size={scaleSize(20)} color={COLORS.primary} />
                            <Text style={styles.dateText}>{formatDate(formData.expiration)}</Text>
                            <Ionicons name="chevron-forward" size={scaleSize(20)} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>

                    {/* Notes */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Notes (Optional)</Text>
                        <TextInput
                        style={[styles.textInput, styles.notesInput]}
                        placeholder="Any additional notes..."
                        placeholderTextColor={COLORS.textLight}
                        value={formData.notes}
                        onChangeText={(text) => setFormData({ ...formData, notes: text })}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        />
                    </View>
                    </ScrollView>

                    {/** Date Picker */}
                    {showDatePicker && (
                        <DateTimePicker
                            value={formData.expiration}
                            mode="date"
                            display={Platform.OS ==='ios' ? 'spinner' : 'default'}
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                            textColor={COLORS.text}
                        >

                        </DateTimePicker>
                    )}

                    {/* Category picker */}
                    <Modal
                    visible={showCategoryPicker}
                    transparent={true}
                    animationType="slide"
                    >
                       
                        <TouchableOpacity 
                            style={styles.modalOverlay}
                            onPress={() => setShowCategoryPicker(false)}
                        >
                            <View style={styles.categoryPickerContainer}>
                            <Text style={styles.pickerTitle}>{formData.category || 'Select Category'}</Text>
                            <ScrollView>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                key={cat}
                                style={styles.categoryOption}
                                onPress={() => {
                                    setFormData({...formData, category: cat});
                                    setShowCategoryPicker(false);
                                }}
                                >
                                <Text style={styles.categoryOptionText}>{cat}</Text>
                                {formData.category === cat && (
                                    <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                                )}
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                            </View>
                        </TouchableOpacity>
                        
                    </Modal>                    

            </View>
        </Modal>
    )
}
const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scalePadding(20),
    paddingTop: scalePadding(60),
    paddingBottom: scalePadding(20),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cancelButton: {
    padding: scalePadding(8),
  },
  cancelText: {
    fontSize: scaleFont(16),
    color: COLORS.textLight,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(8),
    borderRadius: scaleSize(12),
  },
  saveText: {
    fontSize: scaleFont(16),
    color: COLORS.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: scalePadding(20),
  },
  fieldContainer: {
    marginBottom: scalePadding(24),
  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: scalePadding(8),
  },
  textInput: {
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(12),
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(12),
    fontSize: scaleFont(16),
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notesInput: {
    height: scaleSize(80),
    paddingTop: scalePadding(12),
  },
  dateButton: {
    backgroundColor: COLORS.card,
    borderRadius: scaleSize(12),
    paddingHorizontal: scalePadding(16),
    paddingVertical: scalePadding(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
},
dateText: {
    fontSize: scaleFont(16),
    color: COLORS.text,  // Make sure this is dark enough
    flex: 1,
    marginLeft: scalePadding(12),
    fontWeight: '500',  // Add this to make it bolder
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'flex-end',
},
categoryPickerContainer: {
  backgroundColor: COLORS.white,
  borderTopLeftRadius: scaleSize(20),
  borderTopRightRadius: scaleSize(20),
  paddingTop: scalePadding(20),
  paddingBottom: scalePadding(30),
  maxHeight: '50%',
},
pickerTitle: {
  fontSize: scaleFont(18),
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: scalePadding(20),
  color: COLORS.text,
},
categoryOption: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: scalePadding(15),
  paddingHorizontal: scalePadding(20),
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
},
categoryOptionText: {
  fontSize: scaleFont(16),
  color: COLORS.text,
},
};
export default EditDetailsModal;
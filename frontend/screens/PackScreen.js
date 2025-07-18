import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";

const initialItems = [
  { id: '1', label: 'Water (3-day supply)', checked: false },
  { id: '2', label: 'Non-perishable food', checked: false },
  { id: '3', label: 'Flashlight', checked: false },
  { id: '4', label: 'Batteries', checked: false },
  { id: '5', label: 'First-aid kit', checked: false },
  { id: '6', label: 'Medications', checked: false },
  { id: '7', label: 'Important documents (ID, passport, insurance)', checked: false },
  { id: '8', label: 'Cash', checked: false },
  { id: '9', label: 'Portable phone charger / power bank', checked: false },
  { id: '10', label: 'Multi-tool or Swiss army knife', checked: false },
  { id: '11', label: 'Clothing (extra set)', checked: false },
  { id: '12', label: 'Blanket or emergency space blanket', checked: false },
  { id: '13', label: 'Toiletries (toothbrush, toothpaste, wipes)', checked: false },
  { id: '14', label: 'Face masks / respirators', checked: false },
  { id: '15', label: 'Glasses or contact lenses', checked: false },
  { id: '16', label: 'Map of the local area', checked: false },
  { id: '17', label: 'Whistle (to signal for help)', checked: false },
  { id: '18', label: 'Baby supplies (if applicable)', checked: false },
  { id: '19', label: 'Pet supplies (if applicable)', checked: false },
  { id: '20', label: 'Keys (house, car)', checked: false },
];

export default function PackScreen() {
  const [items, setItems] = React.useState(initialItems);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked} : item
      )
    );  
  };

  const renderItem = ({item}) => {
    return (
    <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.item}>
      <Text style={styles.checkbox}>{item.checked ? '✅' : '⬜'}</Text>
      <Text style={[styles.label, item.checked && styles.checkedLabel]}>{item.label}</Text>
    </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Text style={styles.header}>
          Emergency Packing Guide <Text style={styles.emoji}>🎒</Text>
        </Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </KeyboardAvoidingView>
\
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0621",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 32,
  },
  listContainer: {
    backgroundColor: "#29186A",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label:{
    color: "white",
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    fontSize: 24,
    marginRight: 10,
  },
  checkedLabel: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  });
  
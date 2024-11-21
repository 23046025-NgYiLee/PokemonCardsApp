import React, { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNPickerSelect from 'react-native-picker-select';

const Stack = createNativeStackNavigator();

const categoryColors = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Grass: '#7AC74C',
  Electric: '#F7D02C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD',
};

const ListScreen = ({ navigation }) => {
  const [pokemonData, setPokemonData] = useState([
    {
      title: 'Electric',
      data: [
        {
          name: 'Pikachu',
          category: 'Electric',
          imageUrl:
              'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_60-2x.png',
        },
      ],
    },
    {
      title: 'Fire',
      data: [
        {
          name: 'Charmander',
          category: 'Fire',
          imageUrl:
              'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_70-2x.png',
        },
      ],
    },
  ]);

  const handleAddPokemon = () => {
    navigation.navigate('AddEdit', {
      onSave: (newPokemon) => {
        const sectionIndex = pokemonData.findIndex(
            (section) => section.title === newPokemon.category
        );

        if (sectionIndex !== -1) {
          const updatedData = [...pokemonData];
          updatedData[sectionIndex].data.push(newPokemon);
          setPokemonData(updatedData);
        } else {
          const updatedData = [
            ...pokemonData,
            { title: newPokemon.category, data: [newPokemon] },
          ];
          setPokemonData(updatedData);
        }
      },
    });
  };

  const renderItem = ({ item, index, section }) => (
      <View
          style={[
            styles.cardItem,
            { backgroundColor: categoryColors[item.category] },
          ]}
      >
        <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
                navigation.navigate('AddEdit', {
                  pokemon: item,
                  onSave: (updatedPokemon) => {
                    const sectionIndex = pokemonData.findIndex(
                        (sect) => sect.title === section.title
                    );
                    const updatedData = [...pokemonData];
                    updatedData[sectionIndex].data[index] = updatedPokemon;
                    setPokemonData(updatedData);
                  },
                  onDelete: () => {
                    const sectionIndex = pokemonData.findIndex(
                        (sect) => sect.title === section.title
                    );
                    const updatedData = [...pokemonData];
                    updatedData[sectionIndex].data.splice(index, 1);
                    setPokemonData(updatedData);
                  },
                })
            }
        >
          <Text style={styles.cardName}>{item.name}</Text>
        </TouchableOpacity>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      </View>
  );


  const renderSectionHeader = ({ section }) => (
      <View
          style={[
            styles.sectionHeader,
            { backgroundColor: categoryColors[section.title] },
          ]}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <Button title="Add Pokémon" onPress={handleAddPokemon} />
        <SectionList
            sections={pokemonData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
  );
};

const AddEditScreen = ({ route, navigation }) => {
  const { pokemon, onSave, onDelete } = route.params || {};
  const [name, setName] = useState(pokemon?.name || '');
  const [category, setCategory] = useState(pokemon?.category || 'Normal');
  const [imageUrl, setImageUrl] = useState(pokemon?.imageUrl || '');

  const handleSave = () => {
    if (name && imageUrl && category) {
      onSave({ name, category, imageUrl });
      navigation.goBack();
    } else {
      alert('Please fill out all fields!');
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      navigation.goBack();
    }
  };

  return (
      <View style={[styles.container, styles.formContainer]}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Pokémon name"
        />
        <Text style={styles.inputLabel}>Category:</Text>
        <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={Object.keys(categoryColors).map((key) => ({
              label: key,
              value: key,
              color: categoryColors[key],
            }))}
            value={category}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
        />
        <Text style={styles.inputLabel}>Image URL:</Text>
        <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Enter Pokémon image URL"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.smallButton}>
            <Button title="Save" onPress={handleSave} />
          </View>
          {pokemon && (
              <View style={styles.smallButton}>
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    color="red"
                />
              </View>
          )}
        </View>
      </View>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#FFD700' },
              headerTintColor: '#000',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="AddEdit" component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  formContainer: {
    padding: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardName: {
    fontSize: 18,
    flex: 1,
    color: '#fff',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  sectionHeader: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingLeft: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputLabel: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5, // Add spacing between buttons
  },
});

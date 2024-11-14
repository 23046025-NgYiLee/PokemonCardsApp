import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';

const App = () => {
  // Sample data for Pokemon cards
  const [pokemonData, setPokemonData] = useState([
    {
      title: "Electric",
      data: [
        {
          name: 'Pikachu',
          imageUrl: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_60-2x.png',
        },
        {
          name: 'Voltorb',
          imageUrl: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_61-2x.png',
        },
      ],
    },
    {
      title: "Fire",
      data: [
        {
          name: 'Charmander',
          imageUrl: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_70-2x.png',
        },
        {
          name: 'Growlithe',
          imageUrl: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_80-2x.png',
        },
      ],
    },
  ]);

  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.cardItem} onPress={() => alert(`Clicked on ${item.name}`)}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
  );

  const addPokemon = () => {
    // Example function to add a new Pokemon (will implement further in next lesson)
    const newPokemon = {
      name: 'Bulbasaur',
      imageUrl: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_1-2x.png',
    };
    const newData = [...pokemonData];
    newData[0].data.push(newPokemon); // Adding to the Electric section as an example
    setPokemonData(newData);
  };

  return (
      <View style={styles.container}>
        <Button title="Add Pokemon" onPress={addPokemon} />
        <SectionList
            sections={pokemonData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  cardItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardName: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  cardImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingLeft: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;

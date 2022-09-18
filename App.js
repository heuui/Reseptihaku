import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then (responseJson => setRecipes(responseJson.meals))
    .catch(err => {
      console.log(err);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
    <FlatList 
      style={styles.flatlist}
      keyExtractor={(meals, index) => index.toString()} 
      renderItem={({item}) => {
        return (
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={{width:50, height: 50}} source={{ uri:`${item.strMealThumb}`, }} />
          </View>
      );
      }}
      ItemSeparatorComponent={listSeparator}
      data={recipes}
    /> 
    <TextInput style={styles.input} placeholder='Ingredient' 
      onChangeText={text => setKeyword(text)} />
    <Button title="Find" onPress={getRecipes} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    height: 50,
    textAlign: 'center',
  },
  flatlist: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
   },
});

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeals.find(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <MealItem
        onSelectMeal={() => {
          props.navigation.navigate('MealDetail', {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavorite,
          });
        }}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity.toUpperCase()}
        affordability={itemData.item.affordability.toUpperCase()}
        title={itemData.item.title}
        image={itemData.item.imageUrl}
      />
    );
  };

  const { listData } = props;
  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default MealList;

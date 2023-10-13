import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [], // Your initial restaurant data
  filteredRestaurants: [], // Holds filtered restaurants
  sortBy: "rating", // Default sorting option
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    filterByCuisine: (state, action) => {
      // Filter restaurants by cuisine type
      const { cuisineType } = action.payload;
      state.filteredRestaurants = state.restaurants.filter(
        (restaurant) => restaurant.cuisine === cuisineType
      );
    },
    sortByRating: (state) => {
      // Sort restaurants by rating
      state.filteredRestaurants.sort((a, b) => b.rating - a.rating);
    },
    sortByPrice: (state) => {
      // Sort restaurants by price
      state.filteredRestaurants.sort((a, b) =>
        a.priceRange.localeCompare(b.priceRange)
      );
    },
    clearFilters: (state) => {
      // Clear filters and sorting
      state.filteredRestaurants = state.restaurants;
      state.sortBy = "rating"; // Reset sorting to default
    },
  },
});

export const { filterByCuisine, sortByRating, sortByPrice, clearFilters } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;

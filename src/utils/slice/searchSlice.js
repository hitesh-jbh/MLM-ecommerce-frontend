import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: ""
    },
    reducers: {
        updateSearchQuery: (state, action) => {
            state.query = action.payload;
        },

        clearSearch:(state) => {
            state.query = "";
        },
    },
})

export const { updateSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedVariantIdRedux: "00000000-0000-0000-0000-000000000000", 
};

const variantSlice = createSlice({
    name: 'variant',
    initialState,
    reducers: {
        setSelectedVariantId(state, action) {
            state.selectedVariantIdRedux = action.payload; // Correctly update the selected variant ID
        },
    },
});

// Export the action correctly
export const { setSelectedVariantId } = variantSlice.actions;
export default variantSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state

interface IDataMessenger {
    open: boolean;
}

// Define the initial state using that type
const initialState: IDataMessenger = {
    open: false,
};

export const messengerSlice = createSlice({
    name: 'messenger',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const { setOpen } = messengerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getOpenSelector = (state: RootState) => state.messengerSlice.open;

export default messengerSlice.reducer;

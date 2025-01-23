import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
    events: any[];
}

const initialState: EventState = {
    events: [],
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setNewEvent: (state, action) => {
            state.events.push(action.payload);
        },
        setAllEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { setNewEvent ,setAllEvents} = eventSlice.actions;
export default eventSlice.reducer;

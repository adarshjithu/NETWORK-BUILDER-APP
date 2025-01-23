import { createSlice } from "@reduxjs/toolkit";
import { IGroup } from "../Interfaces/Group";

const initialState: Record<string, any> = {
    groups: [],
    selectedGroup:{},
    allMessages:[]
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatGroups: (state, action) => {
            state.groups = action.payload;
        },
        setChatGroup: (state, action) => {
            state.groups.unshift(action.payload);
        },
        selectGroup:(state,action)=>{
            state.selectedGroup = action.payload
        },setAllMessages:(state,action)=>{
            state.allMessages = action.payload;
        }
    },
});

export const { setChatGroups,setChatGroup,selectGroup,setAllMessages } = chatSlice.actions;

export default chatSlice.reducer;

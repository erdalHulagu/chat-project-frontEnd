import { createSlice } from "@reduxjs/toolkit";

const initialState={
    img:"",
    groupName:"",
    description:""
}
export const createGroup= createSlice({
    name:"createGroup",
    initialState,
    reducers:{
        setCreateGroup : (state  , action) => {
            state.createGroup=action.payload

             }
    }
})
export const {setCreateGroup} = createGroup.actions
export default createGroup.reducer
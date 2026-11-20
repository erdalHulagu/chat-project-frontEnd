
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Görüntülenen arkadaşın profil bilgileri
    friendProfile: null,

    // Eklenen arkadaşların listesi
    friendList: [],
};

const profileSlice = createSlice({
    name: "profile",
    initialState,

    reducers: {
        setFriendProfile: (state, action) => {
            state.friendProfile = action.payload;
        },

        addFriendToList: (state, action) => {
            const newFriend = action.payload;

            if (!newFriend) return;

            const alreadyExists = state.friendList.some(
                (friend) =>
                    String(friend.id) === String(newFriend.id)
            );

            if (!alreadyExists) {
                state.friendList.push(newFriend);
            }
        },

        removeFriendFromList: (state, action) => {
            state.friendList = state.friendList.filter(
                (friend) =>
                    String(friend.id) !== String(action.payload)
            );
        },
    },
});

export const {
    setFriendProfile,
    addFriendToList,
    removeFriendFromList,
} = profileSlice.actions;

export default profileSlice.reducer;

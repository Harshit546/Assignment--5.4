import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "./types";
import { updateProfileThunk } from "./profileThunks";

const initialState: Profile = { firstName: "", lastName: "", email: "" };

// Manages the user profile state
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // When the updateProfileThunk is fulfilled, the state is replaced with the updated profile data from the API response
    builder.addCase(
      updateProfileThunk.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        return action.payload;
      }
    );
  },
});

export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "./types";
import { updateProfileThunk } from "./profileThunks";

const initialState: Profile = { firstName: "", lastName: "", email: "" };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      updateProfileThunk.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        return action.payload;
      }
    );
  },
});

export default profileSlice.reducer;

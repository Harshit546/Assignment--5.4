import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Profile } from "./types";

// Async thunk to update the user's profile data by making a PUT request to the API
export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async (profile: Profile) => {
    const { data } = await axios.put<Profile>(
      "https://dummyjson.com/users/1",
      profile
    );
    return data;
  },
  
);

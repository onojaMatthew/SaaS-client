import { API_BASE_URL } from '@/config/constant';
import { authUser } from '@/lib/utils';
import { Recommendation, RecommendationResponse } from '@/types/recommendation';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const BASE_URL = API_BASE_URL ||  "http://35.179.111.36"

const initialState = {
  recommendations: [],
  loading: false,
  success: false,
  error: ""
};



const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        console.log(action)
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.recommendations = action.payload.data;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
        
      })
      .addCase(logInteraction.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
      })
  },
});

export const {} = recommendationSlice.actions;

export default recommendationSlice.reducer;


export const getRecommendations = createAsyncThunk<RecommendationResponse, Recommendation, { rejectValue: string }>(
  'book/getRecommendations',
  async (id, { rejectWithValue }) => {
    const loggedInUser = authUser()
    const token = loggedInUser?.token;
    const businessId = loggedInUser?.user?.businessId;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/recommendations?userId=${id}&limit=20`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

      const resp: RecommendationResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logInteraction = createAsyncThunk<RecommendationResponse, Recommendation, { rejectValue: string }>(
  'book/logInteraction',
  async (data, { rejectWithValue }) => {
    const loggedInUser = authUser()
    const token = loggedInUser?.token;
    const businessId = loggedInUser?.user?.businessId;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/recommendations/interaction`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const resp: RecommendationResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);
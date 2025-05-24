import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { API_BASE_URL } from '@/config/constant';
import { authUser } from '@/lib/utils';

const user = authUser();
const token = user?.token;

interface InitialState {
  user: object | any;
  business: object | any
  loading: boolean;
  success: boolean;
  error: string;
}
const initialState: InitialState = {
  user: {},
  business: {},
  loading: false,
  success: false,
  error: ""
};

// Helper to save token to localStorage
const saveToken = (token: object) => {
  if (typeof window !== 'undefined') {
    // safe to use browser features
    console.log(token, " the response from the server")
    localStorage.setItem('token', JSON.stringify(token));
  }
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginBusiness.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.user = action.payload.data.user;
          state.business = action.payload.data.business;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
       
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.user = action.payload.data
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
       
      })
      .addCase(loginReader.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(loginReader.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.user = action.payload.data;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
        
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.user = action.payload.data.user;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
      })
     .addCase(registerBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.business = action.payload.data.business
          state.user = action.payload.data.user;
        } else {
          state.loading = false;
          state.success = false;
          state.error = action.payload.message;
        }
      })
  },
});

export const {  } = authSlice.actions;




export const selectCurrentUser = (state: any) => state.auth.user;
export const selectAuthToken = (state: any) => state.auth.token;
export const selectAuthLoading = (state: any) => state.auth.loading;
export const selectAuthError = (state: any) => state.auth.error;

export default authSlice.reducer;

// Async thunk for user registration

export const registerBusiness = createAsyncThunk<AuthResponse, RegisterCredentials, { rejectValue: string }>(
  'auth/registerBusiness',
  async (data, { rejectWithValue}) => {
    try {
      let response = await fetch(`${API_BASE_URL}/auth/business/register`, {
        method: "POST",
        headers: {
          "ACCEPT": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const resp: AuthResponse = await response.json()
       const tokenData = {
        user: resp.data.user,
        token: resp.data.token,
        business: resp.data.business
      };
      saveToken(tokenData);
      return resp;
    } catch (error: any) {
      console.log('Registration failed');
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);


export const loginBusiness = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/loginBusiness',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/business/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const resp: AuthResponse = await response.json();

      const tokenData = {
        user: resp.data.user,
        token: resp.data.token,
        business: resp.data.business
      };
      saveToken(tokenData);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);


// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async () => {
   let response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
    })
    
    const resp = await response.json();
    saveToken(resp);
    return resp;
  }
);

export const loginReader = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/loginReader',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const resp: AuthResponse = await response.json();

      const tokenData = {
        user: resp.data.user,
        token: resp.data.token,
        business: resp.data.business
      };

      saveToken(tokenData);
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/registerUser",
  async (data) => {
    let res: any = await fetch(`${API_BASE_URL}/auth/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Unable to register');
    res = await res.json()
    const tokenData = {
      user: res?.data?.user,
      token: res?.data?.token
    }
    saveToken(tokenData);
    return res;
  }
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URI = 'http://localhost:5000/api/auth';

// ✅ Register
const registerUser = createAsyncThunk(
  'user/register',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URI}/register`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Qeydiyyat zamanı xəta baş verdi'
      );
    }
  }
);

// ✅ Normal Login
const loginUser = createAsyncThunk(
  'user/login',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URI}/login`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Daxil olarkən xəta baş verdi'
      );
    }
  }
);

// ✅ Google Login
 const loginWithGoogle = createAsyncThunk(
  'user/googleLogin',
  async (credentialResponse, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URI}/google-login`, {
        token: credentialResponse.credential,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Google login zamanı xəta baş verdi');
    }
  }
);


 const loginWithFacebook = createAsyncThunk(
  'user/facebookLogin',
  async (facebookResponse, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URI}/facebook-login`, {
        accessToken: facebookResponse.accessToken,
        userID: facebookResponse.userID,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Facebook login zamanı xəta baş verdi');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Normal Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google Login
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Facebook Login
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export {
  registerUser,
  loginUser,
  loginWithGoogle,
  loginWithFacebook,
};

export default userSlice.reducer;

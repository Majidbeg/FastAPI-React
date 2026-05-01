// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginAPI, signupAPI } from "./authAPI";

// // 🔐 Login Thunk
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       return await loginAPI(userData);
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // 🆕 Signup Thunk
// export const signupUser = createAsyncThunk(
//   "auth/signupUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       return await signupAPI(userData);
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",

//   initialState: {
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//     signupSuccess: false,   // ✅ NEW
//     signupData: null,       // ✅ NEW
//   },

//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },

//     resetSignup: (state) => {   // ✅ optional but useful
//       state.signupSuccess = false;
//       state.signupData = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // 🔐 Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🆕 Signup
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.signupSuccess = false;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;

//         state.signupSuccess = true;       // ✅ IMPORTANT
//         state.signupData = action.payload; // ✅ store full response
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.signupSuccess = false;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
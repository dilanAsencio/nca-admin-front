import { authService } from "@/services/publicAuth/public-auth-service";
import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  RefreshTokenPayload,
  VerifyEmailPayload,
  ResendVerificationPayload,
  UpdateProfilePayload,
} from "@/services/publicAuth/public-auth-service";
import { User } from "@/types/auth";
import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface AuthResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}

export const publicLoginThunk = createAsyncThunk<
  AuthResponse<any>,
  LoginPayload,
  { rejectValue: AuthResponse }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicLogin(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicRegisterThunk = createAsyncThunk<
  AuthResponse<any>,
  RegisterPayload,
  { rejectValue: AuthResponse }
>("auth/publicRegister", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicRegister(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicForgotPasswordThunk = createAsyncThunk<
  AuthResponse<any>,
  ForgotPasswordPayload,
  { rejectValue: AuthResponse }
>("auth/publicForgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicForgotPassword(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicResetPasswordThunk = createAsyncThunk<
  AuthResponse<any>,
  ResetPasswordPayload,
  { rejectValue: AuthResponse }
>("auth/publicResetPassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicResetPassword(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicChangePasswordThunk = createAsyncThunk<
  AuthResponse<any>,
  ChangePasswordPayload,
  { rejectValue: AuthResponse }
>("auth/publicChangePassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicChangePassword(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicRefreshTokenThunk = createAsyncThunk<
  AuthResponse<any>,
  RefreshTokenPayload,
  { rejectValue: AuthResponse }
>("auth/publicRefreshToken", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicRefreshToken(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicVerifyEmailThunk = createAsyncThunk<
  AuthResponse<any>,
  VerifyEmailPayload,
  { rejectValue: AuthResponse }
>("auth/publicVerifyEmail", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicVerifyEmail(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicResendVerificationThunk = createAsyncThunk<
  AuthResponse<any>,
  ResendVerificationPayload,
  { rejectValue: AuthResponse }
>("auth/publicResendVerification", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicResendVerification(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicGetProfileThunk = createAsyncThunk<
  AuthResponse<any>,
  void,
  { rejectValue: AuthResponse }
>("auth/publicGetProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.publicGetProfile();
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicUpdateProfileThunk = createAsyncThunk<
  AuthResponse<any>,
  UpdateProfilePayload,
  { rejectValue: AuthResponse }
>("auth/publicUpdateProfile", async (payload, { rejectWithValue }) => {
  try {
    const response = await authService.publicUpdateProfile(payload);
    if (!response.success) return rejectWithValue(response);
    return response;
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

export const publicLogoutThunk = createAsyncThunk<
  AuthResponse<any>,
  void,
  { rejectValue: AuthResponse }
>("auth/publicLogout", async (_, { rejectWithValue }) => {
  try {
    await authService.publicLogout();
    return { success: true, message: "Logout successful" };
  } catch (error: any) {
    return rejectWithValue({ success: false, message: error.message });
  }
});

const initialState: {
  infoUser: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    email_verified: boolean;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isFirstLogin: boolean;
} = {
  infoUser: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isFirstLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.infoUser = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.isFirstLogin = false;
    },
  },
  extraReducers: (builder) => {
    const thunks = [
      publicLoginThunk,
      publicRegisterThunk,
      publicForgotPasswordThunk,
      publicResetPasswordThunk,
      publicChangePasswordThunk,
      publicRefreshTokenThunk,
      publicVerifyEmailThunk,
      publicResendVerificationThunk,
      publicGetProfileThunk,
      publicUpdateProfileThunk,
    ];

    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          const data = action.payload.data;

          state.infoUser = data?.user ?? null;
          state.token = data?.access_token ?? null;
          state.isFirstLogin = data?.first_login ?? false;
          state.isAuthenticated = !!state.token;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.infoUser = null;
          state.token = null;
          state.isAuthenticated = false;
          state.isFirstLogin = false;
          state.error = action.payload?.message || "Operation failed";
        });
    });

    builder
      .addCase(publicLogoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(publicLogoutThunk.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(publicLogoutThunk.rejected, () => {
        return { ...initialState };
      })
      .addCase(PURGE, () => ({ ...initialState }));
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isAuthenticated", "isFirstLogin"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const { clearCredentials } = authSlice.actions;
export default store;
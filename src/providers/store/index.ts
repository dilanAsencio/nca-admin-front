import { authService } from "@/services/auth/auth-services";
import { User } from "@/app/core/interfaces/auth-interfaces";
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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
      rememberMe,
    }: { username: string; password: string; rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login({username, password, rememberMe});
      
      // Si success es false, rechaza con el mensaje
      if (!response.success) {
        return rejectWithValue({ success: false, message: response.message });
      }
      
      return response;
    } catch (error: any) {
      // Si ocurre un error inesperado, encapsúlalo en el formato Response
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  infoUser: null as User | null,
  token: null as string | null,
  loading: false,
  error: null as any | null,
  isAuthenticated: false,
  isFirstLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.infoUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      authService.logout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (state.infoUser && action.payload?.data?.username) {
          state.infoUser.username = action.payload.data.username;
        }
        state.token = action.payload?.data?.accessToken || null;
        // state.infoUser = action.payload?.data?.user || null;
        state.isFirstLogin = action.payload?.data?.isFirstLogin || false;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {        
        state.loading = false;
        state.isAuthenticated = false;
        state.isFirstLogin = false;
        state.infoUser = null;
        state.token = null;

        if (
          action.payload &&
          typeof action.payload === "object" &&
          "message" in action.payload
        ) {
          state.error = action.payload || "Login failed";
        } else {
          state.error = "Login failed";
        }
      });
  },
});

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Solo persiste el slice de auth
};

// Combina reducers (por si tienes más en el futuro)
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  // otros reducers...
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crea el store con el reducer persistido
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora las acciones internas de redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const { logout } = authSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

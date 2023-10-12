import { combineReducers } from 'redux';
import userReducer from '../Slice/userSlice';
import appointmentsReducer from '../Slice/appointmentsSlice';
import notificationsReducer from '../Slice/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  appointments: appointmentsReducer,
  notifications: notificationsReducer,
});

// Setup persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import userReducer from './slices/userSlice';
// import appointmentsReducer from './slices/appointmentsSlice';
// import notificationsReducer from './slices/notificationsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
};

const rootReducer = persistReducer(
  persistConfig,
  {
    user: userReducer,
    appointments: appointmentsReducer,
    notifications: notificationsReducer,
  }
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);

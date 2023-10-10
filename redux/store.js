import { combineReducers } from 'redux';
import userReducer from '../Slice/userSlice';
import appointmentsReducer from '../Slice/appointmentsSlice';
import notificationsReducer from '../Slice/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  appointments: appointmentsReducer,
  notifications: notificationsReducer,
});

// Rest of your store configuration...


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);

// Remove this line
// export default appointmentsReducer;
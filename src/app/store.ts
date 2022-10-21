import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// services
import { contactsApi } from '../services/contactsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // RTKQ OPS.
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(contactsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

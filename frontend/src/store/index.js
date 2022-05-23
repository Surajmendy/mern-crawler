import { configureStore } from '@reduxjs/toolkit';
import crawledPageReducer from '../store/reducers/crawledPageReducer';
export const store = configureStore(
  {
    reducer: {
      crawledData: crawledPageReducer,
    },
  });

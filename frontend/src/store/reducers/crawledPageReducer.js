import { createSlice } from '@reduxjs/toolkit';


const init = [];
export const crawledPageReducer = createSlice({
  name: 'crawledData',
  initialState: init,
  reducers: {
    saveDataToState: (state = init, action) => {
      if (action.payload) {
        return [
          ...action.payload,
        ];
      }
      return state;
    }
  },
});

// Action creators are generated for each case reducer function
export const { saveDataToState } =
crawledPageReducer.actions;

export default crawledPageReducer.reducer;

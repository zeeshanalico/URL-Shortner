import { Url } from '@/app/types/url';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortOrder = 'asc' | 'desc';

type UrlState = {
  urls: Url[];
  loading: boolean;
  error: string | null;
  sortColumn: keyof Url | null;
  sortOrder: SortOrder | null;
  pageNumber:Number;
};

const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
  sortColumn: null,
  sortOrder: null,
  pageNumber:1,
};

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    setUrls: (state, action: PayloadAction<Url[]>) => {
      state.urls = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSort: (state, action: PayloadAction<{ column: keyof Url }>) => {
      const { column } = action.payload;
      if (state.sortColumn === column) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = column;
        state.sortOrder = 'asc';
      }
      state.urls.sort((a, b) => {
        const aValue = a[column] ?? '';
        const bValue = b[column] ?? '';
        if (aValue < bValue) return state.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return state.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },
  },
});

export const { setUrls, setLoading, setError, setSort } = urlSlice.actions;
export default urlSlice.reducer;

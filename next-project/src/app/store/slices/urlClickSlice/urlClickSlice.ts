import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Url = {
    url_id: string;
    original_url: string;
    short_url: string;
    clicks: number;
    created_at: string;
}
export type UrlClickState = {
    urls: Url[];
    loading: boolean;
    error: string | null;

}

const initialState: UrlClickState = {
    urls: [],
    loading: false,
    error: null,
};

export const urlClickSlice = createSlice({
    name: 'urlClicks',
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
    }
})

export const { setUrls, setLoading, setError, } = urlClickSlice.actions;
export default urlClickSlice.reducer;
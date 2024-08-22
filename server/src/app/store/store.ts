'use client'
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../states/authSlice";
import { urlApiSlice } from "./slices/urlSlice/urlApiSlice";
// const authSlice=dynamic(()=>import("./slices/authSlice"),{ssr:false}); ;
import urlSlice from './slices/urlSlice/urlSlice'
import { urlClickApiSlice } from "./slices/urlClickSlice/urlClickApiSlice";
import { urlClickSlice } from "./slices/urlClickSlice/urlClickSlice";
import { logoApiSlice } from './slices/logoSlice/logoApiSlice';
import { apiKeyApi } from "./slices/ApiKeyapiSlice/ApiKeyapiSlice";
const reducer = {
    auth: authSlice.reducer,
    urls: urlSlice,
    [urlApiSlice.reducerPath]: urlApiSlice.reducer,
    urlClicks: urlClickSlice.reducer,
    [urlClickApiSlice.reducerPath]: urlClickApiSlice.reducer,
    [logoApiSlice.reducerPath]: logoApiSlice.reducer,
    [apiKeyApi.reducerPath]: apiKeyApi.reducer,

};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(urlApiSlice.middleware, urlClickApiSlice.middleware, logoApiSlice.middleware,apiKeyApi.middleware),
},);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  
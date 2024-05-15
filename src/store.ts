import { configureStore } from "@reduxjs/toolkit";
import switchChainReducer from "./slices/account/switch-chain.slice";
import postSelectedReducer from "./slices/posts/post-selected.slice";
import authReducer from "./slices/account/auth.slice";

export const store = configureStore({
  reducer: {
    "post-selected": postSelectedReducer,
    "switch-chain": switchChainReducer,
    "auth": authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

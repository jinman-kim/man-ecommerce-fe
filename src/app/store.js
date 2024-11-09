// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "../features/example/exampleSlice";
import crawlReducer from "../features/crawl/crawlSlice"; // Crawl Slice 임포트

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    crawl: crawlReducer, // Crawl Slice 추가
    // 다른 리듀서를 여기에 추가
  },
});

export default store;

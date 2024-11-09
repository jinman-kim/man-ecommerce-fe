// src/features/crawl/crawlSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  startPage: "",
  endPage: "",
  minPrice: "",
  maxPrice: "",
};

export const crawlSlice = createSlice({
  name: "crawl",
  initialState,
  reducers: {
    setCrawlData: (state, action) => {
      const { productName, startPage, endPage, minPrice, maxPrice } = action.payload;
      state.productName = productName;
      state.startPage = startPage;
      state.endPage = endPage;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
    },
    resetCrawlData: (state) => {
      state.productName = "";
      state.startPage = "";
      state.endPage = "";
      state.minPrice = "";
      state.maxPrice = "";
    },
  },
});

export const { setCrawlData, resetCrawlData } = crawlSlice.actions;

export default crawlSlice.reducer;

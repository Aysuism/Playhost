import { configureStore } from '@reduxjs/toolkit';
import { faqApi } from '../api/faq';
import { blogApi } from '../api/blog';

import { gamesApi } from '../api/games';
import { gameCommentApi } from '../api/games-comment';
import { gameCategoryApi } from '../api/games-category';

import { homeSliderApi } from '../api/home-slider';
import { homeFooterApi } from '../api/home-footer';
import { homeServiceApi } from '../api/home-service';
import { homePaymentApi } from '../api/payment';

import { introductionApi } from '../api/about-introduction';
import { teamApi } from '../api/about-team';
import { counterApi } from '../api/about-counter';
import { reviewsApi } from '../api/about-review';

import { settingsApi } from '../api/settings';

import { authApi } from '../api/auth';
import authReducer from '../api/auth-slice';

const store = configureStore({
  reducer: {
    auth:authReducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [gameCategoryApi.reducerPath]: gameCategoryApi.reducer,
    [gameCommentApi.reducerPath]: gameCommentApi.reducer,
    [homeSliderApi.reducerPath]: homeSliderApi.reducer,
    [homeFooterApi.reducerPath]: homeFooterApi.reducer,
    [homeServiceApi.reducerPath]: homeServiceApi.reducer,
    [homePaymentApi.reducerPath]: homePaymentApi.reducer,
    [introductionApi.reducerPath]: introductionApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [counterApi.reducerPath]: counterApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(faqApi.middleware)
      .concat(settingsApi.middleware)
      .concat(blogApi.middleware)
      .concat(gamesApi.middleware)
      .concat(gameCommentApi.middleware)
      .concat(gameCategoryApi.middleware)
      .concat(homeSliderApi.middleware)
      .concat(homeFooterApi.middleware)
      .concat(homeServiceApi.middleware)
      .concat(homePaymentApi.middleware)
      .concat(introductionApi.middleware)
      .concat(teamApi.middleware)
      .concat(counterApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(authApi.middleware)
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import cabinetReducer from './features/cabinetSlice/cabinetSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cabinet: cabinetReducer,
    },
});

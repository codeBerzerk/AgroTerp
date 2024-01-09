import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCatFact = createAsyncThunk('cabinet/fetchCatFact', async () => {
    const response = await axios.get('https://catfact.ninja/fact');
    return response.data.fact;
});

// Функція для збереження даних у localStorage
export const saveDataToLocalStorage = (data) => {
    localStorage.setItem('catsData', JSON.stringify(data));
};

// Функція для завантаження даних з localStorage
export const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem('catsData');
    return data ? JSON.parse(data) : null;
};

const initialState = loadDataFromLocalStorage() || {
    cabinets: [],
    nextCabinetId: 1,
    loading: false,
    error: null,
};



export const cabinetSlice = createSlice({
    name: 'cabinet',
    initialState,
    reducers: {
        addCabinet: (state) => {
            console.log('Adding a new cabinet');
            state.cabinets.push({
                id: state.nextCabinetId,
                cats: [],
            });
            state.nextCabinetId += 1;
            saveDataToLocalStorage(state);
        },
        removeCabinet: (state, action) => {
            const cabinetId = action.payload;
            state.cabinets = state.cabinets.filter(cabinet => cabinet.id !== cabinetId);
            saveDataToLocalStorage(state);
        },
        addCat: {
            reducer: (state, action) => {
                console.log('Adding a new cat:', action.payload);
                const { cabinetId, cat } = action.payload;
                const cabinet = state.cabinets.find(c => c.id === cabinetId);
                if (cabinet) {
                    cabinet.cats.push({ ...cat, id: nanoid() });
                }
                saveDataToLocalStorage(state);
            },
            prepare: (cabinetId, catData) => {
                return { payload: { cabinetId, cat: catData } };
            },
        },
        removeCat: (state, action) => {
            const { cabinetId, catId } = action.payload;
            const cabinet = state.cabinets.find(cabinet => cabinet.id === cabinetId);
            if (cabinet) {
                cabinet.cats = cabinet.cats.filter(cat => cat.id !== catId);
            }
            saveDataToLocalStorage(state);
            },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatFact.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCatFact.fulfilled, (state, action) => {
                state.loading = false;
                const lastAddedCat = state.cabinets
                    .flatMap(cabinet => cabinet.cats)
                    .find(cat => !cat.fact);
                if (lastAddedCat) {
                    lastAddedCat.fact = action.payload;
                }
            })
            .addCase(fetchCatFact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cat fact';
            });
    },
});

export const { addCabinet, removeCabinet, addCat, removeCat } = cabinetSlice.actions;

export default cabinetSlice.reducer;

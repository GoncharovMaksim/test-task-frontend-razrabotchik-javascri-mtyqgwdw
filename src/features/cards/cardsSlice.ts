import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MockApiService } from '../../api/mockApi';
import { MOTIVATION_QUOTES } from '../../api/mockData';
import { FlashCard } from '../../types';

interface CardsState {
  items: FlashCard[];
  flippedCardIds: Record<string, boolean>;
  currentQuoteIndex: number;
  quotes: string[];
  searchQuery: string;
  selectedLevel: string;
  isLoading: boolean;
}

const initialState: CardsState = {
  items: [],
  flippedCardIds: {},
  currentQuoteIndex: 0,
  quotes: MOTIVATION_QUOTES,
  searchQuery: '',
  selectedLevel: 'all',
  isLoading: false,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const cards = await MockApiService.getCards();
  return cards;
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleFlipCard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.flippedCardIds[id] = !state.flippedCardIds[id];
    },
    resetFlippedCards: (state) => {
      state.flippedCardIds = {};
    },
    nextRandomQuote: (state) => {
      const nextIndex = Math.floor(Math.random() * state.quotes.length);
      state.currentQuoteIndex = nextIndex;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedLevel: (state, action: PayloadAction<string>) => {
      state.selectedLevel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<FlashCard[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  toggleFlipCard,
  resetFlippedCards,
  nextRandomQuote,
  setSearchQuery,
  setSelectedLevel,
} = cardsSlice.actions;

export default cardsSlice.reducer;

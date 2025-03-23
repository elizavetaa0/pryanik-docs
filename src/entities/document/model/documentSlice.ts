import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDocument } from './documentTypes';

interface IDocumentState {
  documents: IDocument[];
  loading: boolean;
  error: string | null;
}

const initialState: IDocumentState = {
  documents: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addDocument(state, action: PayloadAction<IDocument>) {
      state.documents.push(action.payload);
    },
    updateDocument(state, action: PayloadAction<IDocument>) {
      const index = state.documents.findIndex((doc) => doc.id === action.payload.id);
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument(state, action: PayloadAction<number>) {
      state.documents = state.documents.filter((doc) => doc.id !== action.payload);
    },
    setDocuments(state, action: PayloadAction<IDocument[]>) {
      state.documents = action.payload;
    },
  },
});

export const { addDocument, updateDocument, deleteDocument, setDocuments } = documentSlice.actions;
export default documentSlice.reducer;

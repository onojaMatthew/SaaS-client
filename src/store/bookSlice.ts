import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookPayload, BookResponse } from '@/types/book';
import { authUser } from '@/lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

const user = authUser();
const businessId = user?.user?.businessId;
const token = user?.token;

interface InitialState {
  books: BookResponse[] | any;
  book: Book | any
  loading: boolean;
  success: boolean;
  uploadSuccess: boolean;
  error: string | null;
}

const initialState: InitialState = {
  books: [],
  book: {},
  loading: false,
  uploadSuccess: false,
  success: false,
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.book = action.payload.data;
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.success = false;
        }
        
      })
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
         if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.books = action.payload.data;
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.success = false;
        }
        
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
         if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.books = state.books.concat(action.payload.data);
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.success = false;
        }
        
      })
      .addCase(rateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(rateBook.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.book = action.payload.data;
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.success = false;
        }
        
      })
      .addCase(getUserUploadedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserUploadedBooks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.success = true;
          state.books = action.payload.data;
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.success = false;
        }
        
      })
      .addCase(uploadBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBook.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.uploadSuccess = true;
          state.books = state.books.concat(action.payload.data);
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.uploadSuccess = false;
        }
        
      })
  },
});

export const {} = bookSlice.actions;



export default bookSlice.reducer;


export const getBookById = createAsyncThunk<BookResponse, string, { rejectValue: string }>(
  'book/getBookById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents/${id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const getBooks = createAsyncThunk<BookResponse, void, { rejectValue: string }>(
  'book/getBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents/`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const uploadBook = createAsyncThunk<BookResponse, BookPayload, { rejectValue: string }>(
  'book/uploadBook',
  async (data, { rejectWithValue }) => {
    data["businessId"] = businessId
    try {
      const response = await fetch(`${API_BASE_URL}/contents/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);


export const rateBook = createAsyncThunk<BookResponse, any, { rejectValue: string }>(
  'book/rateBook',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents/${data.id}/rate`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const getUserUploadedBooks = createAsyncThunk<BookResponse, void, { rejectValue: string }>(
  'book/getUserUploadedBooks',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents?businessId=${businessId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const updateBook = createAsyncThunk<BookResponse, {id: string, data: any}, { rejectValue: string }>(
  'book/updateBook',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents/${data.id}/update`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch book');
      }

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);
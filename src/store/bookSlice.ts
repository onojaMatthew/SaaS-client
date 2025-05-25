import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@/config/constant';
import { Book, BookPayload, BookResponse } from '@/types/book';
import { authUser } from '@/lib/utils';

const BASE_URL = API_BASE_URL ||  "http://35.179.111.36"
interface InitialState {
  books: BookResponse[] | any;
  book: Book | any
  loading: boolean;
  success: boolean;
  uploadSuccess: boolean;
  error: string | null;
  deleteLoading: boolean;
}

const initialState: InitialState = {
  books: [],
  book: {},
  loading: false,
  uploadSuccess: false,
  success: false,
  error: null,
  deleteLoading: false, 
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
      .addCase(deleteBook.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.deleteLoading = true;
          state.books = state.books.filter((book: Book) => book._id === action.payload.data._id);
        } else {
          state.loading = false;
          state.error = action.payload.message;
          state.deleteLoading = false;
        }
        
      })
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;

export const getBookById = createAsyncThunk<BookResponse, string, { rejectValue: string }>(
  'book/getBookById',
  async (id, { rejectWithValue }) => {
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents/${id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

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
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents/`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });

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
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    data["businessId"] = businessId
    console.log(token, " the token")
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });


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
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/contents/${data.id}/rate`, {
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
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      });


      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const deleteBook = createAsyncThunk<BookResponse, any, { rejectValue: string }>(
  'book/deleteBook',
  async (id, { rejectWithValue }) => {
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });

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
    const user = authUser();
    const businessId = user?.user?.businessId;
    const token = user?.token;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contents/${data.id}/update`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const resp: BookResponse = await response.json();
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);
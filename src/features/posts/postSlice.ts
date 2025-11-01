import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { PostService } from './PostService';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = { items: [], loading: false, error: null };

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const { data } = await PostService.getAll();
  return data;
});

interface DeletePostArgs {
  id: number;
  onSuccess: (post: Post) => void;
}

export const deletePost = createAsyncThunk<void, DeletePostArgs>(
  'posts/deletePost',
  async ({ id, onSuccess }) => {
    const { data } = await PostService.remove(id);
    onSuccess(data);
    return data.id;
  }
);

interface EditPostArgs {
  post: Post;
  onSuccess: (post: Post) => void;
}

export const editPost = createAsyncThunk<void, EditPostArgs>(
  'posts/editPost',
  async ({ post, onSuccess }) => {
    const { data } = await PostService.update(post.id!, post);
    onSuccess(data);
    return data;
  }
);

export const createPost = createAsyncThunk<void, EditPostArgs>(
  'posts/createPost',
  async ({ post, onSuccess }) => {
    const { data } = await PostService.create(post);
    onSuccess(data);
    return data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar publicaciones';
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.items = state.items.filter((post) => post.id !== deletedId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar publicación';
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newPost = action.payload as unknown as Post;
        state.items = state.items.map((post) =>
          post.id === newPost.id ? newPost : post
        );
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al editar publicación';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newPost = action.payload as unknown as Post;
        state.items = [newPost, ...state.items];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear publicación';
      });
  },
});

export default postsSlice.reducer;

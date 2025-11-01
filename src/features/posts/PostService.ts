import api from '../../api/apiClient';
import { Post } from '../../types/Post';

export const PostService = {
  getAll: () => api.get('/posts'),
  create: (post: Post) => api.post('/posts', post),
  update: (id: number, post: Post) => api.put(`/posts/${id}`, post),
  remove: (id?: number) => api.delete(`/posts/${id}`),
};

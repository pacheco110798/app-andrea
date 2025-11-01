export interface Post {
  id?: number;
  title: string;
  content: string;
  body: string;
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  views?: number;
  userId?: number;
  isDeleted?: boolean;
  deletedOn?: Date;
}

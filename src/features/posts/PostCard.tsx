import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Post } from '../../types/Post';
import { Card } from 'primereact/card';

interface PostCardProps {
  post: Post;
}
export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card
      style={{
        margin: '1rem',
        borderRadius: '12px',
        border: post.isDeleted ? '2px dashed red' : '1px solid #ccc',
        backgroundColor: '#456882',
      }}
    >
      <h1>{post.title}</h1>
      <h2>{`Post ID: ${post.id} | User: ${post.userId}`}</h2>
      <p
        style={{
          fontSize: '0.95rem',
          color: post.isDeleted ? 'gray' : 'black',
        }}
      >
        {post.body}
      </p>

      <div style={{ padding: '3' }}>
        {post.tags?.map((tag) => (
          <Tag
            key={tag}
            value={tag}
            style={{ margin: '3px' }}
            severity='info'
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <div>
          <Button
            icon='pi pi-thumbs-up'
            label={post.reactions?.likes.toString()}
            className='p-button-text p-mr-2'
          />
          <Button
            icon='pi pi-thumbs-down'
            label={post.reactions?.dislikes.toString()}
            className='p-button-text p-button-danger'
          />
        </div>
        <div>👀 {post.views}</div>
      </div>

      {post.isDeleted && (
        <div style={{ marginTop: '1rem', fontStyle: 'italic', color: 'red' }}>
          Deleted on:{' '}
          {post?.deletedOn
            ? new Date(post.deletedOn).toLocaleString()
            : 'Unknown'}
        </div>
      )}
    </Card>
  );
};

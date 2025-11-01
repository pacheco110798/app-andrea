import React, { useState } from 'react';
import { Post } from '../../types/Post';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const PostForm: React.FC<{
  onSubmit: (post: Post) => void;
  handleChange: (post: Post) => void;
  initial?: Post;
}> = ({ handleChange = () => {}, initial }) => {
  const [post, setPost] = useState<Post>(
    initial ?? { id: 0, title: '', content: '', body: '' }
  );

  const handleEdit = (field: keyof Post, value: string) => {
    setPost({ ...post, [field]: value });
    handleChange(post);
  };

  return (
    <div>
      <h3>{post.id ? 'Editar Publicación' : 'Nueva Publicación'}</h3>
      <InputText
        style={{ alignSelf: 'center', width: '100%', marginTop: '5px' }}
        value={post.title}
        onChange={(e) => handleEdit('title', e.target.value)}
        placeholder='Título'
      />
      <InputTextarea
        style={{ alignSelf: 'center', width: '100%', marginTop: '5px' }}
        value={post.body}
        onChange={(e) => handleEdit('body', e.target.value)}
        placeholder='Contenido'
        rows={5}
      />
    </div>
  );
};

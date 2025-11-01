import React from 'react';

export const PdfViewer: React.FC<{ url: string }> = ({ url }) => {
  return (
    <iframe
      src={url}
      title='PDF Viewer'
      width='100%'
      height='600px'
      style={{ border: 'none' }}
    ></iframe>
  );
};

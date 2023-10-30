import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Editor from '../Editor/Editor';

export default function CategoryEditor(): React.ReactElement {
  // const { id } = useParams();

  const [ markdown, setMarkdown ] = useState('');

  return (
    <Editor
      markdown={markdown}
      onChange={setMarkdown}
      className='category-editor'
      editorClassName='category-editor-input'
      previewClassName='category-editor-preview'
    />
  );
}

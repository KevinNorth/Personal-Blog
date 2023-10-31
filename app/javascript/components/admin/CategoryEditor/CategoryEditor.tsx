import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import getCategoryById from '../../../graphql/queries/categoryById';


export default function CategoryEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getCategoryById(id, true);

  const [ markdown, setMarkdown ] = useState(null);

  if (loading) {
    return <Spinner />;
  }

  if (markdown === null) {
    setMarkdown(data.categoryById.markdown || '');
  }

  return (
    <Editor
      markdown={markdown}
      onChange={setMarkdown}
      className='category-editor'
    />
  );
}

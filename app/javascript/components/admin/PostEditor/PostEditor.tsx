import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import getPostById from '../../../graphql/queries/postById';


export default function PostEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getPostById(id, true);

  const [ markdown, setMarkdown ] = useState(null);

  if (loading) {
    return <Spinner />;
  }

  if (markdown === null) {
    setMarkdown(data.postById.markdown || '');
  }

  return (
    <Editor
      markdown={markdown}
      onChange={setMarkdown}
      className='post-editor'
    />
  );
}

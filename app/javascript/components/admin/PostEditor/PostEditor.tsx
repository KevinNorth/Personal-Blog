import React from 'react';
import { useParams } from 'react-router-dom';

export default function PostEditor(): React.ReactElement {
  const { id } = useParams();

  return <>{id}</>;
}

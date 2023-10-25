import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryEditor(): React.ReactElement {
  const { id } = useParams();

  return <>{id}</>;
}

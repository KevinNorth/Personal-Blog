import React from 'react';
import { createRoot } from 'react-dom';
import Blog from './components/Blog'; 

document.addEventListener('DOMContentLoaded', () => {
  const domNode = document.createElement('div');
  document.body.appendChild(domNode);
  const root = createRoot(domNode);
  root.render(<Blog />);
});

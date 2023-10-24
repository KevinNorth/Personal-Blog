import React from 'react';
import { createRoot } from 'react-dom';
import Admin from './components/Admin';

document.addEventListener('DOMContentLoaded', () => {
  const domNode = document.createElement('div');
  document.body.appendChild(domNode);
  const root = createRoot(domNode);
  root.render(<Admin />);
});
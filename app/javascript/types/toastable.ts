import React from 'react';
import { SimpleToastProps } from '../components/common/SimpleToast';

export type SendToastFunction = (
  toast: React.ReactElement | SimpleToastProps
) => void;

interface Toastable {
  sendToast: SendToastFunction;
}

export default Toastable;

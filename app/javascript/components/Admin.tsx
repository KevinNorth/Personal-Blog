import React, { cloneElement, isValidElement, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SendToastFunction } from '../types/toastable';
import ExistingCategoryEditor from './admin/CategoryEditor/ExistingCategoryEditor';
import NewCategoryEditor from './admin/CategoryEditor/NewCategoryEditor';
import Layout from './admin/Layout';
import ExistingPostEditor from './admin/PostEditor/ExistingPostEditor';
import NewPostEditor from './admin/PostEditor/NewPostEditor';
import Root from './admin/Root/Root';
import SimpleToast, { SimpleToastProps } from './common/SimpleToast';
import { v4 as uuid } from 'uuid';

function generateInitialToasts(
  toast: SimpleToastProps | undefined
): React.ReactElement[] {
  if (!toast) {
    return [];
  }

  return [<SimpleToast {...toast} key={uuid()} />];
}

function receiveToast(
  toast: React.ReactElement | SimpleToastProps,
  setToasts: (toast: React.ReactElement[]) => void,
  existingToasts: React.ReactElement[]
) {
  if (isValidElement(toast)) {
    setToasts([...existingToasts, cloneElement(toast, { key: uuid() })]);
  } else {
    setToasts([
      ...existingToasts,
      <SimpleToast {...(toast as SimpleToastProps)} key={uuid()} />,
    ]);
  }
}

function Admin() {
  const location = useLocation();

  const [toasts, setToasts] = useState(
    generateInitialToasts(location?.state?.toast)
  );
  const sendToast: SendToastFunction = (toast) =>
    receiveToast(toast, setToasts, toasts);

  return (
    <Layout toasts={toasts}>
      <Routes>
        <Route
          path="/category/new"
          element={<NewCategoryEditor sendToast={sendToast} />}
        />
        <Route
          path="/category/:id"
          element={<ExistingCategoryEditor sendToast={sendToast} />}
        />
        <Route
          path="/post/new"
          element={<NewPostEditor sendToast={sendToast} />}
        />
        <Route
          path="/post/:id"
          element={<ExistingPostEditor sendToast={sendToast} />}
        />
        <Route path="/" element={<Root />} />
      </Routes>
    </Layout>
  );
}

export default Admin;

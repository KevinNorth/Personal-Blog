import React, { useState } from 'react';
import { Toast, ToastProps } from 'react-bootstrap';
import Icon, { IconName } from './Icon';

export interface SimpleToastProps {
  header: string;
  body: string;
  headerIcon?: IconName;
  bg?: ToastProps['bg'];
}

function SimpleToast({
  header,
  body,
  headerIcon,
  bg,
}: SimpleToastProps): React.ReactElement {
  const [show, setShow] = useState(true);

  return (
    <Toast bg={bg} show={show} onClick={() => setShow(false)}>
      <Toast.Header>
        {headerIcon && <Icon iconName={headerIcon} />}
        {header}
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

export default SimpleToast;

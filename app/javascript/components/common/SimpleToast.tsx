import React from 'react';
import { Toast } from 'react-bootstrap';
import Icon, { IconName } from './Icon';

export interface SimpleToastProps {
  header: string;
  body: string;
  headerIcon?: IconName;
  bg?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
}

function SimpleToast({
  header,
  body,
  headerIcon,
  bg,
}: SimpleToastProps): React.ReactElement {
  return (
    <Toast bg={bg}>
      <Toast.Header>
        {headerIcon && <Icon iconName={headerIcon} />}
        {header}
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

export default SimpleToast;

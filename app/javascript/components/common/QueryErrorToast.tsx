import React, { useState } from 'react';
import { Accordion, Toast, ToastProps } from 'react-bootstrap';

export interface QueryErrorToastProps {
  header: string;
  bodyPreamble?: string;
  errors: string[];
  bg?: ToastProps['bg'];
}

function QueryErrorToast({
  header,
  bodyPreamble = 'The messages from the server are:',
  errors,
  bg = 'danger',
}: QueryErrorToastProps): React.ReactElement {
  const [show, setShow] = useState(true);

  return (
    <Toast bg={bg} show={show} onClose={() => setShow(false)}>
      <Toast.Header>{header}</Toast.Header>
      <Toast.Body>
        <p>{bodyPreamble}</p>
        <Accordion>
          {errors.map((error, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>Error {index + 1}</Accordion.Header>
              <Accordion.Body>
                <code>{error}</code>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Toast.Body>
    </Toast>
  );
}

export default QueryErrorToast;

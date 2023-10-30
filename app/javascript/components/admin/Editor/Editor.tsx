import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import MarkdownRenderer from '../../common/MarkdownRenderer';

export interface EditorProps {
  markdown: string;
  onChange: (string) => void;
  className?: string;
  editorClassName?: string;
  previewClassName?: string;
}

function Editor({ markdown, onChange, className, editorClassName, previewClassName }: EditorProps): React.ReactElement {
  return (
    <Container fluid className={[className]}>
      <Row>
        <Col xs='6' className={editorClassName}>
          <h2>Editor</h2>
          <Form>
            <Form.Control as='textarea' onChange={(event) => onChange(event.target.value)} value={markdown} />
          </Form>
        </Col>
        <Col xs='6' className={previewClassName}>
          <h2>Preview</h2>
          <MarkdownRenderer markdown={markdown} />
        </Col>
      </Row>
    </Container>
  );
}

export default Editor;

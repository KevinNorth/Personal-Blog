import React from 'react';
import { Button, Col, Container, Form, Popover, OverlayTrigger, Row } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import Spacer from '../../common/Spacer';

export interface EditorProps {
  markdown: string;
  onChange: (string) => void;
  className?: string;
  editorClassName?: string;
  previewClassName?: string;
}

const popover = (
  <Popover id='editor-syntax-help'>
    <Popover.Header as="h3">Supported Markdown Syntax</Popover.Header>
    <Popover.Body>
      <p>You can use these Markdown bits:</p>
      <ul>
        <li>
          Basic formatting from <a href='https://commonmark.org/help/' target='__blank'>CommonMark</a>.
        </li>
        <li>
          <a href='https://github.github.com/gfm/' target='__blank'>GitHub Flavored Markdown</a>, including <s>~~strikethrough~~</s> and&nbsp;
          <a href='https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables' target='__blank'>
            tables
          </a>.
        </li>
        <li>
          Syntax highlighting for code blocks. Specify the language after the initial ``` backticks.
        </li>
        <li>
          <a href='https://icons.getbootstrap.com/' target='__blank'>Bootstrap Icons</a>.
          Use <code>&lt;img src=&quot;PascalCaseIconName&quot; /&gt;</code>.
          For names that begin with a number, use i.e. <code>&lt;img src=&quot;Icon1Circle&quot; /&gt;</code> with &quot;Icon&quot; appended to the start of the icon name.
        </li>
      </ul>
    </Popover.Body>
  </Popover>
);

function Editor({ markdown, onChange, className }: EditorProps): React.ReactElement {
  return (
    <Container fluid className={className}>
      <Row>
        <Col xs='6' className='editor-input'>
          <h2>
            Editor
            <Spacer indent='10px' />
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button className='editor-syntax-help-button'><InfoCircle /></Button>
            </OverlayTrigger>
          </h2>
          <Form>
            <Form.Control as='textarea' onChange={(event) => onChange(event.target.value)} value={markdown} />
          </Form>
        </Col>
        <Col xs='6' className='editor-preview'>
          <h2>Preview</h2>
          <MarkdownRenderer markdown={markdown} />
        </Col>
      </Row>
    </Container>
  );
}

export default Editor;

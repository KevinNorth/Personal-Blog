import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import MarkdownRenderer from '../../common/MarkdownRenderer';

export interface EditorProps {
  alreadyInsideForm: boolean;
  markdown: string;
  onChange: (string) => void;
  className?: string;
  id?: string;
  editorClassName?: string;
  previewClassName?: string;
}

const popover = (
  <Popover id="editor-syntax-help">
    <Popover.Header as="h3">Supported Markdown Syntax</Popover.Header>
    <Popover.Body>
      <p>You can use these Markdown bits:</p>
      <ul>
        <li>
          Basic formatting from{' '}
          <a href="https://commonmark.org/help/" target="__blank">
            CommonMark
          </a>
          .
        </li>
        <li>
          <a href="https://github.github.com/gfm/" target="__blank">
            GitHub Flavored Markdown
          </a>
          , including <s>~~strikethrough~~</s> and&nbsp;
          <a
            href="https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables"
            target="__blank"
          >
            tables
          </a>
          .
        </li>
        <li>
          Syntax highlighting for code blocks. Specify the language after the
          initial ``` backticks.
        </li>
        <li>
          <a href="https://icons.getbootstrap.com/" target="__blank">
            Bootstrap Icons
          </a>
          . Use <code>&lt;img src=&quot;PascalCaseIconName&quot; /&gt;</code>.
          For names that begin with a number, use i.e.{' '}
          <code>&lt;img src=&quot;Icon1Circle&quot; /&gt;</code> with
          &quot;Icon&quot; appended to the start of the icon name.
        </li>
        <li>
          <a href="https://mermaid.js.org/" target="__blank">
            Mermaid.js diagrams
          </a>
          . Put Mermaid markup in a code block with a language of `mermaid`. For
          example:
          <pre>
            ```mermaid
            <br />
            flowchart
            <br />
            &nbsp;&nbsp;A --$gt; B
            <br />
            ```
          </pre>
        </li>
      </ul>
    </Popover.Body>
  </Popover>
);

interface CoreEditorProps {
  children: React.ReactNode;
}

function CoreEditor({ children }: CoreEditorProps): React.ReactElement {
  return (
    <>
      {children}
      <OverlayTrigger trigger="focus" placement="right-end" overlay={popover}>
        <Button className="editor-syntax-help-button">Syntax Help</Button>
      </OverlayTrigger>
    </>
  );
}

interface PreviewProps {
  markdown: string;
}

function Preview({ markdown }: PreviewProps): React.ReactElement {
  return (
    <div className="editor-preview">
      <div className="editor-preview-content">
        <MarkdownRenderer markdown={markdown} />
      </div>
    </div>
  );
}

function Editor({
  alreadyInsideForm,
  markdown,
  onChange,
  className,
  id = 'core-markdown-editor',
}: EditorProps): React.ReactElement {
  let editorInsideForm = null;

  if (alreadyInsideForm) {
    editorInsideForm = (
      <>
        <Form.Control
          as="textarea"
          onChange={(event) => onChange(event.target.value)}
          value={markdown}
        />
      </>
    );
  } else {
    editorInsideForm = (
      <Form>
        <Form.Control
          as="textarea"
          onChange={(event) => onChange(event.target.value)}
          value={markdown}
        />
      </Form>
    );
  }

  return (
    <Tabs
      defaultActiveKey="split"
      id={id}
      className="editor-tabs"
      transition={false}
    >
      <Tab eventKey="split" title="Split Editor">
        <Container fluid className={className}>
          <Row>
            <Col xs="6" className="editor-input">
              <CoreEditor>{editorInsideForm}</CoreEditor>
            </Col>
            <Col xs="6" className="editor-preview-wrapper">
              <Preview markdown={markdown} />
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="editor" title="Editor">
        <Container fluid className={className}>
          <Row>
            <Col xs="12" className="editor-input">
              <CoreEditor>{editorInsideForm}</CoreEditor>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="preview" title="Preview">
        <Container fluid className={className}>
          <Row>
            <Col xs="12" className="editor-preview-wrapper">
              <Preview markdown={markdown} />
            </Col>
          </Row>
        </Container>
      </Tab>
    </Tabs>
  );
}

export default Editor;

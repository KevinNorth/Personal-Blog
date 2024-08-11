import React from 'react';
import { Col, Container, Form, Placeholder, Row } from 'react-bootstrap';

function LoadingEditor(): React.ReactElement {
  return (
    <Container fluid>
      <Form>
        <Row>
          <Col xs={12}>
            <Placeholder size="lg" animation="glow" className="w-100" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
          <Col xs={6}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
          <Col xs={8}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Placeholder animation="glow" className="w-100" />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LoadingEditor;

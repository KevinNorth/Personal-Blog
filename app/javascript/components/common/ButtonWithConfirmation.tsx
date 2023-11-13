import React, { MouseEventHandler, useState } from 'react';
import {
  Button,
  ButtonProps,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
} from 'react-bootstrap';

export interface ButtonWithConfirmationProps {
  cancelButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  cancelButtonText?: string;
  confirmationButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  confirmationButtonText: string;
  confirmationPopoverId: string;
  confirmationText: string | React.ReactNode;
  confirmationTitle?: string;
  onConfirmationClick: MouseEventHandler<HTMLButtonElement>;
  onCancelButtonClick?: MouseEventHandler<HTMLButtonElement>;
  outerButtonProps?: Omit<ButtonProps, 'onclick' | 'children'>;
  outerButtonText: string;
}

function ButtonWithConfirmation({
  cancelButtonProps = {},
  cancelButtonText = 'Cancel',
  confirmationButtonProps = {},
  confirmationButtonText,
  confirmationPopoverId,
  confirmationText,
  confirmationTitle = 'Are you sure?',
  onCancelButtonClick = () => {},
  onConfirmationClick,
  outerButtonProps = {},
  outerButtonText,
}: ButtonWithConfirmationProps): React.ReactElement {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <OverlayTrigger
      trigger="click"
      show={showConfirmation}
      overlay={(popperProps) => (
        <Popover id={confirmationPopoverId} {...popperProps}>
          <PopoverHeader>{confirmationTitle}</PopoverHeader>
          <PopoverBody>
            <Container fluid>
              <Row>
                <Col xs={12}>{confirmationText}</Col>
              </Row>
              <Row>
                <Col xs={5}>
                  <Button
                    {...confirmationButtonProps}
                    onClick={(event) => {
                      setShowConfirmation(false);
                      onConfirmationClick(event);
                    }}
                  >
                    {confirmationButtonText}
                  </Button>
                </Col>
                <Col xs={2} />
                <Col xs={5}>
                  <Button
                    {...cancelButtonProps}
                    onClick={(event) => {
                      setShowConfirmation(false);
                      onCancelButtonClick(event);
                    }}
                  >
                    {cancelButtonText}
                  </Button>
                </Col>
              </Row>
            </Container>
          </PopoverBody>
        </Popover>
      )}
    >
      <Button
        {...outerButtonProps}
        onClick={() => setShowConfirmation(!showConfirmation)}
      >
        {outerButtonText}
      </Button>
    </OverlayTrigger>
  );
}

export default ButtonWithConfirmation;

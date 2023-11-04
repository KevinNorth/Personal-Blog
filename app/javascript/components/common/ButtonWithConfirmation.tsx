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

interface ConfirmationPopoverProps {
  cancelButtonProps: Omit<ButtonProps, 'onClick' | 'children'>;
  cancelButtonText: string;
  confirmationButtonProps: Omit<ButtonProps, 'onClick' | 'children'>;
  confirmationButtonText: string;
  confirmationPopoverId: string;
  confirmationText: string | React.ReactNode;
  confirmationTitle: string;
  onCancelButtonClick: MouseEventHandler<HTMLButtonElement>;
  onConfirmationClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonWithConfirmationProps {
  cancelButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  cancelButtonText?: string;
  confirmationButtonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  confirmationButtonText: string;
  confirmationPopoverId: string;
  confirmationText: string | React.ReactNode;
  confirmationTitle?: string;
  onConfirmationClick: MouseEventHandler<HTMLButtonElement>;
  outerButtonProps?: Omit<ButtonProps, 'onclick' | 'children'>;
  outerButtonText: string;
}

function ConfirmationPopover({
  cancelButtonProps,
  cancelButtonText,
  confirmationButtonProps,
  confirmationButtonText,
  confirmationPopoverId,
  confirmationText,
  confirmationTitle,
  onCancelButtonClick,
  onConfirmationClick
}: ConfirmationPopoverProps): React.ReactElement {
  return (
    <Popover id={confirmationPopoverId}>
      <PopoverHeader>{confirmationTitle}</PopoverHeader>
      <PopoverBody>
        <Container fluid>
          <Row>
            <Col xs={12}>
              {confirmationText}
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              <Button {...confirmationButtonProps} onClick={onConfirmationClick}>
                {confirmationButtonText}
              </Button>
            </Col>
            <Col xs={2} />
            <Col xs={5}>
              <Button {...cancelButtonProps} onClick={onCancelButtonClick}>
                {cancelButtonText}
              </Button>
            </Col>
          </Row>
        </Container>
      </PopoverBody>
    </Popover>);
}

function ButtonWithConfirmation({
  cancelButtonProps = {},
  cancelButtonText = 'Cancel',
  confirmationButtonProps = {},
  confirmationButtonText,
  confirmationPopoverId,
  confirmationText,
  confirmationTitle = 'Are you sure?',
  onConfirmationClick,
  outerButtonProps = {},
  outerButtonText,
}: ButtonWithConfirmationProps): React.ReactElement {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmationPopover = (
    <ConfirmationPopover
      cancelButtonProps={cancelButtonProps}
      cancelButtonText={cancelButtonText}
      confirmationButtonProps={confirmationButtonProps}
      confirmationButtonText={confirmationButtonText}
      confirmationPopoverId={confirmationPopoverId}
      confirmationText={confirmationText}
      confirmationTitle={confirmationTitle}
      onCancelButtonClick={() => setShowConfirmation(false)}
      onConfirmationClick={onConfirmationClick}
    />
  );

  return (
    <OverlayTrigger
      trigger='click'
      show={showConfirmation}
      overlay={confirmationPopover}
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

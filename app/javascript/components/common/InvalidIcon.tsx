import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

export interface InvalidIconProps {
  id: string;
  isInvalid: boolean;
  invalidReason?: string;
}

function InvalidIcon({
  id,
  isInvalid,
  invalidReason,
}: InvalidIconProps): React.ReactElement {
  if (!isInvalid) {
    return <></>;
  }

  if (!invalidReason) {
    return <XCircle className="invalid-icon" />;
  }

  const tooltip = (
    <Tooltip className="invalid-reason" id={id}>
      {invalidReason}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      overlay={tooltip}
      trigger={['hover', 'focus']}
      placement="top"
    >
      <XCircle className="invalid-icon" />
    </OverlayTrigger>
  );
}

export default InvalidIcon;

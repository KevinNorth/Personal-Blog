import React from 'react';
import { CSSLength, isCSSLength } from '../../types/cssLength';

export interface SpacerProps {
  indent: CSSLength;
}

function Spacer({ indent }: SpacerProps): React.ReactElement {
  if (!isCSSLength(indent)) {
    throw new Error(`indent prop "${indent}" is not a CSS length`);
  }

  return <span className='spacer' style={{ paddingLeft: indent }} />;
}

export default Spacer;

import React from 'react';
import * as icons from 'react-bootstrap-icons';

export const iconNames = new Set<string>(Object.keys(icons));

export type IconName = keyof typeof icons;

export function isIconName(str: string): str is IconName {
  return iconNames.has(str);
}

export interface IconProps extends icons.IconProps {
  iconName: IconName;
}

function Icon({ iconName, ...props }: IconProps): React.ReactElement {
  if (!isIconName(iconName)) {
    throw new Error(`${iconName} is not a valid iconName`);
  }

  // Above, we apply an allow-list to the values that can be dropped
  // into this object. This is important, because users supply these
  // values in the Editor component!
  // eslint-disable-next-line security/detect-object-injection
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon {...props} />;
}

export default Icon;

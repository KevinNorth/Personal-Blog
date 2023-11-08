import React from 'react';
import { NavDropdown, NavLink } from 'react-bootstrap';
import { CSSLength } from '../../../types/cssLength';
import Spacer from '../../common/Spacer';
import { NavbarTreeVertex } from './types';

export interface ChildBlogNavbarItemProps {
  thisVertex: NavbarTreeVertex;
  indentLevel: number;
}

function ChildBlogNavbarItem({
  thisVertex,
  indentLevel,
}: ChildBlogNavbarItemProps): React.ReactElement {
  const url = `/${encodeURIComponent(thisVertex.slug)}`;

  const shouldIndent = indentLevel !== 0;
  const indentLength: CSSLength = shouldIndent ? `${indentLevel * 10}px` : '0';
  const spacer = shouldIndent ? <Spacer indent={indentLength} /> : null;

  return (
    <NavDropdown.Item href={url}>
      {spacer}
      <NavLink href={url}>{thisVertex.name}</NavLink>
    </NavDropdown.Item>
  );
}

export default ChildBlogNavbarItem;

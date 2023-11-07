import React from 'react';
import { NavDropdown, NavItem, NavLink } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import ChildBlogNavbarItem from './ChildBlogNavbarItem';
import { NavbarTreeVertex } from './types';

export interface TopLevelBlogNavbarItemProps {
  thisVertex: NavbarTreeVertex;
}

function createChildNavbarItems(
  children: NavbarTreeVertex[],
  indentLevel: number
): React.ReactElement[] {
  const childNodes: React.ReactElement[] = children
    .map((childVertex) => {
      const newChildNode = (
        <ChildBlogNavbarItem
          thisVertex={childVertex}
          indentLevel={indentLevel}
          key={childVertex.id}
        />
      );

      if (childVertex.children.length > 0) {
        return [
          newChildNode,
          ...createChildNavbarItems(childVertex.children, indentLevel + 1),
        ];
      } else {
        return [newChildNode];
      }
    })
    .flat();

  return childNodes.flat();
}

function TopLevelBlogNavbarItem({
  thisVertex,
}: TopLevelBlogNavbarItemProps): React.ReactElement {
  const url = `/blog/${encodeURIComponent(thisVertex.slug)}`;

  if (thisVertex.children.length === 0) {
    return (
      <NavItem className="leaf-category">
        <NavLink href={url}>{thisVertex.name}</NavLink>
      </NavItem>
    );
  }

  const childrenNavItems = createChildNavbarItems(thisVertex.children, 0);

  return (
    <NavItem className="category-with-dropdown">
      <NavLink href={url} className="top-level-category-link">
        {thisVertex.name}
      </NavLink>
      <NavDropdown
        className="top-level-category-dropdown-button"
        title={<ChevronDown />}
      >
        {childrenNavItems}
      </NavDropdown>
    </NavItem>
  );
}

export default TopLevelBlogNavbarItem;

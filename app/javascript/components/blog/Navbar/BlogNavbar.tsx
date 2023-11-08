import React from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import TopLevelBlogNavbarItem from './TopLevelBlogNavbarItem';
import { NavbarTreeVertex } from './types';

export interface BlogNavbarProps {
  tree: NavbarTreeVertex[];
  loading: boolean;
}

function BlogNavbar({ tree, loading }: BlogNavbarProps): React.ReactElement {
  const categoryNavbarItems = tree.map((topLevelCategory) => (
    <TopLevelBlogNavbarItem
      thisVertex={topLevelCategory}
      key={topLevelCategory.id}
    />
  ));

  return (
    <Navbar expand="md">
      <Container fluid>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {' '}
            <Navbar.Brand href="/">Kevin North</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="blog-categories" navbarScroll>
                {categoryNavbarItems}
              </Nav>
              <Nav className="social-media">
                <Nav.Item>
                  <Nav.Link href="https://github.com/KevinNorth">
                    <Github />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="https://www.linkedin.com/in/kevin-j-north-a4489245/">
                    <Linkedin />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default BlogNavbar;

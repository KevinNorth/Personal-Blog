import React from 'react';
import { Nav, Navbar, ToastContainer } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
  toasts: React.ReactElement[];
}

export default function Layout({
  children,
  toasts,
}: LayoutProps): React.ReactElement {
  const location = useLocation();

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>kevinnorth.dev Admin</h1>
      </div>
      <div className="admin-main">
        <div className="admin-sidebar">
          <Navbar>
            <Nav defaultActiveKey={location.pathname}>
              <Nav.Link eventKey="/admin" href="/admin">
                See All Categories and Posts
              </Nav.Link>
              <Nav.Link
                eventKey="/admin/category/new"
                href="/admin/category/new"
              >
                New Category
              </Nav.Link>
              <Nav.Link eventKey="/admin/post/new" href="/admin/post/new">
                New Post
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
        <div className="admin-body">
          <div className="admin-toasts">
            <ToastContainer position="top-start">{toasts}</ToastContainer>
          </div>
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

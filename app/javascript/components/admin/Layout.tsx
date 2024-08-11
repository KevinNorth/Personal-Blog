import React from 'react';
import { Nav, Navbar, ToastContainer } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import getCRSFToken from '../../lib/getCRSFToken';

export interface LayoutProps {
  children: React.ReactNode;
  toasts: React.ReactElement[];
}

async function logout() {
  const headers = new Headers();
  headers.append('X-CSRF-Token', getCRSFToken() || '');

  await fetch('/auth/logout', {
    method: 'DELETE',
    headers,
  });

  // eslint-disable-next-line xss/no-location-href-assign
  window.location.href = '/auth/login';
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
              <Nav.Link eventKey="/" href="/admin">
                See All Posts
              </Nav.Link>
              <Nav.Link eventKey="/post/new" href="/admin/post/new">
                New Post
              </Nav.Link>
              <Nav.Link as="button" onClick={logout} className="logout-button">
                Log out
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

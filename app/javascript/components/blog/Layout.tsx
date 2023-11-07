import React from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import usePageContent from '../../hooks/usePageContent';

export interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): React.ReactElement {
  const { loading, pageContent } = usePageContent();

  return (
    <div className="blog">
      <header className="blog-banner">
        <div className="blog-nav">
          <Navbar></Navbar>
        </div>
      </header>
      <article className="blog-content">
        <header className="blog-header-image">
          <div className="blog-title">
            <h1>{loading ? <Spinner /> : pageContent.title}</h1>
            <h2>{loading ? <Spinner /> : pageContent.subtitle}</h2>
          </div>
        </header>
        <section className="blog-body">{children}</section>
      </article>
    </div>
  );
}

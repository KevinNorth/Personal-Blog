import React from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import usePageContent from '../../hooks/usePageContent';

export interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): React.ReactElement {
  const { loading, pageContent } = usePageContent();

  return (
    <div className="blog">
      <header>
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
      <footer>
        <p>
          Made with Rails, React, GraphQL and pride{' '}
          <img src="/images/progress-flag.svg" alt="Love is Love"></img> by
          Kevin North
        </p>
        <p>
          This website&apos;s code available at{' '}
          <a href="https://github.com/KevinNorth/Personal-Blog">
            <Github /> Github
          </a>
        </p>
      </footer>
    </div>
  );
}

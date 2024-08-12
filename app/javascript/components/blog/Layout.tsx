import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import getAllPosts from '../../graphql/queries/allPosts';
import usePageContent from '../../hooks/usePageContent';
import organizePostsIntoNavbarTree from '../../transforms/trees/organizePostsIntoNavbarTree';
import BlogNavbar from './Navbar/BlogNavbar';

export interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps): React.ReactElement {
  const { loading: allPostsLoading, data: allPostsData } = getAllPosts({
    includeUnpublished: false,
  });
  const { loading: pageContentLoading, pageContent } = usePageContent();

  let navbarTree = [];
  if (!allPostsLoading && allPostsData.allPosts) {
    navbarTree = organizePostsIntoNavbarTree(allPostsData.allPosts);
  }

  return (
    <div className="blog">
      <header>
        <div className="blog-nav">
          <BlogNavbar tree={navbarTree} loading={allPostsLoading} />
        </div>
      </header>
      <article className="blog-content">
        <header className="blog-header-image">
          <div className="blog-title">
            <h1>{pageContentLoading ? <Spinner /> : pageContent.title}</h1>
            <h2>{pageContentLoading ? <Spinner /> : pageContent.subtitle}</h2>
          </div>
        </header>
        <section className="blog-body">{children}</section>
      </article>
      <footer>
        <p>
          This site made with Rails, React, GraphQL and pride{' '}
          <img src="/images/progress-flag.svg" alt="Love is Love"></img>
        </p>
        <p>
          Source code available at{' '}
          <a href="https://github.com/KevinNorth/Personal-Blog">
            <Github /> Github
          </a>
        </p>
      </footer>
    </div>
  );
}

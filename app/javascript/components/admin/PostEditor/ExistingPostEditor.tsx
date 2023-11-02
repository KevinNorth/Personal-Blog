import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import getPostById from '../../../graphql/queries/postById';
import PostEditor from './PostEditor';
import { PostWithoutRelationships } from '../../../graphql/types/post';

function ExistingPostEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getPostById(id);
  const post = loading ? null : data.postById;

  const [hasSetInitialValues, indicateHasSetInitialValues] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');

  if(!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    setTitle(post.title);
    setSubtitle(post.subtitle);
    setSummary(post.summary);
    setSlug(post.slug);
    setPublished(post.published);
    setMarkdown(post.markdown);
  }

  const mutatedPost: PostWithoutRelationships =
  {
    __typename: 'Post',
    createdAt: post?.createdAt || '',
    headerImage: post?.headerImage || null,
    id: post?.id || '',
    markdown,
    order: post?.order || 0,
    published,
    slug,
    subtitle,
    summary,
    title,
    updatedAt: post?.updatedAt || '',
  };

  return <PostEditor
    post={mutatedPost}
    loading={loading}
    categoryId={post?.category?.id || ''}
    onMarkdownChange={setMarkdown}
    onPublishedChange={setPublished}
    onSlugChange={setSlug}
    onSubtitleChange={setSubtitle}
    onSummaryChange={setSummary}
    onTitleChange={setTitle}
  />;
}

export default ExistingPostEditor;

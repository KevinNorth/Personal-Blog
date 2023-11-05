import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import getPostById from '../../../graphql/queries/postById';
import PostEditor from './PostEditor';

function ExistingPostEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getPostById({ id, includeUnpublished: true });
  const post = loading ? null : data.postById;

  const [hasSetInitialValues, indicateHasSetInitialValues] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [order, setOrder] = useState('0');
  const [categoryId, setCategoryId] = useState('');

  if (!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    setTitle(post.title);
    setSubtitle(post.subtitle);
    setSummary(post.summary);
    setSlug(post.slug);
    setPublished(post.published);
    setMarkdown(post.markdown);
    setOrder(String(post.order));
    setCategoryId(post.category?.id || '');
  }

  return (
    <PostEditor
      loading={loading}
      id={post?.id || ''}
      categoryId={categoryId}
      markdown={markdown}
      order={order}
      published={published}
      slug={slug}
      subtitle={subtitle}
      summary={summary}
      title={title}
      onCategoryIdChange={setCategoryId}
      onMarkdownChange={setMarkdown}
      onOrderChange={setOrder}
      onPublishedChange={setPublished}
      onSlugChange={setSlug}
      onSubtitleChange={setSubtitle}
      onSummaryChange={setSummary}
      onTitleChange={setTitle}
    />
  );
}

export default ExistingPostEditor;

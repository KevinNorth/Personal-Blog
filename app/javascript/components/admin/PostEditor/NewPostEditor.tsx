import React, { useState } from 'react';
import PostEditor from './PostEditor';

function NewPostEditor(): React.ReactElement {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [order, setOrder] = useState('0');
  const [categoryId, setCategoryId] = useState('');

  return (
    <PostEditor
      loading={false}
      id={''}
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

export default NewPostEditor;

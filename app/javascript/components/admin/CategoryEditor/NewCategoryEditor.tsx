import React, { useState } from 'react';
import CategoryEditor from './CategoryEditor';

function NewCategoryEditor(): React.ReactElement {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('0');
  const [parentId, setParentId] = useState(null);

  return <CategoryEditor
    loading={false}
    id={''}
    parentId={parentId}
    markdown={markdown}
    name={name}
    order={order}
    published={published}
    slug={slug}
    subtitle={subtitle}
    summary={summary}
    title={title}
    onMarkdownChange={setMarkdown}
    onNameChange={setName}
    onOrderChange={setOrder}
    onParentIdChange={setParentId}
    onPublishedChange={setPublished}
    onSlugChange={setSlug}
    onSubtitleChange={setSubtitle}
    onSummaryChange={setSummary}
    onTitleChange={setTitle}
  />;
}

export default NewCategoryEditor;

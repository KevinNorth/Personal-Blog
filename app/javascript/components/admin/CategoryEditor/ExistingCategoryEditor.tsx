import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import getCategoryById from '../../../graphql/queries/categoryById';
import CategoryEditor from './CategoryEditor';

function ExistingCategoryEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getCategoryById({ id, includeUnpublished: true });
  const category = loading ? null : data.categoryById;

  const [hasSetInitialValues, indicateHasSetInitialValues] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('0');

  if(!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    setTitle(category.title);
    setSubtitle(category.subtitle);
    setSummary(category.summary);
    setSlug(category.slug);
    setPublished(category.published);
    setMarkdown(category.markdown);
    setName(category.name);
    setOrder(String(category.order));
  }

  return <CategoryEditor
    loading={loading}
    id={category?.id || ''}
    parentId={category?.parent?.id || null}
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
    onPublishedChange={setPublished}
    onSlugChange={setSlug}
    onSubtitleChange={setSubtitle}
    onSummaryChange={setSummary}
    onTitleChange={setTitle}
  />;
}

export default ExistingCategoryEditor;

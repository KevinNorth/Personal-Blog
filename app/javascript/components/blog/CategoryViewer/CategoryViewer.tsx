import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getCategoryBySlug from '../../../graphql/queries/categoryBySlug';
import Category from '../../../graphql/types/category';
import useDefaultCategory from '../../../hooks/useDefaultCategory';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import fourOhFour from '../fourOhFour';

export interface CategoryViewerProps {
  showDefaultCategory?: boolean;
}

function PostViewer({
  showDefaultCategory = false,
}: CategoryViewerProps): React.ReactElement {
  let category: Partial<Category> | null = null;
  let loading: boolean = true;

  if (showDefaultCategory) {
    const { defaultCategory, loading: categoryLoading } = useDefaultCategory();

    category = defaultCategory;
    loading = categoryLoading;
  } else {
    const { categorySlug } = useParams();

    const { data, loading: categoryLoading } = getCategoryBySlug({
      slug: categorySlug,
      includeUnpublished: false,
    });

    category = data?.categoryBySlug;
    loading = categoryLoading;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!category) {
    category = { ...fourOhFour, __typename: 'Category' };
  }

  return (
    <MarkdownRenderer
      markdown={category?.markdown || ''}
      className="category-markdown"
    />
  );
}

export default PostViewer;

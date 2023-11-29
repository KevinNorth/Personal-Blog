/**
 * @jest-environment jsdom
 */
import React from 'react';
import snapshotRenderer from 'react-test-renderer';
import { act } from '@testing-library/react';
import { categoriesAndPostsAsArboristTree } from '../../../../transforms/__tests__/fixtures/allCategoriesAndPostsAsArboristTree';
import AdminTree from '../AdminTree';

describe('AdminTree', () => {
  it('renders as expected', () => {
    let wrapper;
    act(() => {
      wrapper = snapshotRenderer.create(
        <AdminTree
          height={1000}
          indentSize={5}
          tree={categoriesAndPostsAsArboristTree}
        />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

/**
 * @jest-environment jsdom
 */
import React from 'react';
import snapshotRenderer from 'react-test-renderer';
import { act } from '@testing-library/react';
import { allPostsAsArboristTree } from '../../../../transforms/trees/__tests__/fixtures/allPostsAsArboristTree';
import AdminTree from '../AdminTree';

describe('AdminTree', () => {
  it('renders as expected', () => {
    let wrapper;
    act(() => {
      wrapper = snapshotRenderer.create(
        <AdminTree height={1000} indentSize={5} tree={allPostsAsArboristTree} />
      );
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

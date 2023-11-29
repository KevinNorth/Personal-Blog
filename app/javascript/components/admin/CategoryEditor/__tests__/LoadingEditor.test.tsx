/**
 * @jest-environment jsdom
 */
import React from 'react';
import snapshotRenderer from 'react-test-renderer';
import { act } from '@testing-library/react';
import LoadingEditor from '../LoadingEditor';

describe('LoadingEditor', () => {
  it('renders as expected', () => {
    let wrapper;
    act(() => {
      wrapper = snapshotRenderer.create(<LoadingEditor />);
    });
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

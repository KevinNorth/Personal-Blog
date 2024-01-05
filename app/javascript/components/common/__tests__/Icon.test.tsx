/**
 * @jest-environment jsdom
 */
import React from 'react';
import * as icons from 'react-bootstrap-icons';
import snapshotRenderer from 'react-test-renderer';
import { act, render } from '@testing-library/react';
import Icon, { IconName, iconNames, IconProps, isIconName } from '../Icon';

const iconProps: Partial<IconProps> = {
  color: 'blue',
  size: 30,
  title: 'test-title',
};

describe('isIconName', () => {
  iconNames.forEach((iconName) => {
    describe(`when passed the string "${iconName}"`, () => {
      it('returns true', () => {
        expect(isIconName(iconName)).toEqual(true);
      });
    });
  });

  describe('when passed an invalid iconName', () => {
    it('returns false', () => {
      expect(isIconName('NotAnIcon')).toEqual(false);
    });
  });

  describe('when passed a blank string', () => {
    it('returns false', () => {
      expect(isIconName('')).toEqual(false);
    });
  });
});

describe('Icon', () => {
  iconNames.forEach((iconName: IconName) => {
    describe(`when given an iconName of "${iconName}"`, () => {
      it('renders as expected', () => {
        let wrapper;
        let expectedWrapper;
        act(() => {
          wrapper = snapshotRenderer.create(
            <Icon iconName={iconName} {...iconProps} />
          );
        });
        act(() => {
          // eslint-disable-next-line security/detect-object-injection
          const ExpectedIcon = icons[iconName];
          expectedWrapper = snapshotRenderer.create(
            <ExpectedIcon {...iconProps} />
          );
        });
        expect(wrapper.toJSON()).toEqual(expectedWrapper.toJSON());
      });
    });
  });

  describe('when given an invalid iconName', () => {
    const actualError = console.error;

    beforeEach(() => {
      // Supresses an expected error message in the test output
      console.error = () => {};
    });

    afterEach(() => {
      console.error = actualError;
    });

    it('throws an error', () => {
      expect(() =>
        render(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Icon iconName={'NotAnIcon' as any} />
        )
      ).toThrow(new Error('NotAnIcon is not a valid iconName'));
    });
  });
});

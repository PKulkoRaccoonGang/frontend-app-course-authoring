import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import EditorContainer from './EditorContainer';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // use actual for all non-hook parts
  useParams: () => ({
    blockId: 'company-id1',
    blockType: 'html',
  }),
}));

const props = { learningContextId: 'cOuRsEId' };

describe('Editor Container', () => {
  describe('snapshots', () => {
    test('rendering correctly with expected Input', () => {
      expect(shallow(<EditorContainer {...props} />).snapshot).toMatchSnapshot();
    });
  });
});

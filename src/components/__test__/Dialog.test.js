import React from 'react';
import renderer from 'react-test-renderer';
import Dialog from '../Dialog';

test('renders correctly', () => {
    const component = renderer.create(<Dialog></Dialog>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
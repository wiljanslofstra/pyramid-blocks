/* eslint-disable */
import React from 'react';
import BlockControl from 'components/BlockControl';
import { shallow, mount } from 'enzyme';
/* eslint-enable */

const fakeProps = {
  title: 'Test',
  icon: 'SVG icon',
  index: 1,
  moveUp: () => {},
  moveDown: () => {},
  removeBlock: () => {},
};

describe('BlockControl component', () => {
  it('Should create a BlockControl component without errors', () => {
    shallow(<BlockControl {...fakeProps} />);
  });

  it('Should have a .PyramidControl className', () => {
    const element = shallow(<BlockControl {...fakeProps} />);
    expect(element).to.have.className('PyramidControl');
  });

  it('Should render the title', () => {
    const element = mount(<BlockControl {...fakeProps} title="Hello world" />);
    expect(element.find('.PyramidControl__TitleText')).to.have.text('Hello world');
  });

  it('Should render the icon', () => {
    const icon = `
      <svg
        id="i-edit"
        viewBox="0 0 32 32"
        width="32" height="32"
        fill="none"
        stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%">
          <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
      </svg>
    `;
    const element = mount(<BlockControl {...fakeProps} icon={icon} />);
    expect(element.find('.PyramidControl__TitleIcon')).to.have.html().match(/svg/);
  });

  it('Should not render the icon if it\'s not set', () => {
    const element = mount(<BlockControl {...fakeProps} icon={null} />);
    expect(element.find('.PyramidControl__TitleIcon')).to.not.be.present();
  });

  it('Should render controls for moveDown, moveUp and removeBlock', () => {
    const element = mount(<BlockControl {...fakeProps} />);
    expect(
      element.find('.PyramidControl__Controls')
    ).to.have.exactly(3).descendants('.PyramidControl__Control');
  });
});

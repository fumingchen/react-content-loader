import 'jsdom-global/register'
import React from 'react'

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

import ContentLoader from '../src/index'

describe('<ContentLoader />:', () => {
  describe('when type is custom', () => {
    const wrapper = mount(
      <ContentLoader>
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="82" y="44" rx="3" ry="3" width="250" height="10" />
        <circle cx="35" cy="35" r="35" />
      </ContentLoader>
    )

    it('should render custom element', () => {
      expect(wrapper.find('rect')).to.have.length(3)
      expect(wrapper.find('circle')).to.have.length(1)
    })
  })

  describe('Props are propagated', () => {
    const wrapper = mount(
      <ContentLoader
        speed={10}
        height={200}
        width={200}
        animate={false}
        primaryColor="#000"
        secondaryColor="#fff"
        preserveAspectRatio="xMaxYMax"
        className="random-className"
        style={{ marginBottom: '10px' }}
      />
    )

    it('`speed` is a number and used', () => {
      expect(wrapper.props().speed).to.equal(10)
    })

    it('`height` is a number and used', () => {
      expect(wrapper.props().height).to.equal(200)
    })

    it('`width` is a number and used', () => {
      expect(wrapper.props().width).to.equal(200)
    })

    it('`animate` is a boolean and used', () => {
      expect(wrapper.props().animate).to.be.false
    })

    it('`primaryColor` is a string and used', () => {
      expect(wrapper.props().primaryColor).to.string('#000')
    })

    it('`secondaryColor` is a string and used', () => {
      expect(wrapper.props().secondaryColor).to.string('#fff')
    })

    it('`preserveAspectRatio` is a string and used', () => {
      expect(wrapper.props().preserveAspectRatio).to.string('xMaxYMax')
    })

    it('`style` is a object and used', () => {
      expect(wrapper.props().style).to.deep.equal({ marginBottom: '10px' })
    })

    it('`uniquekey` does not generate undefined `id` values for svg', () => {
      const idClip = wrapper.find('clipPath').prop('id')
      const idGradient = wrapper.find('linearGradient').prop('id')
      expect(idClip).to.not.contain(undefined)
      expect(idGradient).to.not.contain(undefined)
    })

    it('render two components with diferents ids', () => {
      const otherComp = mount(<ContentLoader />)

      const idClip = wrapper.find('clipPath').prop('id')
      const idGradient = wrapper.find('linearGradient').prop('id')

      const idClipOtherCom = otherComp.find('clipPath').prop('id')
      const idGradientOtherCom = otherComp.find('linearGradient').prop('id')

      expect(idClip).to.not.equal(idClipOtherCom)
      expect(idGradient).to.not.equal(idGradientOtherCom)
    })

    describe('inside <Wrap />', () => {
      it('exists', () => {
        expect(wrapper.find('Wrap')).to.have.length(1)
      })

      it('has no `animate` element', () => {
        expect(wrapper.find('animate')).to.be.empty
      })
    })
  })
})

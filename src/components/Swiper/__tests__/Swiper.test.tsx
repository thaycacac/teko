import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { Swiper, classNames } from '../index'

describe('classnames', () => {
  test('it should return class string when input is string', () => {
    expect(classNames('.slide-container')).toEqual('slide-container')
  })

  test('it should return class string when input is html element', () => {
    const el = document.createElement('div')
    el.className = 'slide-container'

    expect(classNames(el)).toEqual('slide-container')
  })
})

describe('Swiper', () => {
  test('Swiper renders correctly', () => {
    const tree = renderer.create(
      <Swiper>
        <div>Child 1</div>
        <div>Child 2</div>
      </Swiper>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('Swiper renders correctly with default props', () => {
    const { container } = render(
      <Swiper>
        <div>Child 1</div>
        <div>Child 2</div>
      </Swiper>
    )
    const containerElement = container.getElementsByClassName('swiper-container')
    expect(containerElement.length).toBe(1)

    const wrapperElement = container.getElementsByClassName('swiper-wrapper');
    expect(wrapperElement.length).toBe(1);
  })

  test('Swiper renders correctly with pagination', () => {
    const { container } = render(
      <Swiper pagination={{ el: '.swiper-pagination' }}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Swiper>
    )
    const containerElement = container.getElementsByClassName('swiper-container')
    expect(containerElement.length).toBe(1)

    const wrapperElement = container.getElementsByClassName('swiper-wrapper')
    expect(wrapperElement.length).toBe(1)

    const paginationElement = container.getElementsByClassName('swiper-pagination');
    expect(paginationElement.length).toBe(1);
  })
})

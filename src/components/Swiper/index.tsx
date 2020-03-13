import React, { Children, useRef, useEffect, cloneElement, ReactElement } from 'react'
import { Swiper as SwiperLib, SwiperOptions, SelectableElement, Pagination } from 'swiper/js/swiper.esm'

// Custom Swiper build https://swiperjs.com/api/#custom-build
SwiperLib.use([Pagination])

type Maybe<T> = T | null;

interface SwiperProps extends SwiperOptions {
  children: ReactElement[];
}
type SwiperInstance = Maybe<SwiperLib>

export const classNames = (el: SelectableElement): string => {
  if (typeof el === 'string') {
    return el
      .split('.')
      .join(' ')
      .trim();
  } else if (el instanceof HTMLElement) {
    return el.className;
  }

  return ''
}
export const Swiper: React.FunctionComponent<SwiperProps> = (props: SwiperProps) => {
   // Define swiper ref
   const swiperNodeRef = useRef<HTMLDivElement>(null);

   // Define swiper instance ref
   const swiperInstanceRef = useRef<SwiperInstance>(null);

  const destroySwiper = (): void => {
    if (swiperInstanceRef.current !== null) {
      swiperInstanceRef.current.destroy(true, true)
      swiperInstanceRef.current = null
    }
  }
  const buildSwiper = (): void => {
    if (swiperNodeRef.current && swiperInstanceRef.current === null) {
      swiperInstanceRef.current = new SwiperLib(swiperNodeRef.current, Object.assign({}, props))
    }
  }

  const renderContent = (e: ReactElement) => {
    return cloneElement(e, {
      ...e.props,
      className: 'swiper-slide',
    })
  }

  useEffect(() => {
    buildSwiper()
    return (): void => destroySwiper()
  }, [])
  return (
    <div className="swiper-container" ref={swiperNodeRef}>
      <div className="swiper-wrapper">
        {Children.map(props.children, renderContent)}
      </div>
      {props.pagination && (
        <div className={classNames(props.pagination.el)} />
      )}
    </div>
  )
}

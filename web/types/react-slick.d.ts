declare module "react-slick" {
    import React from "react";
  
    interface SliderProps {
      children?: React.ReactNode;
      accessibility?: boolean;
      adaptiveHeight?: boolean;
      afterChange?: (currentSlide: number) => void;
      appendDots?: (dots: React.ReactNode) => React.ReactNode;
      arrows?: boolean;
      asNavFor?: Slider;
      autoplay?: boolean;
      autoplaySpeed?: number;
      beforeChange?: (currentSlide: number, nextSlide: number) => void;
      centerMode?: boolean;
      centerPadding?: string;
      className?: string;
      cssEase?: string;
      customPaging?: (index: number) => React.ReactNode;
      dots?: boolean;
      dotsClass?: string;
      draggable?: boolean;
      easing?: string;
      edgeFriction?: number;
      fade?: boolean;
      focusOnSelect?: boolean;
      infinite?: boolean;
      initialSlide?: number;
      lazyLoad?: "ondemand" | "progressive";
      nextArrow?: React.ReactNode;
      onEdge?: (swipeDirection: string) => void;
      onInit?: () => void;
      onLazyLoad?: (slidesToLoad: number[]) => void;
      onReInit?: () => void;
      onSwipe?: (swipeDirection: string) => void;
      pauseOnDotsHover?: boolean;
      pauseOnFocus?: boolean;
      pauseOnHover?: boolean;
      prevArrow?: React.ReactNode;
      responsive?: {
        breakpoint: number,
        settings: "unslick" | SliderProps,
      }[];
      rtl?: boolean;
      slide?: string;
      slidesPerRow?: number;
      slidesToScroll?: number;
      slidesToShow?: number;
      speed?: number;
      swipe?: boolean;
      swipeEvent?: (swipeDirection: string) => void;
      swipeToSlide?: boolean;
      touchMove?: boolean;
      touchThreshold?: number;
      useCSS?: boolean;
      useTransform?: boolean;
      variableWidth?: boolean;
    }
  
    export default class Slider extends React.Component<SliderProps> {
        slickNext(): void
        slickPrev(): void
        slickGoTo(slideNumber: number, dontAnimate ?: boolean): void
        slickPause(): void
        slickPlay(): void
    }
  }
  
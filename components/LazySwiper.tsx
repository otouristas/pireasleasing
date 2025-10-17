"use client";
import { lazy, Suspense, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Swiper = lazy(() => import('swiper/react').then(module => ({ default: module.Swiper })));
const SwiperSlide = lazy(() => import('swiper/react').then(module => ({ default: module.SwiperSlide })));

interface LazySwiperProps {
  children: React.ReactNode;
  className?: string;
  modules?: any[];
  navigation?: boolean;
  pagination?: boolean | object;
  autoplay?: boolean | object;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  breakpoints?: { [width: number]: any; [ratio: string]: any };
  onSwiper?: (swiper: any) => void;
  loop?: boolean;
}

export default function LazySwiper(props: LazySwiperProps) {
  const [modules, setModules] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load modules
    if (props.modules) {
      setModules(props.modules);
      setIsLoaded(true);
    } else {
      // Load default modules
      import('swiper/modules').then(module => {
        const loadedModules = [];
        if (props.navigation) loadedModules.push(module.Navigation);
        if (props.pagination) loadedModules.push(module.Pagination);
        if (props.autoplay) loadedModules.push(module.Autoplay);
        setModules(loadedModules);
        setIsLoaded(true);
      });
    }
  }, [props.modules, props.navigation, props.pagination, props.autoplay]);

  if (!isLoaded) {
    return (
      <div className={`${props.className || ''} flex items-center justify-center min-h-[300px]`}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className={`${props.className || ''} flex items-center justify-center min-h-[300px]`}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    }>
      <Swiper
        modules={modules}
        navigation={props.navigation}
        pagination={props.pagination}
        autoplay={props.autoplay}
        spaceBetween={props.spaceBetween}
        slidesPerView={props.slidesPerView}
        breakpoints={props.breakpoints}
        onSwiper={props.onSwiper}
        loop={props.loop}
        className={props.className}
      >
        {props.children}
      </Swiper>
    </Suspense>
  );
}

export { SwiperSlide };
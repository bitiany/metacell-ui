/// <reference types="react-scripts" />
declare module "classnames" {
  import classNames from 'classnames'
  export default classNames
}

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css'
declare module '*.scss'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'react-canvas-nest'
declare module 'redux-persist/lib/storage'
declare module '@/components/*'
// declare module 'crypto-js/*'
import type { ImageProps } from 'next/image'

export interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  size?: number
}

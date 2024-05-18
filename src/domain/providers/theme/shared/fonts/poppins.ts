/* Roboto */
import '@fontsource/poppins/100.css'
import '@fontsource/poppins/200.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
})

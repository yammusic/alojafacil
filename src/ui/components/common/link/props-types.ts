import type { LinkProps as MuiLinkProps } from '@mui/material'
import type { LinkProps as NextLinkProps } from 'next/link'

type BaseLinkProps = NextLinkProps & MuiLinkProps

export interface LinkProps extends BaseLinkProps {
}

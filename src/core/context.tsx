import { createContext } from 'react'
import { IPresentation } from './types'

export const PresentationContext = createContext<IPresentation>({} as any)

import { createContext } from 'react'
import { PresentationModule } from './types'
import React from 'react'

export const PresentationModuleContext = createContext<PresentationModule>(
  {} as any
)

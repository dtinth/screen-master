import { ReactNode } from 'react'

export interface PresentationModule {
  display(state: any): ReactNode
  controller(state: any, update: (state: any) => any): ReactNode
}

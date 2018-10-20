import { ReactNode } from 'react'

export interface IPresentation {
  /**
   * Renders the view to be displayed on the projector.
   * @param state Current state of the screen
   */
  display(state: any): ReactNode

  /**
   * Renders the controller.
   * @param state Current state of the screen
   * @param update A function that can be called update the screen state.
   *  It should take the old state and return the new state.
   */
  controller(state: any, update: (state: any) => any): ReactNode
}

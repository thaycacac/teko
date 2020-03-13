import React, { useReducer, useContext, useMemo } from 'react'
import { ScreenPayload } from '../types'

export interface NavigationProviderProps {
  children: React.ReactNode;
}

export interface State {
  stack: Array<ScreenPayload>;
}

export type Action =
  | { type: 'PUSH'; payload: ScreenPayload }
  | { type: 'POP' };

type Dispatch = (action: Action) => void

const initialState: State = {
  stack: [{
    name: 'PRODUCT_LISTING',
  }]
}

export type ScreenPayloadWithOrder = ScreenPayload & {
  order: number;
}

export type NavigationState = State & {
  currentScreen: ScreenPayload | undefined;
  stackWithOrder: Array<ScreenPayloadWithOrder>;
}

const NavigationStateContext = React.createContext<NavigationState>(initialState as NavigationState)
const NavigationDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function navigationReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'PUSH':
      return {
       ...state,
       stack: [...state.stack, action.payload],
      }
    case 'POP':
      return {
        ...state,
        stack: state.stack.length > 1 ? state.stack.filter((_, index) => index !== state.stack.length - 1) : initialState.stack
      }
    default:
      throw new Error()
  }
}

export function NavigationProvider({ children }: NavigationProviderProps): React.ReactNode {
  const [state, dispatch] = useReducer(navigationReducer, initialState)
  const navigationState: NavigationState = useMemo(() => {
    return {
      stack: state.stack,
      currentScreen: state.stack.length > 0 ? state.stack.slice(-1)[0] : undefined,
      stackWithOrder: state.stack.map((item, index) => Object.assign({}, item, {
        order: index,
      }))
    }
  }, [state])
  return (
    <NavigationStateContext.Provider value={navigationState}>
      <NavigationDispatchContext.Provider value={dispatch}>
        {children}
      </NavigationDispatchContext.Provider>
    </NavigationStateContext.Provider>
  )
}

export function useNavigationState(): NavigationState {
  const context = useContext(NavigationStateContext)
  if (!context) {
    throw new Error('useNavigationState must be inside a NavigationProvider with a state value')
  }
  return context
}

export function useNavigationDispatch(): Dispatch {
  const context = useContext(NavigationDispatchContext)
  if (!context) {
    throw new Error('useNavigationDispatch must be inside a NavigationProvider with a state dispatch')
  }
  return context
}

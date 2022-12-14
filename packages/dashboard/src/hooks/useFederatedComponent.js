import React from 'react'
import { useDynamicScript } from './useDynamicScript'
const componentCache = new Map()

export const useFederatedComponent = (remoteUrl, scope, module) => {
  const key = `${remoteUrl}-${scope}-${module}`
  const [Component, setComponent] = React.useState(null)

  const { ready, errorLoading } = useDynamicScript(remoteUrl)
  React.useEffect(() => {
    if (Component) setComponent(null)
    // Only recalculate when key changes
  }, [key])

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module))
      componentCache.set(key, Comp)
      setComponent(Comp)
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key])

  return { errorLoading, Component }
}

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    const container = window[scope] // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)

    const Module = factory()

    return Module
  }
}

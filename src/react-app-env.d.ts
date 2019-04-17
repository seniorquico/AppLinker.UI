/// <reference types="react-scripts" />

interface Window {
  AbortController: AbortController | undefined
}

namespace ReactDOM {
  function unstable_createRoot(element: any): any
}

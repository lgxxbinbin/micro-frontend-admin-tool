import React from 'react'

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="alert-container" role="alert-container">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          window.location.reload()
        }}
      >
        Try again
      </button>
    </div>
  )
}

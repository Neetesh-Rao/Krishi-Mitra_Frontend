// src/components/ErrorBoundary.jsx
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Something Went Wrong</h2>
              <p className="text-gray-600 mb-4">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
              {this.state.error && (
                <pre className="bg-red-50 text-red-800 p-3 rounded-lg text-sm mb-4 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              )}
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
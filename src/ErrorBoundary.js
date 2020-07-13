import React, { Component } from 'react'

import Header from './components/Header'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <Header />
                    <h1 className="grid-33 centered">Something went wrong.</h1>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
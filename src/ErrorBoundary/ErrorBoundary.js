import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fallbackUI: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo.componentStack);
  }

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    const { fallbackUI, children } = this.props;

    if (this.state.hasError) {
      return fallbackUI;
    }

    return children;
  }
}

export default ErrorBoundary;

import React, { Component } from "react";
import { Box, Typography } from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show the error message
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render custom error message or component here
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor="#f8f8f8">
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Please try again later.
          </Typography>
        </Box>
      );
    }

    // Render the wrapped components if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;

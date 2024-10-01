import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, AppBar, Toolbar, Typography, Card, CardContent, CardMedia } from '@mui/material';

// ErrorBoundary component (handles errors gracefully)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Navbar component (renders the navigation bar)
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NASA APOD Viewer</Typography>
      </Toolbar>
    </AppBar>
  );
};

// APOD component (renders the APOD data)
const APOD = ({ data }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={data.url}
        alt={data.title}
        style={{ height: '500px', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h4">{data.title}</Typography>
        <Typography variant="body1">{data.explanation}</Typography>
        <Typography variant="body2">Date: {data.date}</Typography>
      </CardContent>
    </Card>
  );
};

// Main App component (fetches data and renders everything)
function App() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/apod')
      .then((response) => {
        setApodData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <Navbar />
      <Container>
        <APOD data={apodData} />
      </Container>
    </ErrorBoundary>
  );
}

export default App;

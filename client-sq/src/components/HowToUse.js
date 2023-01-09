import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';

function HowToUse() {
  const [input, setInput] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(input);
    }
  };

  const search = (dynInput) => {
    console.log(`Searching for: ${dynInput}`);
  };

  return (
    <div style={{ minHeight: "100vh", width: "80%", maxWidth: "100%" }}>
      <Container style={{ fontFamily: 'DM Sans', marginLeft: 24, marginTop: '5%' }}>
        <h1 style={{ fontWeight: '1000', color: '#3d435a' }}>How to Use</h1>

        <Typography style={{ marginTop: '2%' }} variant="h4">
          pics
        </Typography>
        <Typography style={{ marginTop: '1%' }} variant="body1">
          1. yadayadayada
        </Typography>
        <Typography style={{ marginTop: '1%' }} variant="body1">
          2. yadayadayada
        </Typography>
        <Typography style={{ marginTop: '1%' }} variant="body1">
          3. yadayadayada
        </Typography>
      </Container>

    </div>
  );
}

export default HowToUse;

import React from 'react';
import Routing from './routes/Routing';
import { ComposeProviders } from './context/composeProviders';

const App: React.FC = () => {

  return (
    <ComposeProviders>
      <Routing />
    </ComposeProviders>
  );
};

export default App;

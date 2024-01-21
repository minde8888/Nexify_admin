import React from 'react';
import Routing from './routes/Routing';
import { ComposeProviders } from './components/Context/ComposeProviders';

const App: React.FC = () => {

  return (
    <ComposeProviders>
      <Routing />
    </ComposeProviders>
  );
};

export default App;

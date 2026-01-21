import { memo } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store';
import { queryClient } from '@/services/queryClient';
import AppRouter from '@/router';
import '@/i18n';
import '@/styles/index.css';

const App = memo(() => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
});

App.displayName = 'App';

export default App;

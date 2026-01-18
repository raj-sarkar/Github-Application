import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { authStore, persistor } from '@store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={authStore}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>,
);

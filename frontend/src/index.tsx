import React from 'react';
import ReactDOM from 'react-dom/client';
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import reportWebVitals from './reportWebVitals';
import Failed from './components/common/Failed';
import Spinner from './components/common/Spinner';
import { AuthContextProvider } from './utils/auth';
import router from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={Failed}>
        <React.Suspense fallback={<Spinner />}>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </React.Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

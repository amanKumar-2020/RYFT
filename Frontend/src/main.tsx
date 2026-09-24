import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App/App.ts'
import routes from "./App/app.routes.tsx"
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './App/app.store.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
);

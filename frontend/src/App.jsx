import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/user-context';
import router from './routes/router';

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </AuthProvider>
  );
}
export default App;

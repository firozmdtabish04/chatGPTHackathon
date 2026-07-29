import { AuthProvider } from "../hooks/useAuth";
import AppRoutes from "../config/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

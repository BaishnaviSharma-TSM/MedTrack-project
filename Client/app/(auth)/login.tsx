import { LoginForm } from '@/features/auth';
import { useDocumentTitle } from '@/hooks';

/** Login screen — white minimal layout, no clay background wrapper */
export default function LoginScreen() {
  useDocumentTitle('Login');
  return <LoginForm />;
}

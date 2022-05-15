import { client } from 'client';

// import styles from './AuthWrapper.module.scss'

export default function AuthWrapper({ children, enableRedirect }) {
  const { useAuth } = client.auth;
  const { isAuthenticated, isLoading } = useAuth({
    shouldRedirect: enableRedirect,
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  if (!isAuthenticated) {
    return <>Need to Login</>;
  }
  return <>{children}</>;
}

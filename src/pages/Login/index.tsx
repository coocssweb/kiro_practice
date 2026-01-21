import { memo, useState, useCallback, useRef, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/services/api/auth';
import { useAuth } from '@/hooks/useAuth';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Login = memo(() => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError('');

      // 验证
      if (!username.trim()) {
        setError(t('login.usernameRequired'));
        usernameRef.current?.focus();
        return;
      }
      if (!password.trim()) {
        setError(t('login.passwordRequired'));
        passwordRef.current?.focus();
        return;
      }

      try {
        const response = await loginMutation.mutateAsync({ username, password });
        if (response.code === 0 && response.data) {
          login(response.data);
        } else {
          setError(response.message || t('login.loginFailed'));
        }
      } catch {
        setError(t('login.loginFailed'));
      }
    },
    [username, password, loginMutation, login, t]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex justify-end p-4 space-x-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="card w-full max-w-md">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-8">
            {t('login.title')}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {t('login.username')}
              </label>
              <input
                ref={usernameRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('login.usernamePlaceholder')}
                className="input"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                {t('login.password')}
              </label>
              <input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                className="input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {loginMutation.isPending ? t('common.loading') : t('login.loginButton')}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-xs text-text-secondary text-center">
              Demo: admin / admin123 或 user / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Login.displayName = 'Login';

export default Login;

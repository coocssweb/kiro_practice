import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

const Home = memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useAuth();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="card">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {t('home.welcome')}, {userInfo?.nickname}!
          </h1>
          <p className="text-text-secondary">
            {t('home.title')}
          </p>
        </div>

        {/* User Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            {t('home.userInfo')}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              {userInfo?.avatar && (
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-border"
                />
              )}
              <div>
                <p className="text-text-primary font-medium">{userInfo?.nickname}</p>
                <p className="text-text-secondary text-sm">@{userInfo?.username}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-text-secondary text-sm">{t('home.username')}</p>
                <p className="text-text-primary">{userInfo?.username}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">{t('home.nickname')}</p>
                <p className="text-text-primary">{userInfo?.nickname}</p>
              </div>
              <div className="col-span-2">
                <p className="text-text-secondary text-sm">{t('home.roles')}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userInfo?.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
});

Home.displayName = 'Home';

export default Home;

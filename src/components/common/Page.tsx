import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FAKE_FOOTER_DATA } from '../../api/mockData';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../features/auth/authSlice';

interface PageContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Page: React.FC<PageContainerProps> = ({
  title,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (title) {
      document.title = `${title} | ГК Астрал`;
    }
  }, [title]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Header with fake profile data passed via props */}
      <Header
        appName="Астрал.Слова"
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {/* Children contains Body component */}
      {children}

      {/* Footer with fake contacts passed via props */}
      <Footer
        companyName={FAKE_FOOTER_DATA.companyName}
        email={FAKE_FOOTER_DATA.email}
        phone={FAKE_FOOTER_DATA.phone}
        address={FAKE_FOOTER_DATA.address}
        copyright={FAKE_FOOTER_DATA.copyright}
        links={FAKE_FOOTER_DATA.links}
      />
    </div>
  );
};

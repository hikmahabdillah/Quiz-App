import { createContext, useState, useEffect } from 'react';

// untuk menyimpan dan menyediakan nilai (state) di seluruh aplikasi tanpa perlu mengirim props dari satu komponen ke komponen lain
export const AuthContext = createContext();

// menyediakan nilai (context) ke komponen lain yang menjadi children
export const AuthProvider = ({ children }) => {
  // state untuk menyimpan nilai terkait authentikasi user
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // validasi isAuthenticated exist di local storage? jika true, user di anggap sudah login
    const authStatus = localStorage.getItem('isAuthenticated');
    return authStatus === 'true';
  });

  // proses login ketika user sudah berhasil melewati proses validasi
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };
  
  // menangani proses logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // untuk memberikan akses ke isAuthenticated, login, dan logout kepada komponen-komponen yang menjadi children/turunan dari AuthProvider
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

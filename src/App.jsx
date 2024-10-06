import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import QuizForm from './components/Quiz';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if(auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
     <section className="bg-gray-50 dark:bg-gray-900 w-full">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin}/>
      ) : <QuizForm/>}
      </div>
    </section>
  )
}

export default App;

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserData } from "../hooks/useLogin";
import { useNavigate, Navigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext); //get nilai authentikasi dan fungsi login

  // validasi authentikasi user
  if (isAuthenticated) {
    // jika sudah terauthentikasi arahkan ke halaman home
    return <Navigate to="/" />;
  }

  const users = getUserData(); // untuk get data users
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // mencari user berdasarkan username
    const user = users.find((user) => user.username === username);

    // memvalidasi users exist dan validasi password
    if (user && user.password === password) {
      // set nilai pada local storage terkait authentikasi
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      login();
      navigate("/");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <>
      <div className="w-full rounded-lg shadow border md:mt-0 max-w-sm sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight  md:text-2xl text-slate-50">
            Sign in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-slate-50"
              >
                Your username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-slate-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Aldrin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-slate-50"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-slate-50 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 absolute right-0 bottom-[2px]"
              >
                <img
                  src={
                    !showPassword
                      ? "../visibility.svg"
                      : "../visibility_off.svg"
                  }
                  alt=""
                  width="27px"
                />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full text-slate-50 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

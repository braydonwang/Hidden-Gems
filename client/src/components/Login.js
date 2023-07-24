import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Alert from "./Alert";

import authService from "../features/auth/authService";
import logo from "../images/loginLogo.png";

export default function Login() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await authService.login({ data: loginData, navigate });
    if (res.err) {
      setIsError(true);
      setErrorMsg(res.err.response.data.error);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={logo} alt="HiddenGems" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <Input
              htmlFor="email"
              name="email"
              type="email"
              autoC="email"
              label="Email address"
              value={loginData.email}
              handleChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <Input
              htmlFor="password"
              name="password"
              type="password"
              autoC="current-password"
              label="Password"
              value={loginData.password}
              handleChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have one?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-amber-500 hover:text-amber-600"
            >
              Sign up here!
            </a>
          </p>
          {isError && (
            <Alert
              title={"Error!"}
              message={errorMsg}
              handleClose={() => setIsError(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

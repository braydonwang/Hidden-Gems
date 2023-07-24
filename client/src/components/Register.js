import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import logo from "../images/loginLogo.png";
import authService from "../features/auth/authService";
import Alert from "./Alert";

export default function Register() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await authService.register({ data: registerData, navigate });
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
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="flex flex-row justify-between gap-6">
              <Input
                htmlFor="username"
                name="firstName"
                type="text"
                autoC="firstName"
                label="First name"
                value={registerData.firstName}
                handleChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstName: e.target.value,
                  })
                }
              />

              <Input
                htmlFor="username"
                name="lastName"
                type="text"
                autoC="lastName"
                label="Last name"
                value={registerData.lastName}
                handleChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            <Input
              htmlFor="username"
              name="username"
              type="text"
              autoC="username"
              label="Username"
              value={registerData.username}
              handleChange={(e) =>
                setRegisterData({
                  ...registerData,
                  username: e.target.value,
                })
              }
            />

            <Input
              htmlFor="email"
              name="email"
              type="email"
              autoC="email"
              label="Email address"
              value={registerData.email}
              handleChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />

            <Input
              htmlFor="password"
              name="password"
              type="password"
              autoC="current-password"
              label="Password"
              value={registerData.password}
              handleChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
            />

            <div>
              <button
                onClick={handleRegister}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have one?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-amber-500 hover:text-amber-600"
            >
              Log in here!
            </a>
          </p>
          {isError && (
            <Alert
              title="Error!"
              message={errorMsg}
              handleClose={() => setIsError(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

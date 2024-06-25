import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AuthSectionProps {
  label: string;
  inputType: string;
  className: string;
  email?: string;
  setEmail?: (email: string) => void;
  password?: string;
  setPassword?: (password: string) => void;
}

function AuthSection({
  label,
  inputType,
  className,
  email = "",
  setEmail,
  password = "",
  setPassword,
}: AuthSectionProps) {
  const setState = inputType === "email" ? setEmail : setPassword;

  const value = inputType === "email" ? email : password;

  return (
    <div className={className}>
      <label
        htmlFor={inputType}
        id={inputType}
        className={"block text-sm font-medium text-gray-700 dark:text-gray-200"}
      >
        {label}
      </label>
      <input
        className={
          "mt-1 block w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        }
        type={inputType}
        id={inputType}
        name={inputType}
        value={value}
        onChange={(e) => setState && setState(e.target.value)}
      />
    </div>
  );
}

interface AuthProps {
  formOfAuth: "register" | "login";
}

function Auth({ formOfAuth }: AuthProps) {
  const isRegisterForm = formOfAuth === "register";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useAuth(formOfAuth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth(email, password);
  };

  return (
    <main className={"flex-grow flex items-center justify-center"}>
      <div
        className={
          "bg-white dark:bg-slate-600 p-8 rounded shadow-lg w-full max-w-md"
        }
      >
        <h2 className={"text-2xl font-bold mb-6 text-center"}>
          {isRegisterForm ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} action={"#"} method={"POST"}>
          <AuthSection
            className={"mb-4"}
            label={"Email"}
            inputType={"email"}
            email={email}
            setEmail={setEmail}
          />
          <AuthSection
            className={"mb-6"}
            label={"Password"}
            inputType={"password"}
            password={password}
            setPassword={setPassword}
          />
          <button
            type={"submit"}
            className={
              "w-full px-4 py-2 bg-teal-500 text-white font-semibold rounded-md shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            }
          >
            {isRegisterForm ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p
          className={
            "mt-6 text-center text-sm text-gray-600 dark:text-gray-300"
          }
        >
          {isRegisterForm && "Have an account?"}{" "}
          <Link
            to={isRegisterForm ? "/login" : "/register"}
            className={"font-medium text-teal-500 hover:text-teal-400"}
          >
            {isRegisterForm ? "Sign In" : "Create an account"}
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Auth;

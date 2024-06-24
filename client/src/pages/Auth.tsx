interface AuthSectionProps {
  label: string;
  inputType: string;
  className: string;
}

function AuthSection({ label, inputType, className }: AuthSectionProps) {
  return (
    <div className={className}>
      <label
        htmlFor={inputType}
        id={inputType}
        className={"block text-sm font-medium text-gray-700"}
      >
        {label}
      </label>
      <input
        type={inputType}
        id={inputType}
        name={inputType}
        className={
          "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        }
      />
    </div>
  );
}

interface AuthProps {
  formOfAuth: string;
}

function Auth({ formOfAuth }: AuthProps) {
  if (formOfAuth === "register") return <div>register</div>;
  return (
    <main className="flex-grow flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form action="#" method="POST">
          <AuthSection className={"mb-4"} label={"Email"} inputType={"email"} />
          <AuthSection
            className={"mb-6"}
            label={"Password"}
            inputType={"password"}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
            {" "}
            create an account{" "}
          </a>
        </p>
      </div>
    </main>
  );
}

export default Auth;

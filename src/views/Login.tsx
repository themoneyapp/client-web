import { useUserStore } from "src/store";

function Login(): JSX.Element {
  const handleLogin = useUserStore((s) => s.login);

  return (
    <div className="App">
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default Login;

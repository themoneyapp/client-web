import { useUserStore } from "src/store";

function Home(): JSX.Element {
  const userState = useUserStore();

  if (!userState.user) {
    return <h1>Not Logged In</h1>;
  }

  return (
    <div className="App">
      <h1>Welcome, {userState.user.name}!</h1>
    </div>
  );
}

export default Home;

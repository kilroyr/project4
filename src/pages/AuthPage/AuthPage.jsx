import LoginForm from "../../components/LoginForm/LoginForm"
// import NavBar from "../../components/NavBar/NavBar";

export default function AuthPage( { setUser } ) {
  return (
    <>
      <LoginForm setUser={setUser} />
    </>
  );
}
import useAuth from "../shared/hooks/useAuth";

export default function ShowToGuestUsers({ children }) {
  const { isUserLogged } = useAuth();

  return <>{!isUserLogged ? children : null}</>;
}

import { Route } from "@/types/enums/route";
import { User } from "@/types/interfaces/user";
import { useRequestState } from "@/hooks/useRequestState";
import { getApi, getCookies } from "@/misc/injection";
import { errorText } from "@/utils/error";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextProps {
  setUser: (user: User) => void;
  user: User | null;
  isAuthenticated: boolean;
  resetState: () => void;
  isLoading: boolean;
  error: string | null;
  logOut: () => void;
  fetchInitialData: () => Promise<void>;
}

export const UserContextDefaultValue: UserContextProps = {
  setUser: () => {},
  user: null,
  isAuthenticated: false,
  resetState: () => {},
  isLoading: false,
  error: null,
  logOut: () => {},
  fetchInitialData: async () => {},
};

const UserContext = createContext<UserContextProps>(UserContextDefaultValue);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const { isLoading, setIsLoading, error, setError } = useRequestState();

  const isAuthenticated = getCookies().retrieveToken();

  const resetState = () => {
    setUser(null);
  };
  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await getApi().retrieveUser();
      setUser(user);
    } catch (err) {
      logOut();

      setError(errorText(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInitialData();
    }
  }, [isAuthenticated, setIsLoading, setError, setUser]);

  const logOut = () => {
    resetState();
    getCookies().removeToken();
    push(Route.SignIn);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!isAuthenticated,
        setUser,
        resetState,
        isLoading,
        error,
        logOut,
        fetchInitialData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

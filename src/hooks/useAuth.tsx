import { getApi, getCookies } from "@/misc/injection";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRequestState } from "./useRequestState";
import { useUser } from "@/providers/UserProvider";
import { FlatFormErrors, handleError } from "@/utils/error";
import { SignInRequest } from "@/types/requests/sign_in";
import { Route } from "@/types/enums/route";
import { SignUpRequest } from "@/types/requests/sign_up";

export const useAuth = () => {
  const { push } = useRouter();
  const { isLoading, setIsLoading, error, setError } = useRequestState();
  const { resetState, fetchInitialData } = useUser();
  const [formErrors, setFormErrors] = useState<FlatFormErrors | null>(null);

  const login = async (payload: SignInRequest) => {
    try {
      setError(null);
      setFormErrors(null);
      setIsLoading(true);
      const { access_token } = await getApi().signin(payload);
      await fetchInitialData();
      getCookies().setToken(access_token);
      push(Route.Home);
    } catch (e) {
      handleError(e, setError, setFormErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (payload: SignUpRequest) => {
    try {
      setError(null);
      setFormErrors(null);
      setIsLoading(true);
      const { access_token } = await getApi().signup(payload);

      getCookies().setToken(access_token);
      await fetchInitialData();

      push(Route.Home);
    } catch (e) {
      handleError(e, setError, setFormErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    getCookies().removeToken();
    push(Route.SignIn);
    resetState();
  };

  return { login, signUp, logout, isLoading, error, formErrors };
};

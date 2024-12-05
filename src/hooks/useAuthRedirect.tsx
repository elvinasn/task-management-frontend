import { Route } from "@/types/enums/route";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(Route.Home);
    }
  }, [isAuthenticated, router]);
};

import { useQuery } from "@tanstack/react-query";
import { fetchSession } from "../api/auth";
import { Navigate } from "react-router-dom";

const RedirectRoute = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    retry: false, // 세션이 없을 경우 재시도하지 않음
  });

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default RedirectRoute;
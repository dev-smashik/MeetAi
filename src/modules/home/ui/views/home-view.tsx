"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import{ useRouter } from "next/navigation";


export const HomeView = () => {
  const router = useRouter();
  const { data: sesson } = authClient.useSession();
  if (!sesson) {
    return(
      <p>Loading...</p>
    )
  }


  return(
    <div className="flex flex-col p-4 gap-y-4">
      <p>
        Logged in as: <strong>{sesson.user?.name || sesson.user?.email}</strong>
      </p>
      <Button onClick={() => authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/sign-in"),}
      })
      }>
        Sign out</Button>
    </div>
  );
};

// export default HomeView;
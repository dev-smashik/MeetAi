"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const HomeView = () => {
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
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  );
};

// export default HomeView;
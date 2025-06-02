import { HomeView } from "@/modules/home/ui/views/home-view";
import { auth } from "@/lib/auth-client";
import { headers } from "next/headers";

const Page = () => {
  const session = await auth.api.getSession(({

  }))
  return <HomeView />;
}

export default Page;
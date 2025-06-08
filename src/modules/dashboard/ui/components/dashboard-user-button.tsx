import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvater } from "@/components/ui/generated-avatar";
import { ChevronDownIcon, CreditCard, LogOutIcon } from "lucide-react";
import { use } from "react";

export const DashboardUserButton = () => {
  const router = useRouter();  
  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/sign-in");
            }
        }
    })
  }

  if (isPending || !data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-black/5 hover:bg-black/10 overflow-hidden">
        {data.user.image ? (
            <Avatar>
                <AvatarImage src={data.user.image}/>
            </Avatar>
        ) : (
            <GeneratedAvater
                seed={data.user.name}
                variant="initials"
                className="size-9 mr-3" />
        )}

        <div className="flex min-w-0 flex-1 flex-col text-left outline-hidden gap-0.5">
            <p className="font-medium truncate">
                {data.user.name}
            </p>
            <p className="text-sm font-normal text-muted-foreground truncate">
                {data.user.email}
            </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72" side="right">
            <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
                <span className="font-medium truncate">{data.user.name}</span>
                <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                Billing
                <CreditCard className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem 
            onClick={onLogout}
            className="cursor-pointer flex items-center justify-between">
                Logout
                <LogOutIcon className="size-4"/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};

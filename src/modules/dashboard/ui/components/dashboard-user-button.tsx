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

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvater } from "@/components/ui/generated-avatar";
import {
  ChevronDownIcon,
  CreditCard,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { use } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-black/5 hover:bg-black/10 overflow-hidden gap-x-2">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvater
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col text-left outline-hidden gap-0.5">
            <p className="font-medium truncate">{data.user.name}</p>
            <p className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => {}} variant="outline">
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>

            <Button variant="outline" onClick={onLogout}>
                <LogOutIcon className="size-4 text-black" />
                Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-black/5 hover:bg-black/10 overflow-hidden gap-x-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvater
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col text-left outline-hidden gap-0.5">
          <p className="font-medium truncate">{data.user.name}</p>
          <p className="text-sm font-normal text-muted-foreground truncate">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72" side="right">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCard className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

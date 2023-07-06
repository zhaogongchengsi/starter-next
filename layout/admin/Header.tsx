import { useAtom } from "jotai";
import { collapsed } from "./atom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/logged/use-user";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminHeader = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(collapsed);
  const [userinfo] = useUser();

  const onCollapsedBtn = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="h-[--admin-header-height] flex justify-between px-3 items-center border-b border-solid border-[--app-border-color]">
      <button onClick={onCollapsedBtn}>
        <div className={cn("w-8 h-8 i-tabler-arrows-left transition-all", isCollapsed ? "rotate-180" : "rotate-0")} />
      </button>

      <div className="flex h-full justify-center items-center gap-5 pr-10">
        <ModeToggle />
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={20}>
              <DropdownMenuLabel>{userinfo.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>个人中心</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>注销登陆</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="max-w-7xl">
            <DialogHeader>
              <DialogTitle>个人中心</DialogTitle>
            </DialogHeader>
            <div>
              This action cannot be undone. Are you sure you want to permanently delete this file from our servers?
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default AdminHeader;

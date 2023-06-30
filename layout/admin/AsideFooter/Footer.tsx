import { useAtom } from "jotai";
import { collapsed } from "../atom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const AsideFooter: React.FC = () => {
  const [isCollapsed] = useAtom(collapsed);

  return (
    <div className={cn("h-[--admin-aside-footer-height] flex w-full")}>
      <button>
        <div className="w-10 h-10 i-tabler-user" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-10 h-10 i-tabler-settings" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AsideFooter;

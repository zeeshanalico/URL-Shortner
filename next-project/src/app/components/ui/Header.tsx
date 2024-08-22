// components/Header.tsx
import Link from "next/link";
import {DropdownMenuItem,DropdownMenu,DropdownMenuContent,DropdownMenuLabel,DropdownMenuTrigger} from  './DropdownMenu'
import { Button } from "./Button";
import {LuLink} from '../../../../public/icons' 
import { Avatar } from "./Avatar";

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-muted px-4 py-3 sm:px-6">
    <div className="container mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <LuLink className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">{title}</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              {/* <AvatarImage src="/placeholder.svg" alt="User Avatar" /> */}
              <div>Avatar Loading..</div>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
);

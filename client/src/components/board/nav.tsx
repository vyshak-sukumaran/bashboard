import React from "react";
import { ReactComponent as BashIcon } from "@/assets/bash.svg";
import SwitchTheme from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import { LogOut, Share2, Users2 } from "lucide-react";

const Nav : React.FC = () => {
  return (
    <nav className="flex items-center z-40 bg-zinc-50 justify-between p-2 pt-1 border-b shrink-0 h-fit sticky top-0 left-0">
        <BashIcon className="w-11 h-11" />
        <ul className="flex list-none gap-2">
          <li>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <Users2 className="w-4 h-4" />
            </Button>
          </li>
          <li>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <Share2 className="w-4 h-4" />
            </Button>
          </li>
          <li>
            <SwitchTheme />
          </li>
          <li>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <LogOut className="w-4 h-4" />
            </Button>
          </li>
        </ul>
      </nav>
  )
}

export default Nav
import React from "react";
import { ReactComponent as BashIcon } from "@/assets/bash.svg";
import SwitchTheme from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import MembersButton from "./members-button";
import LeaveButton from "./leave-button";

const Nav : React.FC = () => {

  return (
    <nav className="flex items-center z-40 bg-zinc-50 dark:bg-slate-900 justify-between p-2 pt-1 border-b shrink-0 h-fit sticky top-0 left-0">
        <BashIcon className="w-11 h-11 fill-black dark:fill-white" />
        <ul className="flex list-none gap-2">
          <li>
            <MembersButton />
          </li>
          <li>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
          </li>
          <li>
            <SwitchTheme />
          </li>
          <li>
            <LeaveButton />
          </li>
        </ul>
      </nav>
  )
}

export default Nav
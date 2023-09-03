import React, { useState } from "react";
import { ReactComponent as Logo } from "@/assets/Bashboard.svg";
import JoinForm from "@/components/home/join-form";
import { Forms } from "@/lib/enums";
import CreateForm from "@/components/home/create-form";
import SwitchTheme from "@/components/switch-theme";
const Home: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<Forms>(Forms.Join);
  const handleCreateForm = () => {
    setCurrentForm(Forms.Create);
  };
  const handleJoinForm = () => {
    setCurrentForm(Forms.Join);
  };
  return (
    <div className="h-full w-full">
      <nav className="flex justify-between items-center p-4">
        <Logo className="fill-black dark:fill-slate-100 h-5" />
        <SwitchTheme />
      </nav>
      <main>
        {currentForm === Forms.Join ? (
          <JoinForm handleCreateForm={handleCreateForm} />
        ) : currentForm === Forms.Create ? (
          <CreateForm handleJoinForm={handleJoinForm} />
        ) : null}
      </main>
    </div>
  );
};

export default Home;

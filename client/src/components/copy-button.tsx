import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ICopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}
function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
const CopyButton: React.FC<ICopyButtonProps> = ({ value }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const handleClick = () => {
    copyToClipboard(value);
    setHasCopied(true);
  };
  useEffect(() => {
    if (!hasCopied) return;
    const timeout = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [hasCopied]);
  return (
    <Button className="p-0 h-fit hover:bg-transparent" type="button" variant="ghost" size="icon" onClick={handleClick}>
      {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  );
};

export default CopyButton;

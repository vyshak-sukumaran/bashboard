import { useCanvasStore } from "@/stores";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BrushOptions: React.FC = () => {
  const { strokeColor, setStrokeColor, strokeWidth, setStrokeWidth } =
    useCanvasStore((state) => ({
      strokeColor: state.strokeColor,
      setStrokeColor: state.setStrokeColor,
      strokeWidth: state.strokeWidth,
      setStrokeWidth: state.setStrokeWidth,
    }));
  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  };
  return (
    <ul className="list-none flex gap-2 items-center">
      <li>
        <Select defaultValue={String(strokeWidth[0])} onValueChange={(val) => setStrokeWidth([Number(val)])}>
          <SelectTrigger className="w-14 h-fit py-1">
            <SelectValue placeholder="Width" />
          </SelectTrigger>
          <SelectContent className="w-fit min-w-0">
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="12">12</SelectItem>
          </SelectContent>
        </Select>
      </li>
      <li>
        <label className="flex gap-1 relative">
          <span
            className="block w-5 h-5 rounded-full"
            style={{ backgroundColor: strokeColor }}
          ></span>
          <input
            type="color"
            value={strokeColor}
            onChange={handleChangeColor}
            className=" absolute opacity-0 left-0"
          />
        </label>
      </li>
    </ul>
  );
};

export default BrushOptions;

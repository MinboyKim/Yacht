"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CornerDownLeft } from "lucide-react";

interface UserEmailFormProps {
  onSubmit: (string) => void;
}

const UserEmailForm = ({ onSubmit }: UserEmailFormProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="relative grid grid-cols-4 items-center gap-4">
      <Label htmlFor="email" className="text-center">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="col-span-3"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (value === "") return;
            onSubmit(value);
            setValue("");
          }
        }}
      />
      <CornerDownLeft size={16} className="absolute right-3" />
    </div>
  );
};

export default UserEmailForm;

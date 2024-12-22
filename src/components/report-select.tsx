"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { redirect } from "next/navigation";

export default function ReportSelect() {
  const [value, setValue] = useState("energy");

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);
        redirect(`/dashboard/${value}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a report" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Report</SelectLabel>
          <SelectItem value="energy">Energy</SelectItem>
          <SelectItem value="nerve">Nerve</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

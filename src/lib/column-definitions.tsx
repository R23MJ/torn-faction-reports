"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { z } from "zod";

export const energyReport = z.object({
  name: z.string(),
  xantakenThisMonth: z.string() || z.number(),
  xantakenTotal: z.number(),
  eRefillsThisMonth: z.number(),
  eRefillsTotal: z.number(),
  energydrinkusedThisMonth: z.number(),
  energydrinkusedTotal: z.number(),
  boosterusedThisMonth: z.number(),
  boosterusedTotal: z.number(),
});

export const nerveReport = z.object({
  name: z.string(),
  nRefillsThisMonth: z.number(),
  nRefillsTotal: z.number(),
  alcoholThisMonth: z.number(),
  alcoholTotal: z.number(),
});

export type EnergyReportType = z.infer<typeof energyReport>;
export type NerveReportType = z.infer<typeof nerveReport>;

export const energyReportColumns: ColumnDef<EnergyReportType>[] = [
  {
    header: "Member",
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Xanax
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "xantakenThisMonth",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E Refills
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "eRefillsThisMonth",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Energy Drinks
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "energydrinkusedThisMonth",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Boosters
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "boosterusedThisMonth",
  },
];

export const nerveReportColumns: ColumnDef<NerveReportType>[] = [
  {
    header: "Member",
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nerve Refills
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "nRefillsThisMonth",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alcohol Used
          {column.getIsSorted() === false ? null : column.getIsSorted() ===
            "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    accessorKey: "alcoholThisMonth",
  },
];

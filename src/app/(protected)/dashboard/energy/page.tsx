import DataTable from "@/components/data-table";
import {
  energyReportColumns,
  EnergyReportType,
} from "@/lib/column-definitions";
import { secondsPerDay, stats } from "@/lib/constants";
import { decrypt } from "@/lib/sessions";
import {
  fetchFactionMembers,
  fetchMemberPersonalStats,
} from "@/lib/server-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function EnergyReport() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    redirect("/login");
  }

  const apiKey = (await decrypt(cookie)).apiKey;
  if (!apiKey) {
    redirect("/login");
  }

  const data: EnergyReportType[] = [];
  const members = await fetchFactionMembers();

  const now = Date.now() / 1000;
  const roundedNow = Math.floor(now / secondsPerDay) * secondsPerDay;

  for (const [tornId, player] of Object.entries(members) as [
    string,
    { name: string }
  ][]) {
    const personalStats = await fetchMemberPersonalStats(tornId, stats);
    const personalStats30DaysAgo = await fetchMemberPersonalStats(
      tornId,
      stats,
      roundedNow - 30 * 24 * 60 * 60
    );

    data.push({
      name: player.name,
      xantakenThisMonth: (
        (personalStats.xantaken - personalStats30DaysAgo.xantaken) /
        30
      ).toFixed(2),
      xantakenTotal: personalStats.xantaken,
      eRefillsThisMonth: personalStats.refills - personalStats30DaysAgo.refills,
      eRefillsTotal: personalStats.refills,
      energydrinkusedThisMonth:
        personalStats.energydrinkused - personalStats30DaysAgo.energydrinkused,
      energydrinkusedTotal: personalStats.energydrinkused,
      boosterusedThisMonth:
        personalStats.boostersused - personalStats30DaysAgo.boostersused,
      boosterusedTotal: personalStats.boostersused,
    });
  }

  return <DataTable columns={energyReportColumns} data={data} />;
}

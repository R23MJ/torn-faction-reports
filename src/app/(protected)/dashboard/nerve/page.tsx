import DataTable from "@/components/data-table";

import { secondsPerDay, stats } from "@/lib/constants";
import { decrypt } from "@/lib/sessions";
import {
  fetchFactionMembers,
  fetchMemberPersonalStats,
} from "@/lib/server-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { nerveReportColumns, NerveReportType } from "@/lib/column-definitions";

export default async function EnergyReport() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    redirect("/login");
  }

  const apiKey = (await decrypt(cookie)).apiKey;
  if (!apiKey) {
    redirect("/login");
  }

  const data: NerveReportType[] = [];
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
      alcoholThisMonth:
        personalStats.alcoholused - personalStats30DaysAgo.alcoholused,
      alcoholTotal: personalStats.alcoholused,
      nRefillsThisMonth:
        personalStats.nerverefills - personalStats30DaysAgo.nerverefills,
      nRefillsTotal: personalStats.nerverefills,
    });
  }

  return <DataTable columns={nerveReportColumns} data={data} />;
}

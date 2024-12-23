import ReportSelect from "@/components/report-select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center md:p-20">
      <Card className="min-w-[75vw] md:max-h-[75vh] overflow-y-scroll md:p-5">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-2xl font-bold">
            Faction Report <ReportSelect />
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}

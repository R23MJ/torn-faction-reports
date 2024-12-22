import LoginForm from "@/components/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Enter Your Torn API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

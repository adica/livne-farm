import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task cards */}
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Irrigation</h2>
          <p className="text-muted-foreground">North Field - Due Today</p>
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Harvesting</h2>
          <p className="text-muted-foreground">South Field - Due in 2 days</p>
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Fertilizing</h2>
          <p className="text-muted-foreground">East Field - Due next week</p>
        </div>
      </div>
    </div>
  );
} 
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/weather-widget";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  return (
    <div className="relative min-h-screen">
      {/* Farm fields background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/farm-fields.jpg')" }}
      >
        {/* Gradient overlay to ensure content is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>
      
      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-white">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Livne Farm</h1>
          <p className="text-xl md:text-2xl mb-8">
            Your modern farm management solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <Link href="/dashboard" className="w-full">
              <Button size="lg" className="w-full text-lg py-6">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/fields" className="w-full">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full text-lg py-6 border-2 border-white bg-black/20 text-white hover:bg-white/20 hover:text-white"
              >
                View Fields
              </Button>
            </Link>
          </div>
          
          {/* Weather Widget */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-white">Current Weather</h2>
            <WeatherWidget location="Kfar Bilu, Israel" />
          </div>
        </div>
      </div>
    </div>
  );
} 
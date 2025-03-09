import { CalendarView } from "@/components/calendar-view";
import { WeatherWidget } from "@/components/weather-widget";
import { UserNav } from "@/components/user-nav";
import { FarmLogo } from "@/components/farm-logo";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white bg-fixed bg-no-repeat bg-cover"
         style={{ backgroundImage: "url('/images/farm-fields-subtle.jpg')" }}>
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FarmLogo className="h-8 w-8" />
            <h1 className="text-xl font-bold">Livne Farm</h1>
          </div>
          <UserNav />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-3">
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Farm Calendar</h2>
                <CalendarView />
              </div>
            </div>
          </div>
          
          <div>
            <div className="rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Weather Forecast</h2>
                <WeatherWidget location="Kfar Bilu, Israel" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 
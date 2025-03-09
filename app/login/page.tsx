import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "@/components/login-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/");
  }
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('/images/farm-fields.jpg')" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <img src="/images/logo.svg" alt="Livne Farm Logo" className="h-20 w-20" />
            </div>
            <h1 className="text-3xl font-bold text-white">Livne Farm</h1>
            <p className="text-gray-200">Sign in to manage your farm</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 
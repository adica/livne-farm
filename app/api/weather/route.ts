import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  
  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }
  
  try {
    const API_KEY = process.env.TOMORROW_IO_API_KEY; // No NEXT_PUBLIC prefix
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
} 
/*
  Documentation
    PUT API Route
      NextRequest - Contains the incoming HTTP request data
      {params :{id: string}} - Get id from the URL path 
      request.json() - Extract the json data sent from the frontend
      updateCredential() - Calls database function to update the record
      try, catch = Error handling
*/


import { NextRequest, NextResponse } from "next/server";
import { updateCredential } from "@/prismadb"; 
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedCredential = await updateCredential(params.id, data);
    return NextResponse.json(updatedCredential);
  } catch (error) {
    console.error("Error updating credential:", error);
    return NextResponse.json(
      { error: "Failed to update credential" },
      { status: 500 }
    );
  }
}
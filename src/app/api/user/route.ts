import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, name, username, password } = await req.json();
    
    if (!id || !name || !username || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

let serverVariable = "HCD-LED-wall";

export async function GET() {
    return NextResponse.json({ value: serverVariable });
}

export async function POST(request) {
    const body = await request.json();
    serverVariable = body.value;
    console.log('serverVariable >> ', serverVariable)
    return NextResponse.json({ value: serverVariable });
}
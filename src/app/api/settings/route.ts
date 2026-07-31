import { NextResponse } from 'next/server';
import { getRestaurantSettings } from '../../../services/restaurant';

export async function GET() {
  try {
    const settings = await getRestaurantSettings();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load restaurant settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

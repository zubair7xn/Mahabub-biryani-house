import { NextResponse } from 'next/server';
import { getMenuItems } from '../../../services/menu';

export async function GET() {
  try {
    const menuItems = await getMenuItems();
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load menu items';
    console.error('Menu API error:', message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

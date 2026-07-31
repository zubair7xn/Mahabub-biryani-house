import { NextResponse } from 'next/server';
import { getGalleryImages } from '../../../services/gallery';

export async function GET() {
  try {
    const galleryImages = await getGalleryImages();
    return NextResponse.json(galleryImages, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load gallery images';
    console.error('Gallery API error:', message);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

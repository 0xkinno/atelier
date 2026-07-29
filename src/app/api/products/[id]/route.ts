import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');

    if (!handle) {
      return NextResponse.json({ error: 'Missing handle parameter' }, { status: 400 });
    }

    const product = await db.getProduct(handle, id);
    if (!product || product.status !== 'active') {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { handle, title, description, category, priceUsd, previewImageUrl, fileUrl, fileSize, fileType } = body;

    if (!handle) {
      return NextResponse.json({ error: 'Handle required' }, { status: 400 });
    }

    const product = await db.getProduct(handle, id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (title) product.title = title.trim();
    if (description !== undefined) product.description = description.trim();
    if (category) product.category = category;
    if (priceUsd !== undefined) product.priceUsd = Number(priceUsd);
    if (previewImageUrl) product.previewImageUrl = previewImageUrl;
    if (fileUrl) product.fileUrl = fileUrl;
    if (fileSize) product.fileSize = fileSize;
    if (fileType) product.fileType = fileType;
    product.updatedAt = new Date().toISOString();

    await db.saveProduct(product);

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');

    if (!handle) {
      return NextResponse.json({ error: 'Handle query parameter required' }, { status: 400 });
    }

    await db.archiveProduct(handle, id);
    return NextResponse.json({ success: true, message: 'Product archived successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

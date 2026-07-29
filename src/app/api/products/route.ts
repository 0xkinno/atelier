import { NextResponse } from 'next/server';
import { db, Product } from '@/lib/db';
import { generateNonce } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');

    if (!handle) {
      return NextResponse.json({ error: 'Missing handle parameter' }, { status: 400 });
    }

    const products = await db.getProductsByHandle(handle);
    return NextResponse.json({ products });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { handle, title, description, category, priceUsd, previewImageUrl, fileUrl, fileSize, fileType } = body;

    if (!handle || !title || !priceUsd) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const id = `prod_${generateNonce().substring(0, 8)}`;

    const product: Product = {
      id,
      handle: handle.toLowerCase(),
      title: title.trim(),
      description: (description || '').trim(),
      category: category || 'Design',
      priceUsd: Number(priceUsd),
      previewImageUrl: previewImageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      fileUrl: fileUrl || 'https://raw.githubusercontent.com/nimiq/developer-center/main/README.md',
      fileSize: fileSize || '5.0 MB',
      fileType: fileType || 'ZIP Archive',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      salesCount: 0,
    };

    await db.saveProduct(product);

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

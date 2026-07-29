import { NextResponse } from 'next/server';
import { db, Purchase } from '@/lib/db';
import { verifyNimTransaction, verifyUsdtTransaction } from '@/lib/verify';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { txHash, buyerAddress, handle, productId, currency, amountNim, amountUsdt, priceFiat } = body;

    if (!txHash || !buyerAddress || !handle || !productId) {
      return NextResponse.json({ error: 'Missing required purchase verification parameters' }, { status: 400 });
    }

    const profile = await db.getProfile(handle);
    if (!profile) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
    }

    const product = await db.getProduct(handle, productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // On-Chain Verification
    let verifyResult;
    if (currency === 'NIM') {
      verifyResult = await verifyNimTransaction(txHash, profile.walletAddress, amountNim);
    } else {
      verifyResult = await verifyUsdtTransaction(txHash, profile.walletAddress, amountUsdt);
    }

    if (!verifyResult.valid) {
      return NextResponse.json({ error: verifyResult.reason || 'Payment verification failed' }, { status: 400 });
    }

    const purchase: Purchase = {
      txHash,
      buyerAddress,
      creatorAddress: profile.walletAddress,
      handle,
      productId,
      productTitle: product.title,
      amountNim: amountNim || 0,
      amountUsdt: amountUsdt || 0,
      priceFiat: priceFiat || product.priceUsd,
      currency: currency || 'NIM',
      chain: currency === 'NIM' ? 'Nimiq' : 'Polygon',
      verifiedAt: new Date().toISOString(),
      receiptSignature: `sig_${Math.random().toString(36).substring(2, 12)}`,
    };

    await db.savePurchase(purchase);

    return NextResponse.json({
      success: true,
      purchase,
      downloadUrl: product.fileUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

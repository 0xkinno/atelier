export interface Profile {
  handle: string;
  walletAddress: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  accentColor: string;
  createdAt: string;
  updatedAt: string;
  productCount: number;
  totalSales: number;
  totalNimEarned: number;
  totalUsdtEarned: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  previewImageUrl: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  priceUsd: number;
  category: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
  salesCount: number;
}

export interface Purchase {
  txHash: string;
  buyerAddress: string;
  creatorAddress: string;
  handle: string;
  productId: string;
  productTitle: string;
  amountNim: number;
  amountUsdt: number;
  priceFiat: number;
  currency: 'NIM' | 'USDT';
  chain: string;
  verifiedAt: string;
  receiptSignature?: string;
}

export interface PriceQuote {
  id: string;
  productId: string;
  priceUsd: number;
  nimAmount: number;
  usdtAmount: number;
  nimRate: number;
  usdtRate: number;
  expiresAt: number;
  createdAt: number;
}

// In-Memory Storage for Development / Fallback
class LocalDatabase {
  private profiles = new Map<string, Profile>();
  private walletToHandle = new Map<string, string>();
  private tombstones = new Set<string>();
  private products = new Map<string, Product>(); // key: `${handle}:${id}`
  private purchases = new Map<string, Purchase>(); // key: txHash
  private buyerPurchases = new Map<string, string[]>(); // key: wallet, value: txHashes
  private creatorPurchases = new Map<string, string[]>(); // key: handle, value: txHashes
  private nonces = new Map<string, { nonce: string; expiresAt: number; used: boolean }>();
  private sessions = new Map<string, { walletAddress: string; handle?: string; expiresAt: number }>();
  private rateLimits = new Map<string, { count: number; resetAt: number }>();

  constructor() {
    this.seedDemoData();
  }

  private seedDemoData() {
    // Seed initial demo creators and products as instructed for production quality demo
    const maya: Profile = {
      handle: 'mayastudio',
      walletAddress: 'NQ07 0000 0000 0000 0000 0000 0000 0000 0000',
      displayName: 'Maya Lin',
      bio: 'Digital artist & UI motion designer building timeless visual systems.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      accentColor: '#D4E157',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productCount: 3,
      totalSales: 42,
      totalNimEarned: 18500,
      totalUsdtEarned: 450,
    };

    const alex: Profile = {
      handle: 'alexvance',
      walletAddress: 'NQ12 1111 2222 3333 4444 5555 6666 7777 8888',
      displayName: 'Alex Vance',
      bio: 'Architectural photographer sharing Cinema Lightroom Presets.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      accentColor: '#A4B87C',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productCount: 2,
      totalSales: 89,
      totalNimEarned: 42000,
      totalUsdtEarned: 920,
    };

    this.profiles.set(maya.handle, maya);
    this.walletToHandle.set(maya.walletAddress.toLowerCase(), maya.handle);

    this.profiles.set(alex.handle, alex);
    this.walletToHandle.set(alex.walletAddress.toLowerCase(), alex.handle);

    // Products for Maya
    const prod1: Product = {
      id: 'maya-preset-01',
      handle: 'mayastudio',
      title: 'Minimalist Motion UI Kit 2026',
      description: 'A complete collection of smooth, physics-based UI components, micro-animations, and CSS token configurations for Next.js.',
      previewImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      fileUrl: 'https://raw.githubusercontent.com/nimiq/developer-center/main/README.md',
      fileSize: '4.8 MB',
      fileType: 'ZIP Archive',
      priceUsd: 29.00,
      category: 'Design',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      salesCount: 28,
    };

    const prod2: Product = {
      id: 'maya-preset-02',
      handle: 'mayastudio',
      title: 'Editorial Typography Masterclass',
      description: 'Learn how to construct magazine-quality web layouts using Swiss grids, Playfair Display, and subtle micro-interactions.',
      previewImageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      fileUrl: 'https://raw.githubusercontent.com/nimiq/developer-center/main/README.md',
      fileSize: '1.2 GB',
      fileType: 'Video & PDF Pack',
      priceUsd: 49.00,
      category: 'Education',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      salesCount: 14,
    };

    // Product for Alex
    const prod3: Product = {
      id: 'alex-photo-01',
      handle: 'alexvance',
      title: 'Tokyo Nocturne Lightroom Presets',
      description: '12 high-contrast neon and moody street photography presets calibrated for Fujifilm and Sony RAW files.',
      previewImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      fileUrl: 'https://raw.githubusercontent.com/nimiq/developer-center/main/README.md',
      fileSize: '45 MB',
      fileType: 'XMP & DNG Presets',
      priceUsd: 19.00,
      category: 'Photography',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      salesCount: 89,
    };

    this.products.set(`${prod1.handle}:${prod1.id}`, prod1);
    this.products.set(`${prod2.handle}:${prod2.id}`, prod2);
    this.products.set(`${prod3.handle}:${prod3.id}`, prod3);
  }

  // --- PROFILES ---
  async getProfile(handle: string): Promise<Profile | null> {
    return this.profiles.get(handle.toLowerCase()) || null;
  }

  async getProfileByWallet(walletAddress: string): Promise<Profile | null> {
    const handle = this.walletToHandle.get(walletAddress.toLowerCase());
    if (!handle) return null;
    return this.getProfile(handle);
  }

  async saveProfile(profile: Profile): Promise<void> {
    const h = profile.handle.toLowerCase();
    if (this.tombstones.has(h)) {
      throw new Error('This handle was deleted and cannot be registered again.');
    }
    this.profiles.set(h, profile);
    this.walletToHandle.set(profile.walletAddress.toLowerCase(), h);
  }

  async deleteProfile(handle: string): Promise<void> {
    const h = handle.toLowerCase();
    const prof = this.profiles.get(h);
    if (prof) {
      this.walletToHandle.delete(prof.walletAddress.toLowerCase());
      this.profiles.delete(h);
      this.tombstones.add(h);
    }
  }

  async isHandleAvailable(handle: string): Promise<boolean> {
    const h = handle.toLowerCase();
    const reserved = ['admin', 'api', 'explore', 'dashboard', 'create', 'purchases', 'settings', 'help', 'app'];
    if (reserved.includes(h)) return false;
    if (this.tombstones.has(h)) return false;
    return !this.profiles.has(h);
  }

  // --- PRODUCTS ---
  async getProduct(handle: string, id: string): Promise<Product | null> {
    return this.products.get(`${handle.toLowerCase()}:${id}`) || null;
  }

  async getProductsByHandle(handle: string): Promise<Product[]> {
    const list: Product[] = [];
    const h = handle.toLowerCase();
    for (const [key, prod] of this.products.entries()) {
      if (key.startsWith(`${h}:`) && prod.status === 'active') {
        list.push(prod);
      }
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async saveProduct(product: Product): Promise<void> {
    const key = `${product.handle.toLowerCase()}:${product.id}`;
    this.products.set(key, product);
    const profile = await this.getProfile(product.handle);
    if (profile) {
      const activeProds = await this.getProductsByHandle(product.handle);
      profile.productCount = activeProds.length;
      this.profiles.set(profile.handle, profile);
    }
  }

  async archiveProduct(handle: string, id: string): Promise<void> {
    const prod = await this.getProduct(handle, id);
    if (prod) {
      prod.status = 'archived';
      await this.saveProduct(prod);
    }
  }

  // --- PURCHASES ---
  async getPurchase(txHash: string): Promise<Purchase | null> {
    return this.purchases.get(txHash) || null;
  }

  async savePurchase(purchase: Purchase): Promise<void> {
    if (this.purchases.has(purchase.txHash)) {
      throw new Error('Transaction has already been processed.');
    }
    this.purchases.set(purchase.txHash, purchase);

    // Buyer index
    const bKey = purchase.buyerAddress.toLowerCase();
    const bList = this.buyerPurchases.get(bKey) || [];
    bList.push(purchase.txHash);
    this.buyerPurchases.set(bKey, bList);

    // Creator index
    const cKey = purchase.handle.toLowerCase();
    const cList = this.creatorPurchases.get(cKey) || [];
    cList.push(purchase.txHash);
    this.creatorPurchases.set(cKey, cList);

    // Update product & profile stats
    const product = await this.getProduct(purchase.handle, purchase.productId);
    if (product) {
      product.salesCount = (product.salesCount || 0) + 1;
      this.products.set(`${product.handle}:${product.id}`, product);
    }

    const profile = await this.getProfile(purchase.handle);
    if (profile) {
      profile.totalSales += 1;
      if (purchase.currency === 'NIM') {
        profile.totalNimEarned += purchase.amountNim;
      } else {
        profile.totalUsdtEarned += purchase.amountUsdt;
      }
      this.profiles.set(profile.handle, profile);
    }
  }

  async getPurchasesByBuyer(buyerAddress: string): Promise<Purchase[]> {
    const hashes = this.buyerPurchases.get(buyerAddress.toLowerCase()) || [];
    const list: Purchase[] = [];
    for (const h of hashes) {
      const p = this.purchases.get(h);
      if (p) list.push(p);
    }
    return list;
  }

  async getPurchasesByCreator(handle: string): Promise<Purchase[]> {
    const hashes = this.creatorPurchases.get(handle.toLowerCase()) || [];
    const list: Purchase[] = [];
    for (const h of hashes) {
      const p = this.purchases.get(h);
      if (p) list.push(p);
    }
    return list.sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime());
  }

  // --- AUTH NONCES & SESSIONS ---
  async saveNonce(walletAddress: string, nonce: string, ttlMs: number = 300000): Promise<void> {
    this.nonces.set(walletAddress.toLowerCase(), {
      nonce,
      expiresAt: Date.now() + ttlMs,
      used: false,
    });
  }

  async getNonce(walletAddress: string): Promise<{ nonce: string; expiresAt: number; used: boolean } | null> {
    const item = this.nonces.get(walletAddress.toLowerCase());
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.nonces.delete(walletAddress.toLowerCase());
      return null;
    }
    return item;
  }

  async markNonceUsed(walletAddress: string): Promise<void> {
    const item = this.nonces.get(walletAddress.toLowerCase());
    if (item) item.used = true;
  }

  async saveSession(token: string, walletAddress: string, handle?: string, ttlMs: number = 604800000): Promise<void> {
    this.sessions.set(token, {
      walletAddress: walletAddress.toLowerCase(),
      handle: handle?.toLowerCase(),
      expiresAt: Date.now() + ttlMs,
    });
  }

  async getSession(token: string): Promise<{ walletAddress: string; handle?: string } | null> {
    const s = this.sessions.get(token);
    if (!s) return null;
    if (Date.now() > s.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    return s;
  }

  // --- RATE LIMITING ---
  async checkRateLimit(key: string, maxRequests: number, windowMs: number): Promise<{ allowed: boolean; remaining: number }> {
    const now = Date.now();
    const entry = this.rateLimits.get(key);
    if (!entry || now > entry.resetAt) {
      this.rateLimits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1 };
    }
    if (entry.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    entry.count += 1;
    return { allowed: true, remaining: maxRequests - entry.count };
  }

  // --- EXPLORE ---
  async getExploreProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }
}

export const db = new LocalDatabase();

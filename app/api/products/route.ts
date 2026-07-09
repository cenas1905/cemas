import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

async function getProductsData() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { korkuluk: [], pleksi: [], winsa: [], royalglass: [] };
  }
}

async function saveProductsData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  const data = await getProductsData();
  
  if (category) {
    return NextResponse.json(data[category] || []);
  }
  
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, product } = body;
    
    if (!category || !product) {
      return NextResponse.json({ error: 'Category and product are required' }, { status: 400 });
    }
    
    const data = await getProductsData();
    if (!data[category]) {
      data[category] = [];
    }
    
    const newProduct = { ...product, id: Date.now().toString() };
    data[category].push(newProduct);
    
    await saveProductsData(data);
    
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { category, product } = body;
    
    if (!category || !product || !product.id) {
      return NextResponse.json({ error: 'Category, product, and product.id are required' }, { status: 400 });
    }
    
    const data = await getProductsData();
    if (!data[category]) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    const index = data[category].findIndex((p: any) => p.id === product.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    data[category][index] = product;
    
    await saveProductsData(data);
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    
    if (!category || !id) {
      return NextResponse.json({ error: 'Category and id are required' }, { status: 400 });
    }
    
    const data = await getProductsData();
    if (!data[category]) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    data[category] = data[category].filter((p: any) => p.id !== id);
    
    await saveProductsData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

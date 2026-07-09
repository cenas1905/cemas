import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

// Revalidate on every request since this is an API
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    

    
    if (category) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return NextResponse.json(data || []);
    }
    
    // If no category, fetch all and group by category
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    const groupedData: any = {
      korkuluk: [],
      pleksi: [],
      winsa: [],
      royalglass: []
    };
    
    if (data) {
      data.forEach((product: any) => {
        if (!groupedData[product.category]) {
          groupedData[product.category] = [];
        }
        groupedData[product.category].push(product);
      });
    }
    
    return NextResponse.json(groupedData);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, product } = body;
    
    if (!category || !product) {
      return NextResponse.json({ error: 'Category and product are required' }, { status: 400 });
    }
    

    
    const newProduct = {
      id: Date.now().toString(), // Keep using timestamp as ID for compatibility, or UUID
      category,
      name: product.name,
      description: product.description,
      features: product.features || [],
      image: product.image,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { category, product } = body;
    
    if (!product || !product.id) {
      return NextResponse.json({ error: 'Product and product.id are required' }, { status: 400 });
    }
    

    
    const updateData = {
      category: category || product.category,
      name: product.name,
      description: product.description,
      features: product.features || [],
      image: product.image
    };
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', product.id)
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    

    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

'use client';

import React, { useState, useEffect, useRef } from 'react';

const productCategories = [
  { id: 'korkuluk', name: 'Alüminyum Korkuluk' },
  { id: 'pleksi', name: 'Pleksi Sistemler' },
  { id: 'winsa', name: 'Winsa' },
  { id: 'royalglass', name: 'Royalglass' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or category id
  
  // Settings State
  const [settings, setSettings] = useState<any>({
    hero_title: '',
    hero_subtitle: '',
    about_text: '',
    contact_phone: '',
    contact_email: '',
    contact_address: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'settings') {
      fetchSettings();
    } else {
      fetchProducts(activeTab);
    }
  }, [activeTab]);

  const fetchSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data && !data.error && Object.keys(data).length > 0) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    }
    setSettingsLoading(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Ayarlar başarıyla kaydedildi!');
      } else {
        alert('Ayarlar kaydedilemedi.');
      }
    } catch (error) {
      alert('Bir hata oluştu.');
    }
    setIsSavingSettings(false);
  };

  const fetchProducts = async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${category}`);
      const data = await res.json();
      // Ensure products is always an array to prevent .map crashes (500 Error fix)
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: '',
      name: '',
      description: '',
      image: '',
      features: ['', '', '']
    });
    setIsEditing(true);
  };

  const handleEdit = (product: any) => {
    const features = [...(product.features || [])];
    while (features.length < 3) features.push('');
    
    setCurrentProduct({ ...product, features });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    
    try {
      await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });
      fetchProducts(activeTab);
    } catch (error) {
      alert('Silme işlemi başarısız oldu.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setCurrentProduct({ ...currentProduct, image: data.url });
      }
    } catch (error) {
      alert('Resim yüklenemedi.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const cleanFeatures = currentProduct.features.filter((f: string) => f.trim() !== '');
    const productToSave = { ...currentProduct, features: cleanFeatures };
    
    const method = productToSave.id ? 'PUT' : 'POST';
    
    try {
      await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeTab,
          product: productToSave
        })
      });
      
      setIsEditing(false);
      fetchProducts(activeTab);
    } catch (error) {
      alert('Kaydetme başarısız oldu.');
    }
    
    setIsSaving(false);
  };

  if (isEditing && currentProduct && activeTab !== 'settings') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentProduct.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
          <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-800 font-medium">İptal Et</button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d21920] focus:border-transparent outline-none"
              value={currentProduct.name}
              onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea 
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d21920] focus:border-transparent outline-none"
              value={currentProduct.description}
              onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Görsel</label>
            <div className="flex items-center gap-4">
              {currentProduct.image && (
                <img src={currentProduct.image} alt="Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200" />
              )}
              <div className="flex-1">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 text-sm text-gray-500 bg-gray-50"
                  value={currentProduct.image}
                  placeholder="Resim URL'si veya Bilgisayardan Seçin"
                  readOnly
                />
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors"
                >
                  Bilgisayardan Fotoğraf Yükle
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Özellikler (Maddeler)</label>
            <div className="space-y-2">
              {[0, 1, 2].map(index => (
                <input 
                  key={index}
                  type="text" 
                  placeholder={`${index + 1}. Özellik`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d21920] outline-none"
                  value={currentProduct.features[index] || ''}
                  onChange={e => {
                    const newFeatures = [...currentProduct.features];
                    newFeatures[index] = e.target.value;
                    setCurrentProduct({...currentProduct, features: newFeatures});
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-8 py-3 bg-[#d21920] hover:bg-red-700 text-white font-bold rounded-md transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tam Kapsamlı Yönetim Paneli</h1>
        <p className="text-gray-500">Sitenizdeki tüm yazıları, ürünleri ve iletişim bilgilerini buradan güncelleyebilirsiniz.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-2.5 rounded-t-lg font-bold text-sm transition-colors ${
            activeTab === 'settings' 
              ? 'bg-black text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          ⚙️ Genel Ayarlar
        </button>
        {productCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2.5 rounded-t-lg font-medium text-sm transition-colors ${
              activeTab === cat.id 
                ? 'bg-[#d21920] text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {activeTab === 'settings' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sitenin Genel Ayarları</h2>
          
          {settingsLoading ? (
            <div className="py-12 text-center text-gray-500">Ayarlar Yükleniyor...</div>
          ) : (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                <h3 className="font-bold text-lg text-gray-800">Ana Sayfa Başlıkları</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ana Slogan (Hero Title)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                    value={settings.hero_title || ''}
                    onChange={e => setSettings({...settings, hero_title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Slogan (Hero Subtitle)</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                    value={settings.hero_subtitle || ''}
                    onChange={e => setSettings({...settings, hero_subtitle: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                <h3 className="font-bold text-lg text-gray-800">Kurumsal Bilgiler</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hakkımızda Yazısı</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                    value={settings.about_text || ''}
                    onChange={e => setSettings({...settings, about_text: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-4">
                <h3 className="font-bold text-lg text-gray-800">İletişim Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      value={settings.contact_phone || ''}
                      onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      value={settings.contact_email || ''}
                      onChange={e => setSettings({...settings, contact_email: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açık Adres</label>
                    <textarea 
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      value={settings.contact_address || ''}
                      onChange={e => setSettings({...settings, contact_address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSavingSettings}
                  className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-md transition-colors disabled:opacity-50"
                >
                  {isSavingSettings ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
                </button>
              </div>

            </form>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              {productCategories.find(c => c.id === activeTab)?.name} Ürünleri
            </h2>
            <button 
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Yeni Ekle
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Yükleniyor...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-3 block text-gray-300">inventory_2</span>
              Bu kategoride henüz ürün yok. Hemen "Yeni Ekle" butonuna basarak başlayabilirsiniz.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {products.map(product => (
                <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start hover:bg-gray-50 transition-colors">
                  <img 
                    src={product.image || 'https://via.placeholder.com/150'} 
                    alt={product.name} 
                    className="w-full sm:w-32 h-32 object-cover rounded-md border border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features?.map((f: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Düzenle
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const metadata = {
  title: 'Yönetim Paneli | 3B Yapı',
  description: 'İçerik Yönetim Sistemi',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-[#1a1a1a] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d21920] flex items-center justify-center font-bold">3B</div>
            <span className="font-bold tracking-wider">YÖNETİM PANELİ</span>
          </div>
          <a href="/" target="_blank" className="text-sm text-gray-300 hover:text-white flex items-center gap-2">
            <span>Siteye Git</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

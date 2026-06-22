import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
        
        <h1 className="text-4xl font-black tracking-tight mb-4">Gizlilik Politikası</h1>
        <p className="text-white/50 text-sm mb-12">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Bilgilerin Toplanması</h2>
            <p>CVio olarak, hizmetlerimizi sunabilmek için adınız, e-posta adresiniz, LinkedIn profil bilgileriniz ve özgeçmişinize (CV) eklediğiniz profesyonel deneyim verilerinizi topluyoruz. Ayrıca, sitemizi kullanımınız sırasında cihaz bilgileri ve IP adresi gibi anonim istatistiksel veriler de toplanabilir.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Bilgilerin Kullanımı</h2>
            <p>Topladığımız veriler, size özel AI tabanlı CV optimizasyonu yapmak, mülakat simülasyonları oluşturmak, abonelik ve ödeme işlemlerini yürütmek ve müşteri desteği sağlamak amacıyla kullanılmaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Yapay Zeka (AI) ve Veri İşleme</h2>
            <p>Hizmetlerimiz kapsamında Google Gemini AI gibi üçüncü taraf yapay zeka hizmet sağlayıcıları kullanılmaktadır. Sistemimize yüklediğiniz veriler (CV taslakları), yapay zeka analizi için ilgili servis sağlayıcıya iletilebilir. Gizliliğinizi korumak amacıyla kişisel verileriniz model eğitimi (training) için kullanılmamaktadır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Veri Güvenliği</h2>
            <p>Bilgileriniz endüstri standartlarında şifreleme protokolleri ile korunmaktadır. Ödeme işlemleriniz, güvenli ödeme altyapısı sağlayıcıları (Stripe/Iyzico) üzerinden gerçekleştirilir ve kredi kartı bilgileriniz sunucularımızda saklanmaz.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Kullanıcı Hakları</h2>
            <p>Sistemde bulunan verilerinizi dilediğiniz zaman "Ayarlar" sayfasından silebilir, hesabınızın tamamen kapatılmasını talep edebilir ve kişisel verilerinizin bir kopyasını alabilirsiniz.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. İletişim</h2>
            <p>Gizlilik politikamız ile ilgili soru ve talepleriniz için <a href="mailto:support@cvio.app" className="text-indigo-400 hover:text-indigo-300">support@cvio.app</a> adresinden bize ulaşabilirsiniz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

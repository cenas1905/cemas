import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
        
        <h1 className="text-4xl font-black tracking-tight mb-4">Kullanım Koşulları</h1>
        <p className="text-white/50 text-sm mb-12">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>

        <div className="space-y-8 text-white/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Kabul Edilme</h2>
            <p>CVio hizmetlerine erişerek veya hizmetlerimizi kullanarak bu Kullanım Koşullarını ve Gizlilik Politikamızı okuduğunuzu, anladığınızı ve bunlara yasal olarak bağlı kalmayı kabul etmiş sayılırsınız.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Hizmetin Niteliği</h2>
            <p>CVio, kullanıcıların özgeçmiş (CV) hazırlamasına, bunları yapay zeka ile optimize etmesine ve mülakat simülasyonları ile pratik yapmasına yardımcı olan bir araçtır. CVio'nun kullanımı, doğrudan işe yerleşmenizi garanti etmez.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Kullanıcı Yükümlülükleri</h2>
            <p>Sisteme yüklediğiniz bilgilerin (eğitim, deneyim, yetenekler) doğru ve güncel olmasından yalnızca siz sorumlusunuz. Sisteme yanıltıcı bilgi, yasa dışı içerik veya başkasına ait verileri yüklemek yasaktır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Ödemeler ve İadeler</h2>
            <p>Pro (Ücretli) hesap satın alımlarında ödemeler ön ödemeli olarak tahsil edilir. Yıllık üyeliklerde ve mevzuatın öngördüğü durumlarda, hizmetin kullanılmamış olması şartıyla 14 gün içinde iptal ve iade hakkınız saklıdır.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Hesap Feshi</h2>
            <p>Hizmet şartlarımızın ihlali durumunda, CVio önceden bildirimde bulunmaksızın kullanıcının hesabını askıya alma veya kalıcı olarak sonlandırma hakkını saklı tutar.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. İletişim</h2>
            <p>Kullanım koşulları hakkında sorularınız için <a href="mailto:support@cvio.app" className="text-indigo-400 hover:text-indigo-300">support@cvio.app</a> adresi üzerinden destek ekibimizle iletişime geçebilirsiniz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

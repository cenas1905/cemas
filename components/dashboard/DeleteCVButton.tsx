'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteCVButtonProps {
  id: string;
}

export default function DeleteCVButton({ id }: DeleteCVButtonProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    
    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id);

    if (error) {
      alert(`CV silinirken hata oluştu: ${error.message}`);
      setLoading(false);
    } else {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="h-9 w-9 text-slate-500 hover:text-red-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 shrink-0">
        <Trash2 className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-slate-800 bg-slate-950 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle>CV'yi Sil</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs">
            Bu özgeçmişi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={loading} className="text-slate-400 hover:text-white hover:bg-slate-900">
            İptal
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700">
            {loading ? 'Siliniyor...' : 'Evet, Sil'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
}

import { useState } from 'react';
import { Painting } from '@/components/painting/types';
import PaintingCanvas from '@/components/painting/PaintingCanvas';
import PaintingGallery from '@/components/painting/PaintingGallery';

export default function Index() {
  const [activePainting, setActivePainting] = useState<Painting | null>(null);

  if (activePainting) {
    return (
      <PaintingCanvas 
        painting={activePainting} 
        onBack={() => setActivePainting(null)} 
      />
    );
  }

  return (
    <PaintingGallery onSelectPainting={setActivePainting} />
  );
}

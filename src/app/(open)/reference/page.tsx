'use client';

import { ReferenceWidget } from '@/widgets/reference';
import { Flavor } from '@/types/flavors';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';

export default function ReferencePage() {
  // Usar flavor global
  const selectedFlavor = CURRENT_FLAVOR;

  return (
    <div style={{ backgroundColor: "#ffffff" }}>    
      <ReferenceWidget selectedFlavor={selectedFlavor} />
    </div>
  );
}

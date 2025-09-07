'use client';

import { ReferenceWidget } from '@/widgets/reference';
import { Flavor } from '@/types/flavors';

export default function ReferencePage() {
  // Por defecto usamos SPORT, pero esto se puede cambiar dinámicamente
  const selectedFlavor = Flavor.SPORT;

  return (
    <ReferenceWidget selectedFlavor={selectedFlavor} />
  );
}

'use client';

import { Flavor } from '@/types/flavors';
import { CURRENT_FLAVOR } from '@/types/favorGlobal';
import BannerHome from '@/widgets/BannerHonme';
import JobsWidget from '@/widgets/JobsWidget';

export default function Home() {
  const selectedFlavor = CURRENT_FLAVOR; 

  const handleLogin = (flavor: Flavor, credentials: { email: string; password: string }) => {
    console.log('Login attempt:', { flavor, credentials });
    
  };

  return (
    <div>
      <BannerHome 
        onLogin={handleLogin} 
        selectedFlavor={selectedFlavor} 
      />
      
      <JobsWidget 
        selectedFlavor={selectedFlavor}
      />
    </div>
  );
}

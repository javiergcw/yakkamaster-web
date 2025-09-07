'use client';

import { Flavor } from '@/types/flavors';
import BannerHome from '@/widgets/BannerHonme';
import JobsWidget from '@/widgets/JobsWidget';

export default function Home() {
  const selectedFlavor = Flavor.SPORT; 

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

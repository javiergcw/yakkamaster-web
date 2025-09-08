import LogingLabour from '@/components/login/LogingLabour';
import { Flavor, flavorConfigs } from '../../../types/flavors';

export default function LoginPage() {
  const flavorConfig = flavorConfigs[Flavor.LABOUR];
  
  return <LogingLabour flavorConfig={flavorConfig} />;
}

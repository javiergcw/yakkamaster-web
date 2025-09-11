import { Flavor, flavorConfigs } from './flavors';

export const CURRENT_FLAVOR: Flavor = Flavor.SPORT;

export const getCurrentFlavorConfig = () => {
    return flavorConfigs[CURRENT_FLAVOR];
};


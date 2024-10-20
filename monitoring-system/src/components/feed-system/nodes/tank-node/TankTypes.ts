import GasBottle from './assets/GasBottle.svg';
import VerticalVessel from './assets/VerticalVessel.svg';
import Tank from './assets/Tank.svg';

export const GasBottleTank = GasBottle;

export const VerticalVesselTank = VerticalVessel;

export const TankTank = Tank;

export const TankTypesSVGs = {
    GasBottleTank,
    VerticalVesselTank,
    TankTank
};

export const TankTypeStrings = Object.keys(TankTypesSVGs).map(key => 
    key.replace(/([A-Z])/g, ' $1').trim()
) as Array<keyof typeof TankTypesSVGs>;

export const TankTypeKeys = Object.keys(TankTypesSVGs) as Array<keyof typeof TankTypesSVGs>;
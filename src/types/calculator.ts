export interface InputField {
  key: keyof CalculatorInputs;
  label: string;
  unit?: string;
}

export interface InputSection {
  title: string;
  fields: InputField[];
}

export interface CalculatorInputs {
  numServers: number;
  gpusPerServer: number;
  serverPower: number;
  gpuPower: number;
  kwhPrice: number;
  hoursPerYear: number;
  years: number;
  pueStandard: number;
  pueImmersion: number;
  gpuEfficiencyGain: number;
  heatTransfer: number;
  tankCost: number;
  liquidCost: number;
  serverConversion: number;
  externalCircuit: number;
  dryCooler: number;
  drycoolingHours: number;
  drycoolingPower: number;
  airConditioner: number;
  acInstallation: number;
  maintenanceImmersion: number;
  maintenanceStandard: number;
  heatPrice: number;
}

export interface CalculatorResults {
  standard: {
    initialCost: number;
    yearlyPower: number;
    yearlyCost: number;
    totalCost: number;
  };
  immersion: {
    initialCost: number;
    yearlyPower: number;
    yearlyCost: number;
    drycoolingCost: number;
    heatRecovery: number;
    totalCost: number;
    heatOutput: {
      watts: number;
      btu: number;
      kwh: number;
    };
  };
  savings: number;
  breakeven: number;
}
import { InputSection } from '@/types/calculator';

export const defaultInputs = {
  numServers: 10,
  gpusPerServer: 4,
  serverPower: 1500,
  gpuPower: 300,
  kwhPrice: 0.15,
  hoursPerYear: 8760,
  years: 5,
  pueStandard: 1.6,
  pueImmersion: 1.03,
  gpuEfficiencyGain: 0.85,
  heatTransfer: 0.8,
  tankCost: 18000,
  liquidCost: 1200,
  serverConversion: 150,
  externalCircuit: 4000,
  dryCooler: 6000,
  drycoolingHours: 1000,
  drycoolingPower: 2000,
  airConditioner: 12000,
  acInstallation: 2500,
  maintenanceImmersion: 1000,
  maintenanceStandard: 2000,
  heatPrice: 0.07
};

export const sections: InputSection[] = [
  {
    title: "Basic Configuration",
    fields: [
      { key: "numServers", label: "Number of Servers" },
      { key: "gpusPerServer", label: "GPUs per Server" },
      { key: "serverPower", label: "Server Power", unit: "W" },
      { key: "gpuPower", label: "GPU Power", unit: "W" },
      { key: "kwhPrice", label: "Price per kWh", unit: "€" },
      { key: "years", label: "Project Duration", unit: "years" }
    ]
  },
  {
    title: "Immersion Costs",
    fields: [
      { key: "tankCost", label: "Tank + PDU", unit: "€" },
      { key: "liquidCost", label: "Liquid", unit: "€" },
      { key: "serverConversion", label: "Server Conversion", unit: "€" },
      { key: "externalCircuit", label: "External Circuit", unit: "€" },
      { key: "dryCooler", label: "Dry Cooler", unit: "€" }
    ]
  },
  {
    title: "Cooling System",
    fields: [
      { key: "drycoolingHours", label: "Dry Cooling Hours/Year", unit: "h" },
      { key: "drycoolingPower", label: "Dry Cooling Power", unit: "W" },
      { key: "airConditioner", label: "Air Conditioning", unit: "€" },
      { key: "acInstallation", label: "AC Installation", unit: "€" }
    ]
  },
  {
    title: "Advanced Parameters",
    fields: [
      { key: "pueStandard", label: "Standard PUE" },
      { key: "pueImmersion", label: "Immersion PUE" },
      { key: "gpuEfficiencyGain", label: "GPU Efficiency Gain" },
      { key: "heatTransfer", label: "Heat Recovery Efficiency", unit: "%" },
      { key: "heatPrice", label: "Heat Sale Price", unit: "€/kWh" }
    ]
  }
];
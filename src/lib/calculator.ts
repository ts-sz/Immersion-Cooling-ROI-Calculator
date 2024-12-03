import { CalculatorInputs, CalculatorResults } from '@/types/calculator';

export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  // Power calculations
  const standardPower = (inputs.serverPower + (inputs.gpuPower * inputs.gpusPerServer)) * 
                       inputs.numServers * inputs.pueStandard;
  
  const immersionPower = (inputs.serverPower + (inputs.gpuPower * inputs.gpusPerServer * inputs.gpuEfficiencyGain)) * 
                        inputs.numServers * inputs.pueImmersion;
  
  // Initial costs
  const standardInitial = inputs.airConditioner + inputs.acInstallation;
  const immersionInitial = inputs.tankCost + 
                          inputs.liquidCost + 
                          (inputs.serverConversion * inputs.numServers) + 
                          inputs.externalCircuit + 
                          inputs.dryCooler;
  
  // Dry cooling cost
  const drycoolingYearlyCost = (inputs.drycoolingPower / 1000) * 
                              inputs.drycoolingHours * 
                              inputs.kwhPrice;
  
  // Heat recovery calculations
  const totalHeatPower = immersionPower * inputs.heatTransfer;
  const btuOutput = totalHeatPower * 3.41214;
  const yearlyHeatEnergy = (totalHeatPower / 1000) * inputs.hoursPerYear;
  const heatRecovery = yearlyHeatEnergy * inputs.heatPrice;
  
  // Yearly costs
  const standardYearlyPower = (standardPower / 1000) * inputs.kwhPrice * inputs.hoursPerYear;
  const immersionYearlyPower = (immersionPower / 1000) * inputs.kwhPrice * inputs.hoursPerYear;
  
  const standardYearly = standardYearlyPower + inputs.maintenanceStandard;
  const immersionYearly = immersionYearlyPower + inputs.maintenanceImmersion + drycoolingYearlyCost - heatRecovery;
  
  // Break-even
  const yearlyDifference = standardYearly - immersionYearly;
  const initialDifference = immersionInitial - standardInitial;
  const breakeven = yearlyDifference > 0 ? initialDifference / yearlyDifference : -1;

  return {
    standard: {
      initialCost: standardInitial,
      yearlyPower: standardPower,
      yearlyCost: standardYearly,
      totalCost: standardInitial + (standardYearly * inputs.years)
    },
    immersion: {
      initialCost: immersionInitial,
      yearlyPower: immersionPower,
      yearlyCost: immersionYearly,
      drycoolingCost: drycoolingYearlyCost,
      heatRecovery: heatRecovery,
      totalCost: immersionInitial + (immersionYearly * inputs.years),
      heatOutput: {
        watts: totalHeatPower,
        btu: btuOutput,
        kwh: yearlyHeatEnergy
      }
    },
    savings: (standardInitial + (standardYearly * inputs.years)) - 
             (immersionInitial + (immersionYearly * inputs.years)),
    breakeven: breakeven
  };
};
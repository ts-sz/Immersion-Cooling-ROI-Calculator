import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from 'lucide-react';
import { InputSection } from '@/components/calculator/InputSection';
import { ResultsCard } from '@/components/calculator/ResultsCard';
import { CostChart } from '@/components/calculator/CostChart';
import { calculateResults } from '@/lib/calculator';
import { sections, defaultInputs } from '@/config/calculator';
import { CalculatorInputs, CalculatorResults } from '@/types/calculator';

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculatorResults>(() => calculateResults(defaultInputs));

  const handleInputChange = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    try {
      setResults(calculateResults(inputs));
    } catch (error) {
      console.error('Error calculating results:', error);
    }
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <Card className="max-w-6xl mx-auto bg-gray-800 text-white border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Immersion Cooling ROI Calculator
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {sections.map(section => (
              <InputSection
                key={section.title}
                section={section}
                inputs={inputs}
                onInputChange={handleInputChange}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <ResultsCard title="Initial Costs">
              <p>Standard: <span className="font-mono">{results.standard.initialCost.toFixed(2)} €</span></p>
              <p>Immersion: <span className="font-mono">{results.immersion.initialCost.toFixed(2)} €</span></p>
            </ResultsCard>

            <ResultsCard title="Annual Costs">
              <p>Standard: <span className="font-mono">{results.standard.yearlyCost.toFixed(2)} €</span></p>
              <p>Immersion: <span className="font-mono">{results.immersion.yearlyCost.toFixed(2)} €</span></p>
              <p>Dry Cooling: <span className="font-mono">{results.immersion.drycoolingCost.toFixed(2)} €</span></p>
              <p className="text-green-400">Heat Recovery: <span className="font-mono">{results.immersion.heatRecovery.toFixed(2)} €</span></p>
            </ResultsCard>

            <ResultsCard title={`Total Savings (${inputs.years} years)`}>
              <p className="text-2xl text-green-400 font-mono">{results.savings.toFixed(2)} €</p>
              <p>ROI: <span className="font-mono">{results.breakeven.toFixed(1)} years</span></p>
            </ResultsCard>
          </div>

          <ResultsCard title="Heat Recovery Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-300">Power Output</p>
                <p className="font-mono">{results.immersion.heatOutput.watts.toFixed(0)} W</p>
                <p className="font-mono">{results.immersion.heatOutput.btu.toFixed(0)} BTU/h</p>
              </div>
              <div>
                <p className="text-gray-300">Yearly Energy Recovery</p>
                <p className="font-mono">{results.immersion.heatOutput.kwh.toFixed(0)} kWh/year</p>
              </div>
              <div>
                <p className="text-gray-300">Financial Impact</p>
                <p className="text-green-400 font-mono">{results.immersion.heatRecovery.toFixed(2)} €/year</p>
              </div>
            </div>
          </ResultsCard>

          <div className="mt-8">
            <CostChart results={results} years={inputs.years} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
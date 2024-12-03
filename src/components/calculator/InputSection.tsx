import React from 'react';
import { InputSection as InputSectionType, CalculatorInputs } from '@/types/calculator';

interface InputSectionProps {
  section: InputSectionType;
  inputs: CalculatorInputs;
  onInputChange: (key: keyof CalculatorInputs, value: number) => void;
}

export function InputSection({ section, inputs, onInputChange }: InputSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {section.title}
      </h3>
      {section.fields.map(field => (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm text-gray-300">
            {field.label} {field.unit && `(${field.unit})`}
          </label>
          <input
            type="number"
            value={inputs[field.key]}
            onChange={(e) => onInputChange(field.key, parseFloat(e.target.value) || 0)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white transition-all
                     hover:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     font-mono placeholder-gray-400"
            step="any"
            min="0"
          />
        </div>
      ))}
    </div>
  );
}
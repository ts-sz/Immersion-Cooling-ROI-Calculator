import React from 'react';

interface ResultsCardProps {
  title: string;
  children: React.ReactNode;
}

export function ResultsCard({ title, children }: ResultsCardProps) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg transition-transform hover:scale-[1.02] shadow-lg">
      <h3 className="text-xl mb-4 font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
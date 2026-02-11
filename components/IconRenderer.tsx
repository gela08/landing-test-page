
import React from 'react';
import { Zap, Shield, BarChart, Cpu, Globe, Users, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Shield,
  BarChart,
  Cpu,
  Globe,
  Users
};

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className }) => {
  const IconComponent = iconMap[name] || Zap;
  return <IconComponent className={className} />;
};

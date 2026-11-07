import {
  Archive,
  Atom,
  BrainCircuit,
  BriefcaseBusiness,
  Bug,
  Camera,
  CirclePlay,
  Cloud,
  Code2,
  Database,
  Globe,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Monitor,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  archive: Archive,
  atom: Atom,
  braincircuit: BrainCircuit,
  briefcasebusiness: BriefcaseBusiness,
  bug: Bug,
  cloud: Cloud,
  code: Code2,
  code2: Code2,
  database: Database,
  github: Code2,
  globe: Globe,
  instagram: Camera,
  linkedin: BriefcaseBusiness,
  link: LinkIcon,
  mail: Mail,
  messagecircle: MessageCircle,
  monitor: Monitor,
  search: Search,
  server: Server,
  shieldcheck: ShieldCheck,
  smartphone: Smartphone,
  workflow: Workflow,
  youtube: CirclePlay,
};

export function getPortfolioIcon(iconName: string | null): LucideIcon {
  if (!iconName) {
    return Code2;
  }

  const key = iconName.replace(/[^a-z]/gi, '').toLowerCase();
  return icons[key] ?? Code2;
}

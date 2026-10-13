import {
  Car,
  CircleDot,
  Cog,
  Droplets,
  FileText,
  Gauge,
  PackageCheck,
  Ruler,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { IconKey } from '@/lib/data/content'

const icons: Record<IconKey, LucideIcon> = {
  car: Car,
  bearing: CircleDot,
  motor: Zap,
  hydraulic: Droplets,
  compressor: Wind,
  machining: Cog,
  drawing: FileText,
  scheme: Ruler,
  build: Cog,
  calibrate: Gauge,
  deliver: PackageCheck,
}

export function SiteIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} aria-hidden="true" strokeWidth={1.5} />
}

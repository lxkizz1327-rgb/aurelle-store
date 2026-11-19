import {
  Clock,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Clock,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
  Twitter,
  Youtube,
};

/** Shows an icon by name (names are used in src/data/site-config.ts). */
export default function Icon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const Component = ICONS[name] ?? Sparkles;
  return <Component className={className} size={size} aria-hidden="true" strokeWidth={1.5} />;
}

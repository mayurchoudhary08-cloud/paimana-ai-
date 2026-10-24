import { RiskLevel } from '../../types/project';

/**
 * Validates latitude and longitude coordinates.
 * Excludes invalid numbers, NaN, out-of-bounds, and (0, 0).
 */
export function isValidCoordinate(lat?: number, lng?: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  if (lat === 0 && lng === 0) return false;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return false;
  return true;
}

/**
 * Maps risk score or level to standard color codes.
 * Low (0-25): Emerald #10b981
 * Moderate (26-50): Yellow #eab308
 * High (51-75): Orange #f97316
 * Critical (76-100): Red #ef4444
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'CRITICAL':
      return '#ef4444';
    case 'HIGH':
      return '#f97316';
    case 'MODERATE':
      return '#eab308';
    case 'LOW':
    default:
      return '#10b981';
  }
}

/**
 * Generates custom Google Maps symbol for project markers
 */
export function getMarkerSymbol(
  level: RiskLevel,
  isSelected: boolean
): google.maps.Symbol {
  const fillColor = getRiskColor(level);
  const isCritical = level === 'CRITICAL';

  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: isSelected ? 11 : isCritical ? 9 : 7.5,
    fillColor,
    fillOpacity: 1,
    strokeColor: isSelected ? '#ffffff' : '#090d16',
    strokeWeight: isSelected ? 3 : 2,
  };
}

/**
 * High-tech Dark Mode styling matching PAIMANA AI Navy/Slate aesthetic
 */
export const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0b1120' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1120' }, { weight: 2 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#3b82f6' }, { weight: 1.2 }]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e293b' }, { weight: 1 }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }]
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f172a' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#1e3a8a' }, { lightness: -20 }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#172554' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#172554' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#030712' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }]
  }
];

/**
 * Clean Light Mode styling matching Google Card aesthetic
 */
export const lightMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }, { weight: 3 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#334155' }] },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#94a3b8' }, { weight: 1 }]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#cbd5e1' }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'simplified' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e2e8f0' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e2e8f0' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#dbeafe' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#bfdbfe' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c7d2fe' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4338ca' }]
  }
];

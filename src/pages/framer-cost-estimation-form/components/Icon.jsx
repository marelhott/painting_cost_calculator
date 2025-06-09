// src/pages/framer-cost-estimation-form/components/Icon.jsx
import React from 'react';

// Simplified icon component for Framer compatibility
// Replace with your preferred icon library in Framer
const Icon = ({ name, size = 24, color = 'currentColor', style, ...props }) => {
  // This is a simplified implementation
  // In Framer, you would replace this with your preferred icon library
  // such as Heroicons, Feather Icons, or Lucide React
  
  const iconStyle = {
    width: size,
    height: size,
    color: color,
    display: 'inline-block',
    ...style
  };

  // Simple SVG icons - replace with your icon library
  const icons = {
    Calculator: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="16" y2="14"/>
        <line x1="8" y1="18" x2="16" y2="18"/>
      </svg>
    ),
    Layers: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <polygon points="12,2 2,7 12,12 22,7 12,2"/>
        <polyline points="2,17 12,22 22,17"/>
        <polyline points="2,12 12,17 22,12"/>
      </svg>
    ),
    Building: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v8h4"/>
        <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/>
        <path d="M10 6h4"/>
        <path d="M10 10h4"/>
        <path d="M10 14h4"/>
        <path d="M10 18h4"/>
      </svg>
    ),
    Wrench: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    Settings: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m17-4a4 4 0 0 0-8 0 4 4 0 0 0 8 0zM7 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
      </svg>
    ),
    Calendar: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    User: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    Phone: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    Mail: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    MapPin: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    Send: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
      </svg>
    ),
    CheckCircle: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
    ),
    AlertCircle: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    Square: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      </svg>
    ),
    RectangleVertical: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <rect x="6" y="2" width="12" height="20" rx="2" ry="2"/>
      </svg>
    ),
    Check: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <polyline points="20,6 9,17 4,12"/>
      </svg>
    ),
    Minus: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    Equal: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="5" y1="9" x2="19" y2="9"/>
        <line x1="5" y1="15" x2="19" y2="15"/>
      </svg>
    ),
    Plus: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    Palette: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="13.5" cy="6.5" r=".5"/>
        <circle cx="17.5" cy="10.5" r=".5"/>
        <circle cx="8.5" cy="7.5" r=".5"/>
        <circle cx="6.5" cy="12.5" r=".5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    Package: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    Home: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
    MessageSquare: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    Info: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    Lightbulb: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M9 21h6"/>
        <path d="M12 17H8.5a2.5 2.5 0 0 1 0-5c-.35-.76-.35-1.52 0-2.28A2.5 2.5 0 0 1 12 7a2.5 2.5 0 0 1 3.5 2.72c.35.76.35 1.52 0 2.28a2.5 2.5 0 0 1 0 5H12Z"/>
      </svg>
    ),
    TrendingDown: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <polyline points="23,18 13.5,8.5 8.5,13.5 1,6"/>
        <polyline points="17,18 23,18 23,12"/>
      </svg>
    ),
    Award: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
      </svg>
    ),
    Clock: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    Shield: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    Paintbrush: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
        <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
        <path d="M14.5 17.5 4.5 15"/>
      </svg>
    ),
    Database: (
      <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    )
  };

  return icons[name] || icons['Square']; // Fallback to square if icon not found
};

export default Icon;
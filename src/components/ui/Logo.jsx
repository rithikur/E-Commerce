export default function Logo({ className = "w-8 h-8", dark = true }) {
  const primaryColor = dark ? "#3A2D28" : "#F1EDE6";
  const accentColor = "#A48374";

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract U and B Monogram */}
      <path 
        d="M25 20 V60 C25 75 35 80 50 80 C65 80 75 75 75 60 V20 M75 50 C85 50 90 45 90 35 C90 25 85 20 75 20 H50" 
        stroke={primaryColor} 
        strokeWidth="6" 
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path 
        d="M50 50 H75 C85 50 90 55 90 65 C90 75 85 80 75 80 H50" 
        stroke={accentColor} 
        strokeWidth="6" 
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Thread/Needle accent line */}
      <line x1="50" y1="15" x2="50" y2="85" stroke={primaryColor} strokeWidth="2" />
      <circle cx="50" cy="10" r="3" fill={accentColor} />
    </svg>
  );
}

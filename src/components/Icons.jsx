const Svg = ({ size = 24, sw = 1.7, children, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
);

export const Arrow = () => <Svg size={18}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const Close = ({ size = 22 }) => <Svg size={size}><path d="M6 6l12 12M18 6 6 18" /></Svg>;
export const Search = () => <Svg size={18}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>;
export const Globe = () => (
  <Svg size={16} sw={1.8}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Svg>
);
export const Phone = () => (
  <Svg sw={1.8}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Svg>
);
export const Mail = () => <Svg sw={1.8}><rect x="3" y="5" width="18" height="14" /><path d="m3 7 9 6 9-6" /></Svg>;

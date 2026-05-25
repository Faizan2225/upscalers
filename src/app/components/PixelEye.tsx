// blocky "preview" eye — crisp-edged so it reads as pixel-art
export default function PixelEye() {
  return (
    <svg viewBox="0 0 34 22" fill="none" aria-hidden="true">
      <path
        d="M2 11 L8 5 L26 5 L32 11 L26 17 L8 17 Z"
        stroke="#fff"
        strokeWidth="2"
      />
      <rect x="13" y="7" width="8" height="8" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

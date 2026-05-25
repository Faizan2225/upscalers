// Persistent hamburger — fixed top-right across the whole page.
export default function MenuButton() {
  return (
    <button className="menu-fab" aria-label="Open menu">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9h16M4 15h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

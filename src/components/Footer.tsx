const LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Unsubscribe", href: "/unsubscribe" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Program Requirements", href: "/program-requirements" },
  { label: "Do Not Sell My Info", href: "/do-not-sell" },
  { label: "Contact Us", href: "/contact-us" },
];

export function Footer() {
  return (
    <footer className="bg-white px-4 py-8">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5">
        <img
          src="/assets/logo.svg"
          alt="Benefits Access Center"
          className="h-8 w-auto"
          loading="lazy"
        />
        <nav aria-label="Footer">
          <ul className="flex flex-col items-center gap-1.5">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-lato text-xs font-regular uppercase tracking-widest text-slate-500 hover:text-heading-custom"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-lato font-regular uppercase text-xs text-slate-500">
          © Benefits Access Center, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

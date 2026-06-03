const BENEFITS = [
  "Discover your benefits guide, created uniquely for you.",
  "Learn about benefit programs you didn't even know existed.",
  "See real benefits you can claim today.",
];

export function BenefitCards() {
  return (
    <section className="bg-white px-4 py-7">
      <div className="mx-auto flex max-w-sm flex-col gap-3 md:max-w-lg">
        {BENEFITS.map((text) => (
          <div
            key={text}
            className="flex items-center gap-3 rounded-xl border border-cream-border bg-cream px-4 py-3"
          >
            <div className="flex flex-shrink-0 items-center justify-center p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
              <img
                src="/src/assets/Vector.svg"
                alt="Checkmark"
                className="h-6 w-6 object-contain"
              />
            </div>
            <p className="font-body text-[14px] font-semibold text-gray-custom">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-sm space-y-2">
        <p>
          © {new Date().getFullYear()} UKit. All rights reserved.
        </p>
        <p>
          Independent. Evidence-led. Investigative journalism for the UK.
        </p>
      </div>
    </footer>
  );
}
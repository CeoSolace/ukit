/**
 * About page describes the mission, values and editorial approach of UKit.
 * It emphasises independence, evidence‑led journalism and clear separation
 * between facts, analysis and opinion.
 */
export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">About UKit</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        UKit – short for U‑Turn UK – is an independent, evidence‑led
        editorial platform examining UK policies, censorship concerns and
        public accountability. We are not affiliated with any political party,
        campaign group or corporate interest. Our mission is to untangle
        complex legislation, separate fact from spin and hold power to
        account.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Each investigation we publish is grounded in verifiable sources.
        Where we analyse or offer opinion, we make that distinction
        explicit. We avoid speculation about intent and never promote
        conspiracy theories. Instead, we follow the evidence wherever it
        leads and invite readers to engage critically with our findings.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        UKit is run by a small editorial team. Articles may be authored by
        our Editor, by contributors or presented under an Editorial View.
        We welcome feedback and strive to correct any mistakes swiftly. If
        you spot an error or wish to contribute, please get in touch via
        our contact page.
      </p>
    </section>
  );
}
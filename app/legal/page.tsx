/**
 * Legal and disclaimer page. It outlines the editorial standards of UKit,
 * clarifies the difference between analysis and opinion, and disclaims
 * responsibility for readers’ actions.
 */
export default function LegalPage() {
  return (
    <section className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Legal &amp; Disclaimer</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        UKit is an independent editorial platform. Our investigations are
        based on publicly available documents, official statements and
        reputable journalism. We strive to provide accurate information and
        cite sources for every factual claim.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Analysis and commentary represent our interpretation of the
        evidence. Personal opinions are clearly labelled and separated from
        factual reporting. We avoid unproven accusations and speculation
        about intent. Where mistakes occur, we commit to correcting them
        promptly.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        The information on this site is provided for general informational
        purposes only and should not be construed as legal, financial or
        professional advice. Readers should conduct their own research and
        consult qualified professionals where appropriate. UKit is not
        responsible for how readers use the information provided.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        We do not coordinate or encourage harassment, doxxing or any form of
        illegal activity. We do not organise protests or direct real‑world
        actions. Any contact with public officials or organisations is at
        your own initiative. By using this site, you agree to act lawfully
        and independently.
      </p>
      <p className="text-neutral-700 dark:text-neutral-300">
        If you have concerns about any content on UKit, please use the
        contact page to reach our editorial team. We will review your
        message and respond as appropriate.
      </p>
    </section>
  );
}
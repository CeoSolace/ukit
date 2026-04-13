/**
 * Take Action page provides readers with lawful ways to engage with civic
 * processes. It emphasises responsible, constructive participation and
 * explicitly excludes calls for illegal activity or protest coordination.
 */
export default function TakeActionPage() {
  return (
    <section className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Take Action</h1>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">
        Democracies rely on informed and engaged citizens. After reading our
        investigations, you might feel compelled to do something. Below are
        lawful and constructive ways to make your voice heard and support
        positive change.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Contact your MP</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Write to or meet with your Member of Parliament to share your
        concerns about specific policies. Be concise, respectful and back up
        your points with evidence. MPs are obliged to listen to their
        constituents and can raise issues in Parliament on your behalf.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Raise concerns through official channels</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Submit responses to government consultations, regulator surveys or
        public inquiries. These channels allow you to contribute to policy
        development and ensure that decisions are informed by a range of
        perspectives.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Engage in public discussion</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        Share our articles with friends, family and social networks to
        encourage informed debate. Host discussion groups or attend local
        meetings where policies are being considered. Ensure that discourse
        remains civil and fact‑based.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Share responsibly</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
        When sharing our work or other information, verify the facts and
        avoid sensationalism. Responsible sharing builds trust and helps
        counter misinformation.
      </p>
      <h2 className="text-2xl font-semibold mb-2">What we don’t do</h2>
      <p className="text-neutral-700 dark:text-neutral-300">
        UKit does not organise protests, direct real‑world actions or
        coordinate harassment. We believe in lawful civic engagement and do
        not condone violence or illegal activities. Your actions are your
        responsibility; act within the law and respect others.
      </p>
    </section>
  );
}
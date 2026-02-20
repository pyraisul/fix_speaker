import React from 'react';
import Link from 'next/link';

interface SEOPageProps {
    title: string;
    subtitle: string;
    content: React.ReactNode;
    faqs: { q: string; a: string }[];
}

const SEOPage: React.FC<SEOPageProps> = ({ title, subtitle, content, faqs }) => {
    return (
        <article className="content-section">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--muted)' }}>{subtitle}</p>
                <div style={{ marginTop: '2rem' }}>
                    <Link href="/" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                        Back to Speaker Cleaner
                    </Link>
                </div>
            </header>

            <div style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                {content}
            </div>

            <section style={{ marginTop: '4rem', maxWidth: '700px', margin: '4rem auto 0 auto' }}>
                <h2>Frequently Asked Questions</h2>
                <div style={{ marginTop: '2rem' }}>
                    {faqs.map((faq, idx) => (
                        <div key={idx} style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{faq.q}</h3>
                            <p style={{ color: 'var(--muted)' }}>{faq.a}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Schema Markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map((faq) => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a,
                                },
                            })),
                        }),
                    }}
                />
            </section>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link href="/" className="btn-primary">
                    Try Speaker Cleaner Now
                </Link>
            </div>
        </article>
    );
};

export default SEOPage;

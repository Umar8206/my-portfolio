import React from "react";
import styles from "./testimonials.module.scss";

const Star = ({ filled }) => (
  <svg
    className={styles.star}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const PlatformBadge = ({ platform }) => {
  if (!platform) return null;
  return <span className={styles.badge}>{platform}</span>;
};

const Avatar = ({ name }) => {
  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "CL";

  return <div className={styles.avatar}>{initials}</div>;
};

export default function Testimonials({ data: {
    isSample,
    items
} }) {
  return (
    <section className={styles.section} id="reviews" aria-label="Testimonials">
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>What Clients Say</h2>
            <p className={styles.subtitle}>
              Clear communication, reliable delivery, and production-ready code.
            </p>
          </div>

          {/* Optional: small stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>4+</div>
              <div className={styles.statLabel}>Years</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>20+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>5.0</div>
              <div className={styles.statLabel}>Rating</div>
            </div>
          </div>
        </div>

        {isSample && (
          <div className={styles.sampleNote} role="note">
            Sample testimonials shown for layout preview. Will be replaced with verified reviews.
          </div>
        )}

        <div className={styles.grid} role="list">
          {items.map((t, idx) => (
            <article key={idx} className={styles.card} role="listitem">
              <div className={styles.cardTop}>
                <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} filled={n <= (t.rating || 5)} />
                  ))}
                </div>
                <PlatformBadge platform={t.platform} />
              </div>

              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>

              <div className={styles.footer}>
                <Avatar name={t.name} />
                <div className={styles.person}>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.meta}>
                    {t.role}
                    {t.company ? ` • ${t.company}` : ""}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile hint */}
        <div className={styles.mobileHint}>Swipe to see more →</div>
      </div>
    </section>
  );
}

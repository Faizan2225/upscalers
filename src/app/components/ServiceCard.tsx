"use client";

import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  tags?: string[];
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  tags,
  index = 0,
}: ServiceCardProps) {
  const inner = (
    <div
      className="svc-card"
      style={{ ["--card-i" as string]: index }}
    >
      {icon && (
        <div className="svc-card__icon">
          <Image src={icon} alt="" width={64} height={64} />
        </div>
      )}
      <h3 className="svc-card__title">{title}</h3>
      <p className="svc-card__desc">{description}</p>
      {tags && (
        <div className="svc-card__tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <span className="svc-card__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );

  if (href) {
    return <Link href={href} className="svc-card__link">{inner}</Link>;
  }
  return inner;
}

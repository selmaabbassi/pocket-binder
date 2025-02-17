import Link from "next/link";

interface SeriesLinkProps {
  title: string;
  href: string;
}

export function SeriesLink({ title, href }: SeriesLinkProps) {
  return (
    <Link href={href}>
      <div className="card bg-neutral text-primary-content hover:bg-accent">
        <div className="card-body">
          <h1 className="card-title">{title}</h1>
        </div>
      </div>
    </Link>
  );
}

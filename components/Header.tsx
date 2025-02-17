import Link from "next/link";

export interface HeaderProps {
  title: string;
  backUrl?: string;
  subtitle?: string;
}

export function Header({ title, backUrl, subtitle }: HeaderProps) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      {backUrl && (
        <Link href={backUrl} className="absolute left-60 btn btn-primary">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      )}

      <header>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <h3 className="text-lg text-gray-500 mt-1">{subtitle}</h3>}
      </header>
    </div>
  );
}

import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn text-xl">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/my-collection">My collection</Link>
          </li>
          <li>
            <Link href="/series">Series</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login" className="btn text-xl">
          <span className="material-symbols-outlined">person</span>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-primary text-xl">
          Home
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/my-collection">My collection</Link>
          </li>
          <li>
            <Link href="/sets">Sets</Link>
          </li>
          <li>
            <a>Test</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login" className="btn btn-primary text-xl">
          Login
        </Link>
      </div>
    </div>
  );
}

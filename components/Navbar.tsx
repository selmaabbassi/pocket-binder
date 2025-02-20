import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar bg-base-100 justify-center fixed bottom-0 left-0 w-full">
      <div className="navbar-center flex space-x-4">
        <Link href="/" className="btn btn-primary">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link href="/series" className="btn btn-primary">
          <span className="material-symbols-outlined">auto_stories</span>
        </Link>
        <Link href="/my-collection" className="btn btn-primary">
          <span className="material-symbols-outlined">photo_camera</span>
        </Link>
        <Link href="/login" className="btn btn-primary">
          <span className="material-symbols-outlined">person</span>
        </Link>
      </div>
    </div>
  );
}

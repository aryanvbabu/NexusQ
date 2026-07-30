import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-nq-border bg-nq-surface/50">
      <div className="nq-container px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="overflow-hidden rounded-lg ring-1 ring-white/10">
                <Image
                  src="/logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </span>
              <div>
                <p className="font-semibold tracking-tight">NexusQ Global</p>
                <p className="text-xs text-nq-muted mt-0.5">Product ecosystem company</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-nq-muted max-w-xs leading-relaxed">
              Parent company behind AuditionQ and a growing set of digital
              products — live and vision.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm text-nq-muted">
              <li><Link href="/#home" className="hover:text-nq-text">Home</Link></li>
              <li><Link href="/#platforms" className="hover:text-nq-text">Platforms</Link></li>
              <li><Link href="/#auditionq" className="hover:text-nq-text">AuditionQ</Link></li>
              <li><Link href="/#future" className="hover:text-nq-text">Future</Link></li>
              <li><Link href="/partner" className="hover:text-nq-text">Partner</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-2.5 text-sm text-nq-muted">
              <li>
                <a
                  href="https://www.auditionq.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-nq-text"
                >
                  AuditionQ (live)
                </a>
              </li>
              <li><Link href="/privacy" className="hover:text-nq-text">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-nq-text">Terms</Link></li>
              <li>
                <a href="mailto:admin@auditionq.com" className="hover:text-nq-text">
                  admin@auditionq.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nq-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-nq-muted">
          <p>© {new Date().getFullYear()} NexusQ Global. All rights reserved.</p>
          <p>Legal pages are placeholders pending final review.</p>
        </div>
      </div>
    </footer>
  );
}

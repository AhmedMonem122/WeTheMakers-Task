import Link from "next/link";
import { Briefcase, Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                JobBoard
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              A modern job board platform helping job seekers find the right
              opportunities and companies hire faster.
            </p>
          </div>

          {/* Job seekers */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Job Seekers
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/jobs" className="hover:text-slate-900">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-slate-900">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-slate-900">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-slate-900">
                  My Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers / Admin */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Employers
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/admin/jobs" className="hover:text-slate-900">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/applications"
                  className="hover:text-slate-900"
                >
                  Review Applications
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-900">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@jobboard.com</span>
              </li>

              <li className="flex items-center gap-4 pt-2">
                <a
                  href="#"
                  aria-label="GitHub"
                  className="rounded-md p-2 hover:bg-slate-200 transition"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="rounded-md p-2 hover:bg-slate-200 transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

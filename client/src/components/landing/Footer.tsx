import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-bg overflow-hidden">
      <div className="absolute inset-0 ink-grid opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <p className="text-sm text-text-tertiary">
            © {new Date().getFullYear()} StudyMint. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm">
            <Link
              to="/privacy-policy"
              className="text-text-tertiary hover:text-accent transition-colors duration-200"
            >
              Privacy Policy
            </Link>

            <span className="text-border hidden sm:inline">•</span>

            <Link
              to="/terms-and-conditions"
              className="text-text-tertiary hover:text-accent transition-colors duration-200"
            >
              Terms & Conditions
            </Link>

            <span className="text-border hidden sm:inline">•</span>

            <Link
              to="/refund-policy"
              className="text-text-tertiary hover:text-accent transition-colors duration-200"
            >
              Refund Policy
            </Link>

            <span className="text-border hidden sm:inline">•</span>

            <Link
              to="/contact"
              className="text-text-tertiary hover:text-accent transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          <p className="flex items-center gap-1 text-sm text-text-tertiary">
            Made with
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            by
            <span className="font-medium text-text-primary">
              Krishna Sahu
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
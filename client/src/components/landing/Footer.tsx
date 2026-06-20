import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-bg overflow-hidden">
      <div className="absolute inset-0 ink-grid opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mt-2 text-sm text-text-tertiary">
            © {new Date().getFullYear()} StudyMint. All rights reserved.
          </p>

          <p className="mt-2 flex items-center gap-1 text-sm text-text-tertiary">
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
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Clock,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="rounded-3xl border border-border bg-surface shadow-elevated overflow-hidden"
        >
          <div className="relative p-8 sm:p-12 border-b border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-gold/5" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-4 py-2 mb-5">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-text-secondary">
                  Support & Contact
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                Contact Us
              </h1>

              <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl">
                Have questions, feedback, payment issues, or need help with
                StudyMint? We're here to help.
              </p>

              <p className="mt-4 text-sm text-text-tertiary">
                We typically respond within 24-48 hours.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-secondary p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-text-primary">
                      Email Support
                    </h2>
                    <p className="text-xs text-text-tertiary">
                      Preferred contact method
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:krishna.sahu.work@gmail.com"
                  className="text-accent hover:underline break-all"
                >
                  krishna.sahu.work@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-border bg-surface-secondary p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-text-primary">
                      Response Time
                    </h2>
                    <p className="text-xs text-text-tertiary">
                      Support availability
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary">
                  Most queries are answered within 24–48 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-secondary p-6 sm:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-text-primary">
                      Payments & Credits
                    </h2>
                    <p className="text-xs text-text-tertiary">
                      Razorpay & credit related issues
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  If you experience issues related to payments, missing credits,
                  duplicate charges, failed transactions, or refunds, please
                  include the following details in your email:
                </p>

                <ul className="mt-4 space-y-2 text-text-secondary">
                  <li>• Registered email address</li>
                  <li>• Payment ID / Transaction ID</li>
                  <li>• Date and time of payment</li>
                  <li>• Description of the issue</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-surface-secondary p-6">
              <h2 className="font-semibold text-text-primary mb-3">
                About StudyMint
              </h2>

              <p className="text-text-secondary leading-relaxed">
                StudyMint is an AI-powered learning platform that helps students
                generate structured notes, revision materials, summaries, and
                study resources more efficiently.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
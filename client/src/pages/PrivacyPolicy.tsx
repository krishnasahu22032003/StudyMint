import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const easeOut = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    title: "Information We Collect",
    content:
      "When you use StudyMint, we may collect information such as your name, email address, profile picture, account details, and the notes or study content you generate using our platform.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to provide StudyMint services, generate AI-powered notes, improve user experience, manage credits, process payments, and communicate important updates related to your account.",
  },
  {
    title: "Payments",
    content:
      "Payments are securely processed through trusted third-party payment providers such as Razorpay. StudyMint does not store your card, banking, or UPI credentials on our servers.",
  },
  {
    title: "Data Security",
    content:
      "We implement reasonable security measures to protect your information from unauthorized access, disclosure, or misuse. However, no online service can guarantee complete security.",
  },
  {
    title: "Third-Party Services",
    content:
      "StudyMint may use third-party services for authentication, analytics, payment processing, cloud storage, and AI-powered content generation. These providers may process information as necessary to provide their services.",
  },
  {
    title: "User Content",
    content:
      "Any notes, prompts, topics, or study materials submitted to StudyMint remain your responsibility. Please avoid uploading sensitive personal information.",
  },
  {
    title: "Cookies & Authentication",
    content:
      "We may use cookies, session tokens, or authentication mechanisms to keep you signed in, secure your account, and improve platform performance.",
  },
  {
    title: "Policy Updates",
    content:
      "We may update this Privacy Policy from time to time. Any significant changes will be reflected on this page with an updated effective date.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions regarding this Privacy Policy, you may contact us at krishna.sahu.work@gmail.com.",
  },
];

export default function PrivacyPolicy() {
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
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-text-secondary">
                  Privacy & Security
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                Privacy Policy
              </h1>

              <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl">
                Your privacy matters to us. This Privacy Policy explains how
                StudyMint collects, uses, and protects your information while
                you use our AI-powered learning platform.
              </p>

              <p className="mt-4 text-sm text-text-tertiary">
                Effective Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                >
                  <h2 className="text-xl font-semibold text-text-primary mb-3">
                    {section.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    {section.content}
                  </p>

                  {index !== sections.length - 1 && (
                    <div className="mt-8 border-b border-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
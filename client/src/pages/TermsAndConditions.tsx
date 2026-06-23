import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const easeOut = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using StudyMint, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the platform.",
  },
  {
    title: "Use of StudyMint",
    content:
      "StudyMint provides AI-powered tools for generating study notes, summaries, revision materials, and educational content. Users must use the platform responsibly and only for lawful educational purposes.",
  },
  {
    title: "Account Responsibility",
    content:
      "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. Please ensure that your login credentials remain secure.",
  },
  {
    title: "Credits & Usage",
    content:
      "StudyMint operates on a credit-based system. Credits are deducted when eligible AI-powered features are used. Credit requirements may change as features evolve and improve.",
  },
  {
    title: "Payments",
    content:
      "Payments are processed through secure third-party payment providers such as Razorpay. By purchasing credits, you authorize the applicable payment transaction according to the selected plan.",
  },
  {
    title: "Refunds",
    content:
      "Refund requests are governed by our Refund Policy. As StudyMint provides digital services and credits, refunds may not be available once credits have been successfully delivered to your account.",
  },
  {
    title: "User Content",
    content:
      "You retain ownership of the content you submit to StudyMint. However, you are solely responsible for ensuring that submitted content does not violate any laws, intellectual property rights, or third-party rights.",
  },
  {
    title: "Prohibited Activities",
    content:
      "Users must not attempt to abuse the platform, interfere with services, bypass credit limitations, reverse engineer systems, distribute harmful content, or engage in fraudulent activity.",
  },
  {
    title: "Service Availability",
    content:
      "While we strive to provide uninterrupted access, StudyMint does not guarantee continuous availability. Services may occasionally be unavailable due to maintenance, upgrades, or unforeseen technical issues.",
  },
  {
    title: "Limitation of Liability",
    content:
      "StudyMint is provided on an 'as is' basis. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms and Conditions at any time. Updated terms will be posted on this page and become effective immediately upon publication.",
  },
  {
    title: "Contact Information",
    content:
      "For questions regarding these Terms and Conditions, please contact us at krishna.sahu.work@gmail.com.",
  },
];

export default function TermsAndConditions() {
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
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-text-secondary">
                  Legal Agreement
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                Terms & Conditions
              </h1>

              <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl">
                These Terms & Conditions govern your use of StudyMint and
                describe the rules, responsibilities, and limitations associated
                with using our AI-powered educational platform.
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
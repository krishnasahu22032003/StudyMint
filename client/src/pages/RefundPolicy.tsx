import { motion } from "framer-motion";
import { ArrowLeft, ReceiptIndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const easeOut = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    title: "Overview",
    content:
      "StudyMint provides digital educational services through a credit-based system. By purchasing credits, you gain access to AI-powered features such as note generation, summaries, revision materials, and related learning tools.",
  },
  {
    title: "Digital Product Policy",
    content:
      "Credits purchased on StudyMint are digital products delivered instantly to your account after successful payment verification. Because of the nature of digital products, purchases are generally non-refundable once credits have been successfully added to your account.",
  },
  {
    title: "Failed Payments",
    content:
      "If a payment fails, no credits will be added to your account. Any amount debited due to a failed transaction is handled by your bank or payment provider and is usually reversed automatically within their standard processing time.",
  },
  {
    title: "Payment Success But Credits Not Received",
    content:
      "In rare situations where payment is successful but credits are not reflected in your account, please contact us with your payment details. After verification, the appropriate credits will be added to your account.",
  },
  {
    title: "Duplicate Transactions",
    content:
      "If you believe you have been charged multiple times for the same transaction, please contact us with supporting details. We will investigate the issue and take appropriate action if a duplicate charge is confirmed.",
  },
  {
    title: "Refund Eligibility",
    content:
      "Refunds may be considered only in exceptional circumstances, such as verified duplicate payments or technical issues that prevent delivery of purchased credits. Approval of refunds is at the sole discretion of StudyMint after review.",
  },
  {
    title: "Processing Time",
    content:
      "Approved refunds, if applicable, will be processed through the original payment method. The time required for the refunded amount to appear in your account depends on your bank or payment provider.",
  },
  {
    title: "Abuse Prevention",
    content:
      "Refund requests made with the intention of abusing the platform, obtaining unauthorized access to services, or circumventing payment obligations may be rejected.",
  },
  {
    title: "Changes to This Policy",
    content:
      "StudyMint reserves the right to update or modify this Refund Policy at any time. Updated versions will be published on this page and become effective immediately upon posting.",
  },
  {
    title: "Contact Us",
    content:
      "For refund-related questions or support, please contact us at krishna.sahu.work@gmail.com.",
  },
];

export default function RefundPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          onClick={() => navigate(-1)}
          className="mb-8 cursor-pointer inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all"
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
                <ReceiptIndianRupee className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-text-secondary">
                  Payments & Refunds
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                Refund Policy
              </h1>

              <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl">
                This Refund Policy explains how refunds, payment disputes,
                failed transactions, and credit purchases are handled on
                StudyMint.
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
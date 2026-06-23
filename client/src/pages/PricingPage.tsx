import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Star, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import handlePaying from "../lib/handlePaying";
import DashboardHeader from "../components/ui/DashboardHeader";
import signOutUser from "../lib/handleSignOut";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut, delay: i * 0.1 },
    }),
};

interface PricingPlan {
    id: string;
    title: string;
    price: string;
    amount: number;
    credits: string;
    creditsCount: number;
    description: string;
    features: string[];
    popular?: boolean;
    accentColor: "accent" | "gold";
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    title: "Starter",
    price: "₹99",
    amount: 99,
    credits: "99 Credits",
    creditsCount: 99,
    description:
      "Perfect for trying out StudyMint and generating AI-powered study notes.",
    features: [
      "99 AI Credits",
      "Generate Notes",
      "Exam-focused answers",
      "Diagrams & charts",
      "Fast generation",
    ],
    accentColor: "accent",
  },

  {
    id: "pro",
    title: "Pro",
    price: "₹299",
    amount: 299,
    credits: "299 Credits",
    creditsCount: 299,
    description:
      "Best value for students preparing for exams and regular study sessions.",
    features: [
      "299 AI Credits",
      "Everything in Starter",
      "Revision Mode",
      "Priority AI Responses",
      "More Notes & Summaries",
    ],
    popular: true,
    accentColor: "gold",
  },

  {
    id: "premium",
    title: "Premium",
    price: "₹499",
    amount: 499,
    credits: "499 Credits",
    creditsCount: 499,
    description:
      "For serious learners who use StudyMint daily and need maximum credits.",
    features: [
      "499 AI Credits",
      "Everything in Pro",
      "Maximum Value",
      "Heavy Usage Support",
      "Best Credit-to-Price Ratio",
    ],
    accentColor: "accent",
  },
];

interface PricingCardProps {
    plan: PricingPlan;
    isSelected: boolean;
    onSelect: (amount: number) => void;
    onBuy: (planId: string) => void;
    paying: boolean;
    payingAmount: number | null;
    index: number;
}

const PricingCard = ({
    plan,
    isSelected,
    onSelect,
    onBuy,
    paying,
    payingAmount,
    index,
}: PricingCardProps) => {
    const isPayingThisCard = paying && payingAmount === plan.amount;
    const isGold = plan.accentColor === "gold";

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            whileHover={{ y: -6, transition: { duration: 0.25, ease: easeOut } }}
            onClick={() => onSelect(plan.amount)}
            className={`
                relative cursor-pointer flex flex-col rounded-3xl border
                bg-surface transition-all duration-300
                ${isSelected
                    ? isGold
                        ? "border-gold/40 shadow-elevated ring-1 ring-gold/20"
                        : "border-accent/40 shadow-elevated ring-1 ring-accent/20"
                    : plan.popular
                    ? "border-gold/25 shadow-soft"
                    : "border-border shadow-soft hover:shadow-elevated hover:border-border/60"
                }
            `}
        >
            <div className={`
                absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300
                ${isSelected
                    ? isGold
                        ? "bg-gradient-to-br from-gold/5 via-transparent to-accent/4 opacity-100"
                        : "bg-gradient-to-br from-accent/5 via-transparent to-gold/4 opacity-100"
                    : "opacity-0"
                }
            `} />

            <AnimatePresence>
                {(plan.popular || isSelected) && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    >
                        {isSelected ? (
                            <span className={`
                                inline-flex items-center gap-1.5 rounded-full px-3.5 py-1
                                text-[11px] font-semibold shadow-elevated
                                ${isGold ? "bg-gold text-bg" : "bg-accent text-white"}
                            `}>
                                <Check className="w-3 h-3" />
                                Selected
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1 text-[11px] font-semibold text-bg shadow-elevated">
                                <Star className="w-3 h-3 fill-current" />
                                Most Popular
                            </span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 p-7 flex flex-col flex-1">
                <div className="mb-5">
                    <div className={`
                        inline-flex items-center gap-1.5 rounded-full border px-3 py-1 mb-3
                        ${isGold ? "border-gold/25 bg-gold-soft" : "border-accent/20 bg-accent-soft"}
                    `}>
                        {isGold
                            ? <Sparkles className="w-3 h-3 text-gold" />
                            : <Zap className="w-3 h-3 text-accent" />
                        }
                        <span className={`text-[11px] font-semibold ${isGold ? "text-gold" : "text-accent"}`}>
                            {plan.credits}
                        </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-text-primary tracking-tight">
                        {plan.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-text-tertiary leading-relaxed">
                        {plan.description}
                    </p>
                </div>

                <div className="mb-6">
                    <div className="flex items-end gap-1.5">
                        <span className="font-display text-4xl font-bold text-text-primary tracking-tight">
                            {plan.price}
                        </span>
                        <span className="text-sm text-text-tertiary mb-1.5">one-time</span>
                    </div>
                    <p className="mt-1 text-xs text-text-tertiary">
                        ≈ ₹{(plan.amount / plan.creditsCount).toFixed(1)} per note
                    </p>
                </div>

                <button
                    disabled={isPayingThisCard}
                    onClick={(e) => {
                        e.stopPropagation();
                        onBuy(plan.id);
                    }}
                    className={`
                        w-full rounded-2xl py-3 text-sm font-semibold
                        inline-flex items-center justify-center gap-2
                        transition-all duration-200 cursor-pointer
                        ${isPayingThisCard
                            ? "bg-surface-secondary text-text-tertiary cursor-not-allowed"
                            : isSelected
                            ? isGold
                                ? "bg-gold text-bg hover:bg-gold/90 shadow-soft"
                                : "bg-accent text-white hover:bg-accent/90 shadow-soft"
                            : "bg-surface-secondary text-text-secondary hover:bg-surface hover:text-text-primary border border-border"
                        }
                    `}
                >
                    {isPayingThisCard ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent"
                            />
                            Redirecting…
                        </>
                    ) : (
                        <>
                            Buy Now
                            <ArrowRight className="w-3.5 h-3.5" />
                        </>
                    )}
                </button>

                <div className="mt-6 pt-5 border-t border-border space-y-2.5 flex-1">
                    {plan.features.map((feature, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.08 + i * 0.04, ease: easeOut }}
                            className="flex items-center gap-2.5 list-none"
                        >
                            <span className={`
                                flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                ${isGold ? "bg-gold-soft" : "bg-accent-soft"}
                            `}>
                                <Check className={`w-2.5 h-2.5 ${isGold ? "text-gold" : "text-accent"}`} />
                            </span>
                            <span className="text-xs text-text-secondary leading-snug">{feature}</span>
                        </motion.li>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Pricing = () => {
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [paying, setPaying] = useState(false);
    const [payingAmount, setPayingAmount] = useState<number | null>(null);

    const onBuy = async (planId: string) => {
        const selectedPlan =
  plans.find(
    (plan) => plan.id === planId
  );

if (!selectedPlan) return;

setPayingAmount(
  selectedPlan.amount
);
        setPaying(true);
        try {
           await handlePaying(
  planId as
    | "starter"
| "pro"
| "premium"
);
        } finally {
            setPaying(false);
            setPayingAmount(null);
        }
      };
    const dispatch = useDispatch<AppDispatch>();


          const handleSignOut = async () => {
              await signOutUser(dispatch, navigate);
          };
const { userData } = useSelector((state: RootState) => state.user);
  if (!userData) return null;

    return (
        <div className="min-h-screen bg-bg">
               <DashboardHeader
                userName={userData.name}
                credits={userData.credits}
                onSignOut={handleSignOut}
                onBuyCredits={() => {}}
                onHistory={() => navigate("/history")}
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 ">
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex cursor-pointer mt-6 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-accent/30 shadow-soft transition-all duration-200 mb-10"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                </motion.button>

                <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 mb-5 shadow-soft">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs font-medium text-text-secondary">Simple pricing</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight">
                        Buy <span className="text-gradient-accent">credits.</span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
                        One-time purchases. No subscriptions, no surprises — top up whenever you need.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
                    {plans.map((plan, i) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            isSelected={selectedPrice === plan.amount}
                            onSelect={setSelectedPrice}
                            onBuy={onBuy}
                            paying={paying}
                            payingAmount={payingAmount}
                            index={i + 1}
                        />
                    ))}
                </div>

                <motion.p
                    custom={5}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-center text-xs text-text-tertiary mt-10"
                >
                    Credits never expire · Secure checkout · GST included
                </motion.p>
            </div>
        </div>
    );
};

export default Pricing;
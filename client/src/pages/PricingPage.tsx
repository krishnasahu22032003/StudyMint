import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Star, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
// import handlePaying from "../lib/handlePaying";

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
        price: "₹100",
        amount: 100,
        credits: "50 credits",
        creditsCount: 50,
        description: "Perfect for quick revisions and trying out AI-powered notes.",
        features: [
            "Generate AI notes",
            "Exam-focused answers",
            "Diagrams & charts",
            "Fast generation",
        ],
        accentColor: "accent",
    },
    {
        id: "popular",
        title: "Popular",
        price: "₹200",
        amount: 200,
        credits: "120 credits",
        creditsCount: 120,
        description: "Best value for students preparing for exams.",
        features: [
            "All Starter features",
            "More credits per ₹",
            "Revision mode access",
            "Priority AI response",
        ],
        popular: true,
        accentColor: "gold",
    },
    {
        id: "pro",
        title: "Pro Learner",
        price: "₹500",
        amount: 500,
        credits: "300 credits",
        creditsCount: 300,
        description: "For serious exam preparation and full syllabus coverage.",
        features: [
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & diagrams",
            "Ideal for full syllabus",
            "Early access to features",
        ],
        accentColor: "accent",
    },
];

interface PricingCardProps {
    plan: PricingPlan;
    isSelected: boolean;
    onSelect: (amount: number) => void;
    onBuy: (amount: number) => void;
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
                        onBuy(plan.amount);
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



export default Pricing;
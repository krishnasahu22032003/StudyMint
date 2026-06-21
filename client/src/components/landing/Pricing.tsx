import { motion, type Variants } from "framer-motion";
import { Sparkles, Check, Crown } from "lucide-react";
import Button from "../ui/Button";
import handleGoogleAuth from "../../utils/handlegoogleauth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: easeOut,
        },
    },
};

 const dispatch = useDispatch<AppDispatch>();
   const handleGoogleLogin = async () => {
   await handleGoogleAuth(dispatch);
 };
const plans = [
    {
        name: "Starter",
        price: "0",
        description: "Perfect for trying StudyMint and creating your first notes.",
        featured: false,
        features: [
            "20 AI note generations",
            "PDF uploads",
            "Basic summaries",
            "Cloud storage",
        ],
    },
    {
        name: "Pro",
        price: "1",
        description: "For students who want unlimited productivity and focus.",
        featured: true,
        features: [
            "Unlimited note generation",
            "Advanced AI summaries",
            "Lecture transcription",
            "Smart organization",
            "Priority processing",
            "Export to PDF",
        ],
    },
    {
        name: "Team",
        price: "2",
        description: "For study groups, classrooms, and collaborative learning.",
        featured: false,
        features: [
            "Everything in Pro",
            "Shared workspaces",
            "Team collaboration",
            "Admin controls",
            "Shared notes",
            "Priority support",
        ],
    },
];

const PricingCard = ({
    plan,
}: {
    plan: (typeof plans)[0];
}) => {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{
                y: -8,
                scale: 1.015,
            }}
            transition={{
                duration: 0.5,
            }}
            className={`
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border
        p-8
        transition-all
        duration-700
        ${plan.featured
                    ? "border-accent/20 bg-surface shadow-elevated"
                    : "border-border bg-surface shadow-soft"
                }
      `}
        >
            {plan.featured && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-gold/[0.06]" />

                    <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

                    <div className="absolute top-5 right-5">
                        <div className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent-soft px-3 py-1">
                            <Crown className="w-3 h-3 text-accent" />
                            <span className="text-[11px] font-medium text-accent">
                                Popular
                            </span>
                        </div>
                    </div>
                </>
            )}

            <div className="relative">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
                    {plan.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {plan.description}
                </p>

                <div className="mt-8 flex items-end gap-1">
                    <span className="font-display text-5xl font-semibold tracking-tight text-text-primary">
                        ${plan.price}
                    </span>

                    <span className="pb-2 text-text-tertiary">
                        /month
                    </span>
                </div>

                <div className="mt-8">
                    <Button
                        variant={plan.featured ? "primary" : "secondary"}
                        size="lg"
                        className="w-full cursor-pointer"
                        onClick={handleGoogleLogin}
                    >
                        Get Started
                    </Button>
                </div>

                <div className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-soft">
                                <Check className="w-3 h-3 text-accent" />
                            </div>

                            <span className="text-sm text-text-secondary">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </motion.div>
    );
};

const Pricing = () => {
    return (
        <section id="pricing" className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 ink-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-accent/5 blur-[160px]" />

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={container}
                >
                    <motion.div
                        variants={fadeUp}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-soft">
                            <Sparkles className="w-3.5 h-3.5 text-gold" />
                            <span className="text-xs font-medium text-text-secondary">
                                Simple and transparent pricing
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                            <span className="block text-text-primary">
                                Pricing that grows
                            </span>

                            <span className="mt-2 text-gradient-accent">
                                with your learning.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-text-secondary">
                            Start for free and upgrade when you need more power. No hidden
                            fees, no complicated plans, just better studying.
                        </p>
                    </motion.div>

                    <div className="mt-20 grid gap-6 lg:grid-cols-3">
                        {
                            plans.map((plan) => (
                                <PricingCard
                                    key={plan.name}
                                    plan={plan}
                                />
                            ))
                        }
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
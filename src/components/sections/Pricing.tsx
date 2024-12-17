"use client";

import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    title: "Starter",
    monthlyPrice: 4.9,
    buttonText: "Sign Up Now",
    popular: false,
    inverse: false,
    features: ["1 User", "3 Projects", "10GB Storage", "Email Only"],
  },
  {
    title: "Professional",
    monthlyPrice: 9.9,
    buttonText: "Join Pro",
    popular: true,
    inverse: true,
    features: [
      "Unlimited Users",
      "10 Projects",
      "100GB Storage",
      "Multiple Sessions",
      "Priority Support",
      "Round-the-Clock",
    ],
  },
  {
    title: "Enterprise",
    monthlyPrice: "To use",
    buttonText: "Get Enterprise",
    popular: false,
    inverse: false,
    features: [
      "Unrestricted Users",
      "50 Projects",
      "1To Storage",
      "Unlimited Sessions (SSO)",
      "White-glove Service",
      "24/7 Priority",
      "Premium Security",
      "Exclusive Access",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title py-1">Pricing</h2>
          <p className="section-description mt-4">
            Choose the plan that works best for you. We offer a variety of plans
            to suit different needs and budgets.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            }) => (
              <div
                className={twMerge(
                  "card",
                  inverse === true && "border-black bg-black text-white"
                )}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                        animate={{
                          backgroundPositionX: "-100%",
                        }}
                        transition={{
                          duration: 1,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium "
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span className="tracking-tight font-bold text-black/50">
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature) => (
                    <li className="text-sm flex items-center gap-4">
                      <CheckIcon className="w-6 h-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

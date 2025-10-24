import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  fadeInUpVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  scaleInVariants,
  staggerContainerVariants
} from "@/hooks/useScrollAnimation";

export type AnimationType =
  | "fadeInUp"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "custom";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: AnimationType;
  customVariants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean; // Only animate once when entering viewport
  amount?: number; // How much of the element should be visible (0-1)
  margin?: string; // Root margin for intersection observer
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = "fadeInUp",
  customVariants,
  className = "",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  margin = "0px"
}) => {
  // Get the appropriate variants based on animation type
  const getVariants = (): Variants => {
    if (customVariants) return customVariants;

    let baseVariants: Variants;
    switch (animation) {
      case "fadeInLeft":
        baseVariants = fadeInLeftVariants;
        break;
      case "fadeInRight":
        baseVariants = fadeInRightVariants;
        break;
      case "scaleIn":
        baseVariants = scaleInVariants;
        break;
      case "fadeInUp":
      default:
        baseVariants = fadeInUpVariants;
        break;
    }

    // Add transition properties
    return {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.25, 0.25, 1], // easeOutQuart
        }
      }
    };
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin
      }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for stagger animations
interface StaggerWrapperProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerWrapper: React.FC<StaggerWrapperProps> = ({
  children,
  className = "",
  staggerDelay = 0.1
}) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

// Component for animated counters (numbers that count up on scroll)
interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = ""
}) => {
  const [count, setCount] = React.useState(from);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function (easeOutQuart)
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(from + (to - from) * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, from, to, duration]);

  return (
    <span
      className={className}
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
              }
            },
            { threshold: 0.3 }
          );
          observer.observe(el);
        }
      }}
    >
      {prefix}{count}{suffix}
    </span>
  );
};

export default ScrollAnimationWrapper;

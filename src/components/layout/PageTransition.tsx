import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({
	children,
	customKey,
}: { children: ReactNode; customKey?: string }) {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={customKey || location.pathname}
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -5, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

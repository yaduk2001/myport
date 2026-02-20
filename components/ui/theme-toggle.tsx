"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
            aria-label="Toggle theme"
        >
            <Sun className="h-4 w-4 absolute transition-all dark:-rotate-90 dark:opacity-0 text-gray-800 dark:text-gray-200" />
            <Moon className="h-4 w-4 absolute transition-all rotate-90 opacity-0 dark:rotate-0 dark:opacity-100 text-gray-800 dark:text-gray-200" />
        </motion.button>
    );
}

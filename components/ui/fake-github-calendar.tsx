"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FakeGithubCalendar = () => {
    // Generate a full year of "boosted" activity
    const [weeks, setWeeks] = useState<number[][]>([]);

    useEffect(() => {
        const totalWeeks = 52;
        const generatedWeeks = [];
        for (let i = 0; i < totalWeeks; i++) {
            const days = [];
            for (let j = 0; j < 7; j++) {
                // Return a random level 0-4, heavily weighted towards high activity (3-4)
                const rand = Math.random();
                let level = 0;
                if (rand > 0.95) level = 0;
                else if (rand > 0.85) level = 1;
                else if (rand > 0.65) level = 2;
                else if (rand > 0.35) level = 3;
                else level = 4;

                days.push(level);
            }
            generatedWeeks.push(days);
        }
        setWeeks(generatedWeeks);
    }, []);

    const getLevelColor = (level: number) => {
        switch (level) {
            case 0: return "bg-slate-100 dark:bg-slate-800"; // Empty
            case 1: return "bg-green-200 dark:bg-green-900";
            case 2: return "bg-green-400 dark:bg-green-700";
            case 3: return "bg-green-500 dark:bg-green-500";
            case 4: return "bg-green-600 dark:bg-green-400";
            default: return "bg-slate-100 dark:bg-slate-800";
        }
    };

    return (
        <div className="w-full overflow-hidden">
            <div className="flex gap-1 justify-center min-w-max">
                {weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                        {week.map((level, dIndex) => (
                            <motion.div
                                key={`${wIndex}-${dIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: wIndex * 0.01 + dIndex * 0.005 }}
                                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                                whileHover={{ scale: 1.5, zIndex: 10 }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400"></div>
                </div>
                <span>More</span>
            </div>
        </div>
    );
};

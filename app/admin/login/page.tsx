"use client";

import { NeonButton } from "@/components/ui/neon-button";
import { CardContainer, CardBody, CardItem } from "@/components/ui/card-3d";
import { login } from "@/app/actions";
import { useActionState } from "react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(#4b4b4b 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            ></div>

            {/* Ambient Light */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px]"></div>
            </div>

            <CardContainer className="inter-var z-10">
                <CardBody className="bg-black/40 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neon-cyan/[0.1] dark:bg-black/40 dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-8 border border-white/10 backdrop-blur-md">
                    <CardItem
                        translateZ="50"
                        className="text-3xl font-bold font-display text-white text-center w-full mb-2"
                    >
                        Admin Access
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-400 text-sm max-w-sm mt-2 text-center w-full mb-8"
                    >
                        Enter your credentials to manage the system
                    </CardItem>

                    <form action={formAction} className="space-y-6">
                        <CardItem translateZ="80" className="w-full">
                            <label className="block text-xs uppercase text-neon-cyan mb-2 font-bold tracking-wider">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-neutral-600 shadow-inner"
                                placeholder="Enter secure password"
                            />
                        </CardItem>

                        {state?.error && (
                            <CardItem translateZ="40" className="w-full">
                                <p className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded border border-red-500/20">{state.error}</p>
                            </CardItem>
                        )}

                        <CardItem translateZ="100" className="w-full mt-4">
                            <NeonButton type="submit" className="w-full justify-center group-hover/card:shadow-neon-cyan/50" disabled={isPending}>
                                {isPending ? "Authenticating..." : "Initialize Session"}
                            </NeonButton>
                        </CardItem>
                    </form>
                </CardBody>
            </CardContainer>
        </div>
    );
}

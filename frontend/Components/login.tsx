"use client"

import React, { useEffect, useState } from "react";
import TransitionComponents from "./transition-component";
import { useRouter } from "next/navigation";

const Login = () => {
    const [login,setLogin] = useState(false);
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    
    useEffect(() => {
        const isLogged = localStorage.getItem("login");
        if (isLogged === "true") {
        router.push("/main");
        }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        if (user === "Hirelens" && password === "admin") {
            localStorage.setItem("login", "true");
            setLogin(true);
            setError("");
            router.push("/main");
        } else {
            setError("Invalid Credentials");
        }
    };

    return (
        <TransitionComponents position="bottom" className={login ? "hidden" : "block max-w-2xl absolute top-50 right-0 left-0 mx-auto" }>
            <form className="flex flex-col bg-cyan-800 rounded-xl shadow-xl p-8" onSubmit={handleSubmit}>
                <header 
                className="text-3xl text-center bg-cyan-900 text-white py-4 rounded-t-xl"
                >Login <span className="text-secondary font-bold">app</span>
                </header>
                <div className="flex flex-col items-center gap-5 my-5 text-white">
                    <label className="text-left text-xl w-full max-w-lg">User</label>
                    <input 
                    type="text"
                    value={user}
                    onChange={(e)=> setUser(e.target.value)}
                    placeholder="Hirelens.."
                    className="w-full max-w-lg bg-slate-500 text-stone-50 text-xl rounded-lg px-4 py-2 border-2 border-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-600 transition"
                    />
                    <label className="text-left text-xl w-full max-w-lg">Password</label>
                    <input 
                    className="w-full max-w-lg bg-slate-500 text-stone-50 text-xl rounded-lg px-4 py-2 border-2 border-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-600 transition"
                    type="password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-400">{error}</p>}
                    <button type="submit" 
                    className="py-2 px-3 bg-cyan-500 text-xl border-2 border-transparent hover:border-cyan-400 hover:ring-2 hover:ring-cyan-600 transition">
                        Sign In
                    </button>
                </div>
            </form>
        </TransitionComponents>
      );
}
 
export default Login;
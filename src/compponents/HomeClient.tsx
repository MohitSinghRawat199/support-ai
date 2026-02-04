"use client"
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation";

const HomeClient = ({ email }: { email: string }) => {

    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    }
    const firstLetter = email ? email.charAt(0).toUpperCase() : '';
    const [open, setOpen] = React.useState(false);
    const popupref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupref.current && !popupref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [popupref]);

    const features = [
        {
            title: "24/7 Availability", 
            description: "Provide round-the-clock support to your customers with AI-driven responses."
        },
        {       
            title: "Personalized Responses", 
            description: "Tailor interactions based on customer data for a more engaging experience."
        },  
        {
            title: "Seamless Integration",
            description: "Easily integrate with your existing support systems and workflows."
        }
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'GET',
            }); 
            if (response.ok) {
                window.location.href = '/';
            }   
        } catch (error) {
            console.error("Logout failed:", error);
        }   
    }   

    const navigate = useRouter();

    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto flex items-center justify-between h-16 px-4'>
                    <div className='text-lg font-semibold tracking-tight '>AI <span className='text-zinc-600'>Support</span></div>
                    {email ? <div className='relative' ref={popupref}>
                        <button className='w-10 h-10 rounded-full bg-black text-white flex items-center 
                justify-center font font-semibold hover:scale-105 
                transition'
                            onClick={() => setOpen(prev => !prev)}
                        >{firstLetter}</button>
                        <AnimatePresence>
                            {
                                open && (

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className='absolute right-0 mt-3 w-44
                         bg-white rounded-xl shadow-xl border
                          border-zinc-200 overflow-hidden'>
                                        <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'
                                        onClick={()=>navigate.push('/dashboard')}
                                        >Dashboard</button>
                                        <button className='w-full text-left px-4 py-3 text-red-600 hover:bg-zinc-100'
                                        onClick={handleLogout}
                                        >Logout</button>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                        : <button
                            onClick={handleLogin}
                            className='px-5 py-2 rounded-full bg-black text-white 
                text-sm font-medium hover:bg-zinc-800 disabled:opacity-60 
                flex items-center gap-2'>
                            Login
                        </button>
                    }
                </div>

            </motion.div>
            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-6'>
                            Revolutionize Customer Support with AI-Powered Solutions
                        </h1>
                        <p className='text-zinc-700 mb-8'>
                            Elevate your customer service experience using cutting-edge AI technology. Our platform enables businesses to provide instant, accurate, and personalized support, enhancing customer satisfaction and loyalty.
                        </p>
                        <div className='mt-10 flex gap-4'>

                            {email ? (<button
                                className='px-7 py-3 rounded-xl bg-black text-white
                text-sm font-medium hover:bg-zinc-800 disabled:opacity-60
                flex items-center gap-2'
                                onClick={() => navigate.push('/dashboard')}
                >
                                Go to Dashboard 
                            </button>) : (<button
                                onClick={handleLogin}
                                className='px-7 py-3 rounded-xl bg-black text-white
                text-sm font-medium hover:bg-zinc-800 disabled:opacity-60
                flex items-center gap-2'
                            >
                                Get Started
                            </button>)}

                            <a href='#feature' className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700
                text-sm font-medium hover:bg-zinc-100 disabled:opacity-60
                flex items-center gap-2'>
                                Learn More
                            </a>

                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className='relative'
                    >

                        <div className='rounded-2xl bg-white shadow-2xl border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>
                                Live Chat Preview
                            </div>
                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Do you offer cash on delivery?</div>
                                <div className='bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit'>Yes cash on Delivery</div>
                                <motion.div 
                                animate={{y:[0, -10, 0]}}
                                transition={{duration:1.5, repeat:Infinity, ease:"easeInOut"}}
                                className='bg-black absolute -bottom-6 -right-6 w-12 h-12 rounded-full
                                 flex items-center justify-center text-white text-xl'>
                                   💬
                                </motion.div>
                            </div>

                        </div>

                    </motion.div>

                </div>
            </section>

            <section id="feature" className='border-t py-20 px-6 bg-zinc-50 border-zinc-200'>
                <motion.div 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6, ease:"easeOut"}}
                 viewport={{once:true}}
                className='max-w-6xl mx-auto text-center mb-16'>
                    <h2 className='text-3xl font-bold mb-4'>Why Bussiness choose AI support</h2>
                    <p className='text-zinc-600'>Discover the powerful features that make our AI-powered customer support platform stand out.</p>
                </motion.div>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {features.map((feature, index) => (
                        <motion.div 
                        key={index} 
                        initial={{opacity:0, y:20}}
                        whileInView={{opacity:1, y:0}}
                        transition={{duration:0.6, ease:"easeOut", delay:index*0.2}}
                            viewport={{once:true}}
                        className='bg-w`hite p-6 rounded-2xl shadow-lg border border-zinc-200'>
                            <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
                            <p className='text-zinc-600'>{feature.description}</p>
                        </motion.div>
                    ))} 
                </div>
            </section> 
            <footer className='mt-20 py-10 border-t border-zinc-200 text-center text-zinc-600 text-sm'>
                &copy; {new Date().getFullYear()} Support AI. All rights reserved.
            </footer> 
        </div>
    )
}

export default HomeClient

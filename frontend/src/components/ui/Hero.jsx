import React from 'react'
import { Button } from './button'
import { ShoppingBag, Zap, ArrowRight } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-white">
            {/* Advanced Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-100/20 rounded-full blur-[100px]"></div>
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    
                    {/* Text Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 bg-pink-100/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200/50">
                            <Zap size={16} className="text-pink-600 fill-pink-600" />
                            <span className="text-sm font-bold text-pink-700 tracking-tight uppercase">New Arrivals 2026</span>
                        </div>

                        <h1 className='text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight'>
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Electronics</span> <br />
                            at Best Prices
                        </h1>

                        <p className='text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg'>
                            Experience the future of technology today. Discover cutting-edge smartphones, high-performance laptops, and premium accessories with unbeatable deals.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-5'>
                            <Button className='h-14 px-10 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-pink-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2'>
                                Shop Now
                                <ShoppingBag size={20} />
                            </Button>
                            <Button variant='outline' className='h-14 px-10 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-lg font-bold transition-all hover:border-pink-300 flex items-center gap-2'>
                                View Deals
                                <ArrowRight size={20} />
                            </Button>
                        </div>

                        {/* Social Proof / Stats */}
                        <div className="pt-4 flex items-center gap-8 border-t border-gray-100">
                            <div>
                                <p className="text-2xl font-black text-gray-900">50k+</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Happy Customers</p>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div>
                                <p className="text-2xl font-black text-gray-900">100%</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Genuine Products</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className='relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300'>
                        {/* Decorative Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-blue-500/10 rounded-full blur-[80px] scale-75 animate-pulse"></div>
                        
                        <div className="relative group">
                            <img
                                src="/premium-hero.png"
                                alt="Premium Tech Hero"
                                className='max-w-full h-auto drop-shadow-[0_35px_35px_rgba(216,27,96,0.15)] select-none motion-safe:animate-[float_6s_ease-in-out_infinite] scale-110 lg:scale-125 transition-transform duration-700 group-hover:rotate-1'
                            />
                            
                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -left-8 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/50 hidden md:flex items-center gap-3 animate-bounce duration-3000">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                    <Zap size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Flash Sale</p>
                                    <p className="text-xs font-medium text-green-600">Ends in 2h 45m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support for float animation if not in main CSS */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(1deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .motion-safe\\:animate-\\[float_6s_ease-in-out_infinite\\] {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}

export default Hero
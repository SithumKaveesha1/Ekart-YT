import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/users/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    return (
        <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
                <div>
                    <Link to="/" className="flex items-center gap-1 font-bold text-pink-600 text-3xl">
                        <ShoppingCart size={32} />
                        EKART
                    </Link>
                </div>

                <nav className='flex gap-6 items-center'>
                    <ul className='flex items-center gap-6 font-medium text-gray-700'>
                        <Link to={'/'} className="hover:text-pink-600 transition-colors"><li>Home</li></Link>
                        <Link to={'/products'} className="hover:text-pink-600 transition-colors"><li>Products</li></Link>
                        <Link to={'/contact'} className="hover:text-pink-600 transition-colors"><li>Contact Us</li></Link>
                        {
                            user ? (
                                <Link to={'/profile'} className="hover:text-pink-600 transition-colors"><li>Hello, {user.firstname}</li></Link>
                            ) : (
                                <Link to={'/login'} className="hover:text-pink-600 transition-colors"><li>Hello, Guest</li></Link>
                            )
                        }
                    </ul>
                    
                    <div className='flex items-center gap-4 border-l border-pink-200 pl-6'>
                        <Link to="/cart" className='relative cursor-pointer group p-2'>
                             <ShoppingCart className='text-gray-700 group-hover:text-pink-600 transition-colors' />
                             {cartItems.length > 0 && (
                                <span className='absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-300 shadow-sm'>
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                             )}
                        </Link>

                        {user ? (
                            <Button 
                                onClick={logoutHandler}
                                className='bg-pink-600 hover:bg-pink-700 text-white cursor-pointer px-6 transition-all shadow-sm'
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link to="/login">
                                <Button className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer px-6 hover:shadow-lg transition-all'>
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
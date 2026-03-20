import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from './ui/button'

const Navbar = () => {
    const user = true 
    const accestoken = localStorage.getItem("accestoken");
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accestoken}`
                }
            })
            
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.removeItem("accestoken");
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
                    <Link to="/">
                        <img src="/Ekart.png" alt="Logo" className='w-[100px]' />
                    </Link>
                </div>

                <nav className='flex gap-10 justify-between items-center'>
                    <ul className='flex gap-7 items-center text-xl font-semibold'>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/products'}><li>Products</li></Link>
                        {
                            user && <Link to={'/profile'}><li>Hello User</li></Link>
                        }
                    </ul>
                    
                    <Link to={'/cart'} className='relative'>
                        <ShoppingCart />
                        <span className='bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm'>0</span>
                    </Link>

                    {
                        user ? (
                            <Button 
                                onClick={logoutHandler}
                                className='bg-pink-600 text-white cursor-pointer'
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link to="/login">
                                <Button className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer'>
                                    Login
                                </Button>
                            </Link>
                        )
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar
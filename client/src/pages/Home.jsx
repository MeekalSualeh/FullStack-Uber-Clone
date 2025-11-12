import { Link } from 'react-router-dom'
import uberLogo from "/uber-user-logo.png"
import uberHomepageBackground from "/uber-homepage-background.avif"

const Home = () => {
  return (
    <div className='flex flex-col font-[helvetica] h-screen w-full'>
        <div 
        className="h-3/4 w-full bg-no-repeat"
        style={{backgroundImage: `url(${uberHomepageBackground})` }}>

        <img src={uberLogo} 
        alt="uber-logo" 
        className="w-18 relative left-7 top-7"/>
        
        </div>

        <div className='w-full h-1/4 px-5 flex flex-col justify-center items-center gap-y-4'>
            <h1 className='text-black text-3xl font-semibold tracking-tight'>Get Started With Uber</h1>
            <Link to="/user-login"
            className='bg-black text-xl font-semibold text-white rounded-md flex items-center justify-center py-4 w-full cursor-pointer'
            >Get Started</Link>
        </div>
    </div>
  )
}

export default Home

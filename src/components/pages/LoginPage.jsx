import { useState } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LoginPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);

    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    const [signUpData, setSignUpData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log('Sign In:', signInData);
        alert('Sign In attempt with: ' + signInData.email);
        setSignInData({ email: '', password: '' });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const newUser = {
            fullName: signUpData.fullName,
            email: signUpData.email,
            password: signUpData.password
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        console.log('All Users:', updatedUsers);
        alert('Account created successfully!\n\nUsers: ' + JSON.stringify(updatedUsers, null, 2));
        setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '' });
        setIsSignIn(true);
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData({ ...signInData, [name]: value });
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-900 via-rose-700 to-purple-900 flex items-center justify-center p-4">
            <div className="w-full h-[600px] max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
                        Hello Again!
                    </h1>

                    {isSignIn ? (
                        // Sign In Form
                        <div className="mt-8">
                            <p className="text-gray-600 mb-6 font-medium">Let's get started with your 30 days trial!</p>

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signInData.email}
                                onChange={handleSignInChange}
                                className="w-full px-4 py-3 mb-4 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                required
                            />

                            <div className="relative mb-2">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={signInData.password}
                                    onChange={handleSignInChange}
                                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <div className="text-right mb-6">
                                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                    Recovery Password
                                </a>
                            </div>

                            <button
                                onClick={handleSignIn}
                                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 rounded-lg transition duration-300 mb-6"
                            >
                                Sign In
                            </button>

                            <div className="text-center mb-6">
                                <p className="text-gray-600 text-sm">Or continue with</p>
                            </div>

                            <div className="flex gap-4 justify-center mb-6">

                                {/* Google */}
                                <button className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
                                    <img
                                        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"   // ya CDN link
                                        alt="Google"
                                        className="w-6 h-6 object-contain"
                                    />
                                </button>

                                {/* Apple */}
                                <button className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
                                    <img
                                        src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"
                                        alt="Apple"
                                        className="w-6 h-6 object-contain"
                                    />
                                </button>

                                {/* Facebook */}
                                <button className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
                                    <img
                                        src="https://img.freepik.com/premium-vector/facebook-logo-vector-facebook-official-logo-vector-facebook-logo-illustrator_1002350-1803.jpg?semt=ais_hybrid&w=740&q=80"
                                        alt="Facebook"
                                        className="w-6 h-6 object-contain"
                                    />
                                </button>

                            </div>


                            <div className="text-center">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setIsSignIn(false)}
                                        className="text-rose-500 font-semibold hover:text-rose-600"
                                    >
                                        Create Account
                                    </button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Sign Up Form
                        <div className="mt-8">
                            <p className="text-gray-600 mb-6 font-medium">Create your account</p>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={signUpData.fullName}
                                onChange={handleSignUpChange}
                                className="w-full px-4 py-3 mb-4 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signUpData.email}
                                onChange={handleSignUpChange}
                                className="w-full px-4 py-3 mb-4 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                required
                            />

                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={signUpData.password}
                                    onChange={handleSignUpChange}
                                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={signUpData.confirmPassword}
                                onChange={handleSignUpChange}
                                className="w-full px-4 py-3 mb-6 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                required
                            />

                            <button
                                onClick={handleSignUp}
                                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 rounded-lg transition duration-300 mb-6"
                            >
                                Create Account
                            </button>

                            <div className="text-center">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setIsSignIn(true)}
                                        className="text-rose-500 font-semibold hover:text-rose-600"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Illustration */}
                <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-gradient-to-b from-purple-400 via-rose-300 to-purple-400">
                    <svg
                        viewBox="0 0 600 700"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#6B3FA0" />
                                <stop offset="50%" stopColor="#E8A87C" />
                                <stop offset="100%" stopColor="#C5A3D4" />
                            </linearGradient>
                            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFE5B4" />
                                <stop offset="100%" stopColor="#FFC875" />
                            </linearGradient>
                        </defs>

                        {/* Background */}
                        <rect width="600" height="700" fill="url(#skyGradient)" />

                        {/* Sun */}
                        <circle cx="480" cy="150" r="80" fill="url(#sunGradient)" opacity="0.9" />
                        <circle cx="480" cy="150" r="75" fill="url(#sunGradient)" opacity="0.6" />

                        {/* Land waves */}
                        <path
                            d="M 0 400 Q 150 350 300 380 T 600 380 L 600 700 L 0 700 Z"
                            fill="#B8A5D1"
                            opacity="0.7"
                        />
                        <path
                            d="M 0 450 Q 150 420 300 440 T 600 440 L 600 700 L 0 700 Z"
                            fill="#A39AC5"
                            opacity="0.6"
                        />
                        <path
                            d="M 0 500 Q 150 480 300 490 T 600 500 L 600 700 L 0 700 Z"
                            fill="#8F7EB3"
                            opacity="0.5"
                        />

                        {/* Trees on left */}
                        <line x1="50" y1="500" x2="50" y2="600" stroke="#1a1a1a" strokeWidth="8" />
                        <path
                            d="M 30 480 Q 50 450 70 480"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="6"
                        />

                        <line x1="120" y1="520" x2="120" y2="620" stroke="#1a1a1a" strokeWidth="8" />
                        <path
                            d="M 100 500 Q 120 470 140 500"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="6"
                        />

                        {/* Trees on right */}
                        <line x1="480" y1="480" x2="480" y2="580" stroke="#1a1a1a" strokeWidth="8" />
                        <path
                            d="M 460 460 Q 480 430 500 460"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="6"
                        />

                        <line x1="540" y1="500" x2="540" y2="600" stroke="#1a1a1a" strokeWidth="8" />
                        <path
                            d="M 520 480 Q 540 450 560 480"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="6"
                        />

                        {/* Decorative plants */}
                        <path
                            d="M 180 350 Q 200 320 220 350"
                            fill="none"
                            stroke="#1a1a1a"
                            strokeWidth="5"
                        />

                        {/* "Finally, you're here" text */}
                        <text
                            x="300"
                            y="280"
                            textAnchor="middle"
                            fill="white"
                            fontSize="32"
                            fontWeight="bold"
                            opacity="0.8"
                        >
                            Finally, you're here
                        </text>
                    </svg>
                </div>

                {/* <div className="hidden md:block md:w-1/2 relative overflow-hidden">
                    <img
                        src="/images/auth-illustration.png"
                        alt="Welcome Illustration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold opacity-80">
                            Finally, you're here
                        </h2>
                    </div>
                </div> */}

            </div>
        </div>
    );
}
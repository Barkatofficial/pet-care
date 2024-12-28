"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();

  async function handleLogin(formData) {
    setError();
    try {
      const res = await GlobalApi.customerLogin(formData);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      setTimeout(() => router.push('/'), 1000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-10 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-10 animate-pulse" />
        <div className="absolute -bottom-10 -right-20 w-96 h-96 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full opacity-10 animate-pulse" />
      </div>
      
      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105 duration-300">
        <CardHeader className="space-y-2 text-center">
          <img src="/logo.svg" alt="Doctor Booking Logo" className="w-16 mx-auto animate-fade-in" />
          <CardTitle className="text-4xl font-bold text-blue-700 animate-slide-in-down">Welcome Back</CardTitle>
          <p className="text-gray-600">Login to manage your bookings</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 animate-bounce">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-6 animate-fade-in" onSubmit={handleSubmit(handleLogin)}>
            {/* Email Input */}
            <div>
              <div className="relative">
                <Input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="Email Address"
                  className="pl-12 py-3 rounded-lg border-gray-300 focus:ring focus:ring-blue-400 transition duration-200"
                />
                <Mail className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
            
            {/* Password Input */}
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Password"
                  className="pl-12 pr-12 py-3 rounded-lg border-gray-300 focus:ring focus:ring-blue-400 transition duration-200"
                />
                <Lock className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6 text-gray-400" />
                  ) : (
                    <Eye className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
            </div>
            
            {/* Submit Button */}
            <Button
              className={`w-full py-3 rounded-lg ${isSubmitting ? 'bg-blue-gray' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-300`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </Button>

            {/* Signup Link */}
            <div className="text-center mt-4 animate-fade-in">
              <p className="text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
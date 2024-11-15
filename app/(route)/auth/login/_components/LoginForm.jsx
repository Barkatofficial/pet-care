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
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState()

  async function handleLogin(formData) {
    setError()

    try {
      const res = await GlobalApi.customerLogin(formData)

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      toast.success(data.message)
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
    catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-1">
              <div className="relative">
                <Input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="Email Address"
                  className="pl-10"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Password"
                  className="pl-10 pr-10"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            {/* Forgot Password Link */}
            {/* <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div> */}

            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </Button>

            {/* Signup Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

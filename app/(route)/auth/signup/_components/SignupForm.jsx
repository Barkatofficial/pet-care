"use client"
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Eye, EyeOff, Mail, User, Lock, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValues, setOtpValues] = useState(Array(6).fill(''))
  const otpRefs = useRef(Array(6).fill(null))
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm()
  const formData = watch()

  // Original functionality methods
  async function handleGenerateOTP(formData) {
    try {
      const res = await GlobalApi.getOTP(formData.email)
      const data = await res.json()
      if (!res.ok) throw new Error("Failed to send OTP")
      setOtpSent(true)
      toast.success(data.message)
    } catch (err) {
      setError(err.message)
    }
  }

  function handleOtpChange(index, value) {
    if (!isNaN(value)) {
      const newOtpValues = [...otpValues]
      newOtpValues[index] = value
      setOtpValues(newOtpValues)
      if (value && index < otpValues.length - 1) {
        otpRefs.current[index + 1].focus()
      }
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text').split('')
    if (pastedData.length <= 6) {
      setOtpValues(pastedData)
      pastedData.forEach((_, index) => {
        if (otpRefs.current[index]) otpRefs.current[index].focus()
      })
    }
  }

  function handleSubmitOtp() {
    setError('')
    startTransition(async () => {
      try {
        const res = await GlobalApi.verifyOTP(formData.email, otpValues.join(''))
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        if (data.verified) {
          await registerUser(formData)
        }
      } catch (err) {
        setError(err.message)
      }
    })
  }

  async function registerUser(formData) {
    try {
      const res = await GlobalApi.customerSignup(formData)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      toast.success(data.message)
      setTimeout(() => {
        router.push('/auth/login')
      }, 1000)
    } catch (err) {
      setError(err.message)
      setOtpValues(Array(6).fill(''))
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-violet-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <Card className="relative w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-indigo-200/50 transition-all duration-300">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <User className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {otpSent ? 'Verify Your Email' : 'Create Account'}
          </CardTitle>
          <p className="text-gray-600">
            {otpSent ? 'Enter the code sent to your email' : 'Sign up to get started'}
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 animate-shake bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {!otpSent ? (
            <form className="space-y-5" onSubmit={handleSubmit(handleGenerateOTP)}>
              <div className="space-y-1">
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    {...register('name', { required: "Full Name is required" })}
                    className="pl-12 py-6 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all duration-300"
                  />
                  <User className="w-5 h-5 text-gray-400 group-hover:text-violet-500 absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                </div>
                {errors.name && <span className="text-red-500 text-sm ml-1">{errors.name.message}</span>}
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { required: "Email is required" })}
                    className="pl-12 py-6 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all duration-300"
                  />
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-violet-500 absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                </div>
                {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email.message}</span>}
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 8 characters)"
                    {...register('password', {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum length is 8" }
                    })}
                    className="pl-12 pr-12 py-6 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all duration-300"
                  />
                  <Lock className="w-5 h-5 text-gray-400 group-hover:text-violet-500 absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-violet-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-violet-500" />
                    )}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password.message}</span>}
              </div>

              <Button
                className="w-full py-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-violet-500/30 disabled:opacity-50 transition-all duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Generate OTP'}
              </Button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-medium text-violet-600 hover:text-indigo-600 transition-colors duration-300">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-3">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-lg font-semibold rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all duration-300"
                    maxLength={1}
                  />
                ))}
              </div>

              <Button
                className="w-full py-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-violet-500/30 disabled:opacity-50 transition-all duration-300"
                onClick={handleSubmitOtp}
                disabled={isPending || otpValues.join('').length !== 6}
              >
                {isPending ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtpValues(Array(6).fill(''))
                  }}
                  className="inline-flex items-center text-gray-600 hover:text-violet-600 font-medium transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to signup
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
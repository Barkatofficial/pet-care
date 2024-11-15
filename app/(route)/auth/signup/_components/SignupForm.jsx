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

  async function handleGenerateOTP(formData) {
    try {
      const res = await GlobalApi.getOTP(formData.email)

      const data = await res.json()
      if (!res.ok) throw new Error("Failed to send OTP")

      setOtpSent(true)
      toast.success(data.message)
    }
    catch (err) {
      setError(err.message)
    }
  }

  function handleOtpChange(index, value) {
    if (!isNaN(value)) {
      const newOtpValues = [...otpValues]
      newOtpValues[index] = value
      setOtpValues(newOtpValues)

      // Move to the next input if current input is filled
      if (value && index < otpValues.length - 1) {
        otpRefs.current[index + 1].focus()
      }
    }
  }

  function handleKeyDown(index, e) {
    // Move back to previous input on backspace
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
      }
      catch (err) {
        setError(err.message)
      }
    })
  }

  async function registerUser(formData) {
    try {
      const res = await GlobalApi.customerSignup(formData)

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      toast.success(data.message) // see if it returns promise then router push
      // setTimeout(() => {
      //   router.push('/auth/login')
      // }, 1500)
    }
    catch (err) {
      setError(err.message)
      setOtpValues(Array(6).fill(''))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {otpSent ? 'Enter Verification Code' : 'Create an Account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!otpSent ? (
            <form className="space-y-4" onSubmit={handleSubmit(handleGenerateOTP)}>
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    {...register('name', { required: "Full Name is required" })}
                    className="pl-10"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { required: "Email is required" })}
                    className="pl-10"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 8 characters)"
                    {...register('password', { required: "Password is required", minLength: { value: 8, message: "Minimum length is 8" } })}
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
                </div>
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>

              {/* Generate OTP Button */}
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Generate OTP'}
              </Button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">Log In</Link>
                </p>
              </div>
            </form>
          ) : (
            // OTP Input Form
            <div className="space-y-4">
              {/* OTP Inputs */}
              <div className="flex justify-center space-x-2">
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold"
                    maxLength={1}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button
                className="w-full"
                onClick={handleSubmitOtp}
                disabled={isPending || otpValues.join('').length !== 6}
              >
                {isPending ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              {/* Back to Signup Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtpValues(Array(6).fill(''))
                  }}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
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

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Mail, Lock, BookOpen, BarChart3, Shield } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { Alert } from '@components/common/Alert'
import { Logo } from '@components/common/Logo'
import { FeatureCard } from '@components/common/FeatureCard'
import { TrustBadge } from '@components/common/TrustBadge'
import { useAuth, useFormValidation } from '@hooks/index'
import { ROUTES } from '@constants/index'
import { loginSchema } from '@utils/validation'

type LoginFormData = z.infer<typeof loginSchema>

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login, isLoading, error } = useAuth()
  const { register, handleSubmit, formState: { errors }, watch } = useFormValidation({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [isAuthenticated, navigate])

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const success = await login(data.email, data.password)
    if (success) {
      navigate(ROUTES.DASHBOARD)
    }
  }

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE - BRANDING & FEATURES */}
          <div className="hidden lg:block space-y-8">
            <div>
              <Logo size="lg" showText variant="dark" />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Your Premier Student Portal
              </h1>
              <p className="text-lg text-gray-600">
                Seamless access to grades, payments, assignments, and academic records
              </p>
            </div>

            <div className="space-y-4">
              <FeatureCard
                icon={<BookOpen className="w-5 h-5" />}
                title="Academic Excellence"
                description="Access your grades, report cards, and academic progress in real-time"
              />
              <FeatureCard
                icon={<BarChart3 className="w-5 h-5" />}
                title="Complete Analytics"
                description="Track attendance, assignments, and performance metrics effortlessly"
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="Secure & Reliable"
                description="Bank-level security protecting your educational data 24/7"
              />
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 font-medium">Trusted by leading institutions</p>
              <div className="flex flex-wrap gap-3">
                <TrustBadge type="secure" size="sm" />
                <TrustBadge type="trusted" size="sm" />
                <TrustBadge type="verified" size="sm" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - LOGIN FORM */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            {/* MOBILE LOGO */}
            <div className="lg:hidden mb-8">
              <Logo size="md" showText variant="dark" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
              <p className="text-sm text-gray-600">
                Sign in to access your student portal
              </p>
            </div>

            {error && (
              <Alert
                type="error"
                title="Login Failed"
                message={error}
                dismissible={false}
                className="mb-6"
              />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Input
                  label="School Email Address"
                  type="email"
                  placeholder="your.email@zoesschools.org"
                  icon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  disabled={isLoading}
                  helperText="Use your official Zoes Schools email"
                  {...register('email')}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-gray-700">Password</label>
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock className="w-4 h-4" />}
                  error={errors.password?.message}
                  disabled={isLoading}
                  {...register('password')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading || !email || !password}
                className="h-11 text-sm font-semibold mt-6"
              >
                Sign In to Portal
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">First Time Logging In?</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Your account was automatically created when you were admitted. Check your email for login credentials.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                >
                  Recover Credentials
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Need Assistance?</h3>
                <p className="text-xs text-gray-600">
                  Contact support at{' '}
                  <a
                    href="mailto:support@zoesschools.org"
                    className="text-primary hover:underline font-medium"
                  >
                    support@zoesschools.org
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">
                  Your information is protected with enterprise-grade security
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-600">
            © 2024 Zoes Schools. All rights reserved.
            <a href="#" className="text-primary hover:underline ml-1">
              Privacy Policy
            </a>
            {' '}|{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
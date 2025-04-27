import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

        <form className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" className="bg-gray-800 border-gray-700" />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700" />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-gray-800 border-gray-700 pr-10"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="bg-gray-800 border-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-red-500 hover:bg-red-600 w-full">
              Create Account
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Button variant="link" className="text-red-500">
            Login here
          </Button>
        </div>
      </div>
    </div>
  );
}

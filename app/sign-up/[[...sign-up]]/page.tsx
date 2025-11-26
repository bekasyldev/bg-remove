import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return ( 
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4" >
            <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in" 
            appearance={{
                elements: {
                formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all',
                footerActionLink: 'text-indigo-600 hover:text-indigo-700',
                }
            }}
            />
    </div>
  )
}
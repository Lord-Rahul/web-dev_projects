import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    let [errorr, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const account = await authService.createAccount(data)
            if (account) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="mx-auto w-full max-w-lg bg-white/90 dark:bg-gray-900 rounded-2xl p-10 border border-blue-100/40 dark:border-gray-700 shadow-xl">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold leading-tight text-blue-700 dark:text-purple-300 mb-2">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-500 dark:text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 dark:text-purple-300 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {errorr && <p className="text-red-600 mt-8 text-center">{errorr}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            autoComplete="name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: true,})}
                        />
                        <Button type="submit" className="w-full mt-2">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Signup
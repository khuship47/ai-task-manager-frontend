import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Box, Typography, Button,TextField, InputAdornment, IconButton
 } from '@mui/material'
import { MdOutlineVisibility, MdOutlineVisibilityOff  } from "react-icons/md";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
        console.log(error)
        if (error) setError(error.message)
        setLoading(false)
    }

     return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: "white",
                }}
            >
                {/* Title */}
                <Typography
                    variant="h5"
                    sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}
                >
                    {isSignUp ? "Create your account" : "Welcome Back 👋"}
                </Typography>

                {/* Email */}
                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ mb: 0.5, fontSize: "14px", color: "gray" }}>
                        Email
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your email"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>

                {/* Password */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ mb: 0.5, fontSize: "14px", color: "gray" }}>
                        Password
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your password"
                        variant="outlined"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{
                            input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                >
                                    {showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff  />}
                                </IconButton>
                                </InputAdornment>
                            )
                            }
                        }}
                    />
                </Box>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    sx={{
                        py: 1.2,
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: 2,
                    }}
                >
                    {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                </Button>

                {/* Footer */}
                <Typography
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        fontSize: "14px",
                        color: "gray",
                    }}
                >
                    {isSignUp ? "Have an account?" : "Don’t have an account?"}{" "}
                    <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Login" : "Sign Up"}
                    </span>
                </Typography>
            </Box>
        </Box>
    );
}
import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

function AuthRegister() {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(formData)).then((response) => {
            if(response.payload.success) {
                toast({
                    title: "Account created successfully",
                    description: response.payload.message,
                });
                navigate("/auth/login");
            } else {
                toast({
                    title: response?.payload?.message,
                    variant: 'destructive',
                });
            }
        });
    }
    
    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Already have an account? <Link className="ml-2 font-medium text-primary hover:underline" to="/auth/login">Login</Link>
                </p>
            </div>
            <CommonForm 
                formControls={registerFormControls} 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={onSubmit} 
                buttonText="Sign up" 
            />
        </div>
    );
}

export default AuthRegister;

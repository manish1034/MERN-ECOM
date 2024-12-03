import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";

const initialState = {
    email: "",
    password: "",
}

function AuthLogin() {
    const [formData, setFormData] = useState({});
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    
    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Login to your account</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Don't have an account? <Link className="ml-2 font-medium text-primary hover:underline" to="/auth/register">Sign up</Link>
                </p>
            </div>
            <CommonForm 
                formControls={loginFormControls} 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={onSubmit} 
                buttonText="Login" 
            />
        </div>
    );
}

export default AuthLogin;

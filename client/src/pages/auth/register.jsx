import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { registerFormControls } from "@/config";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

function AuthRegister() {
    const [formData, setFormData] = useState({});
    const onSubmit = () => {
        console.log(formData);
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

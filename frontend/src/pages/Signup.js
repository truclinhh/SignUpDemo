import {useEffect, useState} from "react";
import {useSignup} from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const {signup, error, isLoading} = useSignup();
    const [isDisabled, setDisabled] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    };

    const validPassword = (password) => {
        if (password.length < 8) {
            return false;
        }

        if (!password.match(/[a-z]/)) {
            return false;
        }

        if (!password.match(/[A-Z]/)) {
            return false;
        }

        if (!password.match(/[0-9]/)) {
            return false;
        }

        if (!password.match(/[!@#$%^&*]/)) {
            return false;
        }

        return true;
    };

    const validSubmit = () => {
        if (!email || !password || !name) {
            setIsSubmit(false);
            return;
        }

        if (!validPassword(password)) {
            setIsSubmit(false);
            return;
        }

        setIsSubmit(true);
    };

    useEffect(() => {
        validSubmit();
    }, [email, password, name]);

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Name <div style={{color: "red", display: "inline"}}>*</div></label>
            <input
                type="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Password <div style={{color: "red", display: "inline"}}>*</div></label>
            <input
                type="password"
                onChange={(e) => {
                    setDisabled(validPassword(e.target.value));
                    setPassword(e.target.value);
                    console.log(password);
                }}
                value={password}
                style={{marginBottom: "10px"}}
            />
            {!isDisabled ? (
                <div style={{color: "red", marginBottom: "20px"}}>
                    Your password must contain more than 8 characters, with
                    numbers, uppercase, lowercase and special characters.
                </div>
            ) : (
                <div style={{color: "green", marginBottom: "20px"}}>
                    Strong password
                </div>
            )}

            <label>Email address <div style={{color: "red", display: "inline"}}>*</div></label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isDisabled ? false : true}
            />
            {/* isLoading && !isSubmit */}
            <button disabled={!isSubmit}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Signup;
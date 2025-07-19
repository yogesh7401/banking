import { useEffect, useState } from "react";
// import axios from "axios";
import { inputClassName } from "../utils/ClassName";
import ButtonComponent from "../utils/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUser, loginUser } from "../../redux/authSlice";
import { Navigate, useNavigate } from "react-router";
import LoaderComponent from "../utils/LoaderComponent";

export default function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { token, user, isLoading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate()

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, token, user]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      await dispatch(loginUser({ accountNumber, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.log(error);
    }   
  };

  if (isLoading) return <LoaderComponent />;
  
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-purple-800">
        <div className="bg-white w-96 sm:m-auto h-auto m-2 p-3 sm:p-6 rounded shadow-md flex flex-col gap-6">
            <h2 className="text-3xl text-purple-800 font-bold">Login</h2>
            <input type="text" placeholder="Account Number" className={inputClassName}
                onChange={(e) => setAccountNumber(e.target.value)} />
            <div>
              <input type="password" placeholder="Password" className={inputClassName}
                onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ButtonComponent disabled={isLoading} text="Login" onButtonClick={handleLogin}/>
        </div>
    </div>
  );
}


import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const loginHandler = useGoogleLogin({
        onSuccess: tokenResponse => {
          sessionStorage.setItem('token', tokenResponse.access_token)
          navigate("/dashboard")
        },
        onError: err => console.log(err)
      });
  return (
    <>
      <button onClick={loginHandler}>Login</button>
    </>
  )
}

export default Login
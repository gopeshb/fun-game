import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      dispatch(signInSuccess(data));
      toast.success("Logged In Successfully");
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto my-8 bg-black rounded-lg shadow-lg text-white">
    <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
    <form className="flex flex-col gap-4 mx-3" onSubmit={submitHandler}>
        <label htmlFor="email" className="text-sm font-semibold">
            Email
        </label>
        <input
            type="text"
            placeholder="Email"
            className="border p-2 rounded-lg bg-gray-800 text-white"
            id="email"
            onChange={handleChange}
        />

        <label htmlFor="password" className="text-sm font-semibold">
            Password
        </label>
        <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-lg bg-gray-800 text-white"
            id="password"
            onChange={handleChange}
        />

        <button
            disabled={loading}
            className="bg-blue-700 text-white p-2 rounded-lg uppercase text-sm text-center font-semibold disabled:opacity-50 hover:opacity-90"
        >
            {loading ? 'Loading...' : 'Sign In'}
        </button>
    </form>

    <div className="flex items-center my-2 mx-3">
        <p className="text-sm font-semibold">Don't have an account?</p>
        <Link to="/sign-up">
            <span
                onClick={() => toast.success('Redirecting to Sign Up Page')}
                className="text-blue-500 ml-1 hover:underline font-semibold text-sm"
            >
                Sign Up
            </span>
        </Link>
    </div>

    {error && <p className="text-red-500 mt-2">{error}</p>}
</div>

  );
}

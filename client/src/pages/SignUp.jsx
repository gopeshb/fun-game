import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("Redirecting to SignIn Page");
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto my-8 bg-black rounded-lg  text-white">
    <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
    <form onSubmit={submitHandler} className="flex flex-col gap-5 mx-3">
        <label htmlFor="username" className="text-sm font-semibold">
            Username
        </label>
        <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-lg bg-gray-800 text-white"
            id="username"
            onChange={handleChange}
        />

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
            className="bg-blue-700 text-white py-2 px-4 text-sx font-semibold rounded-lg uppercase disabled:opacity-50 hover:opacity-90"
        >
            {loading ? 'Loading...' : 'Sign Up'}
        </button>
    </form>

    <div className="flex items-center my-2 mx-3">
        <p className="text-sm font-semibold">Already have an account?</p>
        <Link to="/sign-in">
            <span
                onClick={() => toast.success('Redirecting to Sign In page')}
                className="text-blue-500 ml-1 hover:underline text-sm font-semibold"
            >
                Sign In
            </span>
        </Link>
    </div>

    {error && <p className="text-red-500 mt-5">{error}</p>}
</div>

  );
}

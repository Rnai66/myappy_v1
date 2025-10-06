import { useState } from "react";

export default function AuthForm({ type = "login", onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        {type === "login" ? "Sign in to myappy" : "Create your account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

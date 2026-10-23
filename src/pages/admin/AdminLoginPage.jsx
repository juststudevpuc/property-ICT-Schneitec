import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { adminLogin } from "../../lib/api";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await adminLogin(email, password);
      navigate("/admin"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ed] p-5 font-sans">
      <div className="w-full max-w-md bg-white p-8 shadow-sm border border-neutral-200">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-medium text-[#18392f]">Schneitec CMS</h1>
          <p className="text-sm text-neutral-500 mt-2">Sign in to manage your website.</p>
        </div>

        {error && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-600 uppercase">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full border border-neutral-300 bg-transparent px-3 text-sm focus:border-[#18392f] focus:outline-none" 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-600 uppercase">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full border border-neutral-300 bg-transparent px-3 text-sm focus:border-[#18392f] focus:outline-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 flex h-11 w-full items-center justify-center bg-[#18392f] text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#283c32] disabled:bg-neutral-400"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
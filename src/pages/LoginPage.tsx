import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertTriangle, CheckCircle2, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<{ type: "weak" | "success" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    // Simulating servlet logic: password length < 8 = weak
    if (password.length < 8) {
      setResult({
        type: "weak",
        message: `Hello ${username}, your password is weak. Try a strong one.`,
      });
    } else {
      setResult({
        type: "success",
        message: `Welcome ${username}`,
      });
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setResult({ type: null, message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Assignment 1</CardTitle>
            <CardDescription className="text-slate-400">
              Login Servlet - Password Validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.type === null ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Password must be at least 8 characters for "strong" status
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!username.trim() || !password.trim()}
                >
                  Login
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div
                  className={`p-6 rounded-lg ${
                    result.type === "weak"
                      ? "bg-amber-500/10 border border-amber-500/30"
                      : "bg-emerald-500/10 border border-emerald-500/30"
                  }`}
                >
                  {result.type === "weak" ? (
                    <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  ) : (
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  )}
                  <p
                    className={`text-lg font-medium ${
                      result.type === "weak" ? "text-amber-300" : "text-emerald-300"
                    }`}
                  >
                    {result.message}
                  </p>
                </div>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Servlet Code Reference */}
            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-2 font-medium">Equivalent Servlet Logic:</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
{`if (password.length() < 8) {
  out.println("Hello " + username + 
    ", your password is weak.");
} else {
  out.println("Welcome " + username);
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertTriangle, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ type: "weak" | "success" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate servlet processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setResult({ type: null, message: "" });
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 4 ? 1 : password.length < 8 ? 2 : 3;
  const strengthColors = ["bg-slate-600", "bg-red-500", "bg-amber-500", "bg-emerald-500"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
          >
            <motion.span whileHover={{ x: -3 }} transition={{ type: "spring", stiffness: 400 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CardTitle className="text-2xl text-white">Assignment 1</CardTitle>
              </motion.div>
              <CardDescription className="text-slate-400">
                Login Servlet - Password Validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {result.type === null ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="username" className="text-slate-200">
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    <motion.div className="space-y-2" variants={inputVariants}>
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
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                          required
                          disabled={isLoading}
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </motion.button>
                      </div>
                      
                      {/* Password strength indicator */}
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <motion.div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                passwordStrength >= level ? strengthColors[passwordStrength] : "bg-slate-600"
                              }`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: level * 0.1 }}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 flex justify-between">
                          <span>Password must be at least 8 characters for "strong" status</span>
                          {password.length > 0 && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={passwordStrength === 3 ? "text-emerald-400" : passwordStrength === 2 ? "text-amber-400" : "text-red-400"}
                            >
                              {strengthLabels[passwordStrength]}
                            </motion.span>
                          )}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div variants={inputVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                        disabled={!username.trim() || !password.trim() || isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </motion.div>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="result"
                    className="text-center space-y-6"
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div
                      className={`p-6 rounded-lg ${
                        result.type === "weak"
                          ? "bg-amber-500/10 border border-amber-500/30"
                          : "bg-emerald-500/10 border border-emerald-500/30"
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        {result.type === "weak" ? (
                          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        ) : (
                          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                        )}
                      </motion.div>
                      <motion.p
                        className={`text-lg font-medium ${
                          result.type === "weak" ? "text-amber-300" : "text-emerald-300"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {result.message}
                      </motion.p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-200"
                      >
                        Try Again
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Servlet Code Reference */}
              <motion.div
                className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-slate-500 mb-2 font-medium">Equivalent Servlet Logic:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`if (password.length() < 8) {
  out.println("Hello " + username + 
    ", your password is weak.");
} else {
  out.println("Welcome " + username);
}`}
                </pre>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, Loader2, RotateCcw, ArrowRight } from "lucide-react";

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

// Simulating the flow: AddServlet -> sendRedirect(sq?k=sum) -> SqServlet
const SendRedirectPage = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "redirect" | "result">("form");
  
  // Values passed through URL rewriting (simulating ?k=value)
  const [redirectUrl, setRedirectUrl] = useState("");
  const [sumValue, setSumValue] = useState(0);
  const [squareValue, setSquareValue] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!num1.trim() || !num2.trim()) {
      return;
    }

    setIsLoading(true);

    // Step 1: AddServlet receives num1 and num2, calculates sum
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    const k = n1 + n2; // This is what AddServlet calculates
    
    // Simulate servlet processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // AddServlet does: response.sendRedirect("sq?k=" + k)
    // This sends a redirect response to the client
    const url = `sq?k=${k}`;
    setRedirectUrl(url);
    setSumValue(k);
    setStep("redirect");
    setIsLoading(false);

    // Simulate client receiving redirect and sending new request to SqServlet
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Step 2: SqServlet receives k from URL parameter and calculates square
    // int k = Integer.parseInt(request.getParameter("k"));
    // int result = k * k;
    const result = k * k;
    setSquareValue(result);
    setStep("result");
  };

  const resetForm = () => {
    setNum1("");
    setNum2("");
    setStep("form");
    setRedirectUrl("");
    setSumValue(0);
    setSquareValue(0);
  };

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
                <CardTitle className="text-2xl text-white">Assignment 2: sendRedirect</CardTitle>
              </motion.div>
              <CardDescription className="text-slate-400">
                URL Rewriting - Passing data between servlets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Number 1 Input */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="num1" className="text-slate-200 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-slate-400" />
                        Enter first number (num1):
                      </Label>
                      <Input
                        id="num1"
                        type="number"
                        placeholder="e.g., 7"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* Number 2 Input */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="num2" className="text-slate-200 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-slate-400" />
                        Enter second number (num2):
                      </Label>
                      <Input
                        id="num2"
                        type="number"
                        placeholder="e.g., 5"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={inputVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
                        disabled={!num1.trim() || !num2.trim() || isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending to AddServlet...
                          </motion.div>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

                {step === "redirect" && (
                  <motion.div
                    key="redirect"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="text-center mb-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Loader2 className="w-8 h-8 text-emerald-400 mx-auto mb-3 animate-spin" />
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                        AddServlet Processing...
                      </h3>
                    </motion.div>

                    <motion.div
                      className="p-4 rounded-lg border-2 bg-blue-500/10 border-blue-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-400">num1:</span>
                          <span className="text-white font-mono">{num1}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-400">num2:</span>
                          <span className="text-white font-mono">{num2}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-slate-700">
                          <span className="text-slate-400">k = num1 + num2:</span>
                          <span className="text-emerald-400 font-mono font-bold">{sumValue}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 py-2 text-amber-400">
                          <ArrowRight className="w-4 h-4" />
                          <span className="font-mono text-xs">response.sendRedirect("{redirectUrl}")</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="text-center mb-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                        ✅ SqServlet Response
                      </h3>
                      <p className="text-xs text-slate-400">
                        Client redirected to: <span className="font-mono text-blue-400">{redirectUrl}</span>
                      </p>
                    </motion.div>

                    {/* Flow Visualization */}
                    <motion.div
                      className="p-4 rounded-lg border-2 bg-slate-900/50 border-slate-600"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-xs text-slate-500 mb-3 font-medium text-center">Request Flow:</p>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Client</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">AddServlet</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Client</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">SqServlet</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 text-center">(Two separate requests - URL Rewriting)</p>
                    </motion.div>

                    <motion.div
                      className="p-4 rounded-lg border-2 bg-emerald-500/10 border-emerald-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">URL Parameter (k):</span>
                          <span className="text-white font-mono font-medium">{sumValue}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">Calculation:</span>
                          <span className="text-white font-mono">{sumValue} × {sumValue}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-400 text-sm">Square Result (k²):</span>
                          <span className="text-emerald-400 font-mono text-xl font-bold">{squareValue}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-200"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AddServlet Code Reference */}
              <motion.div
                className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs text-slate-500 mb-2 font-medium">AddServlet.java:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`int num1 = Integer.parseInt(
    request.getParameter("num1"));
int num2 = Integer.parseInt(
    request.getParameter("num2"));

int k = num1 + num2;

// URL Rewriting - passing k in URL
response.sendRedirect("sq?k=" + k);`}
                </pre>
              </motion.div>

              {/* SqServlet Code Reference */}
              <motion.div
                className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-slate-500 mb-2 font-medium">SqServlet.java:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`// Get k from URL parameter (URL Rewriting)
int k = Integer.parseInt(
    request.getParameter("k"));

int result = k * k;

out.println("Square of " + k + " = " + result);`}
                </pre>
              </motion.div>

              {/* Key Concept */}
              <motion.div
                className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs text-blue-300 font-medium mb-1">Key Concept: URL Rewriting</p>
                <p className="text-xs text-slate-400">
                  <code className="text-blue-400">sendRedirect()</code> tells the client to make a 
                  <strong className="text-white"> new request</strong> to another URL. Data is passed 
                  via <strong className="text-amber-400">URL parameters</strong> (e.g., <code className="text-emerald-400">?k=12</code>). 
                  This is different from <code className="text-purple-400">RequestDispatcher.forward()</code> which 
                  keeps the same request.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SendRedirectPage;

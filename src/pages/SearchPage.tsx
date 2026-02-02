import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Loader2, RotateCcw, ExternalLink, Globe } from "lucide-react";

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

const GoogleSearchPage = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate servlet processing delay (like GoogleSearchServlet.java)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSearchedName(name);
    setShowResult(true);
    setIsLoading(false);
  };

  const resetForm = () => {
    setName("");
    setShowResult(false);
    setSearchedName("");
  };

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchedName)}`;

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
                <CardTitle className="text-2xl text-white">Assignment 2: Send Redirect</CardTitle>
              </motion.div>
              <CardDescription className="text-slate-400">
                Redirect to Google using sendRedirect()
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Name Input */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="name" className="text-slate-200 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-400" />
                        Enter Your Name:
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        disabled={!name.trim() || isLoading}
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
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Fetch
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  /* Result Display (simulating redirect to Google) */
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="text-center mb-6"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-lg font-semibold text-emerald-400 mb-2">
                        ✅ Redirecting to Google Search!
                      </h3>
                      <p className="text-xs text-slate-400">
                        Using sendRedirect() to Google
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 rounded-lg border-2 bg-blue-500/10 border-blue-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">Search Query:</span>
                          <span className="text-white font-medium">{searchedName}</span>
                        </div>
                        <div className="py-2">
                          <span className="text-slate-400 text-sm block mb-2">Redirect URL:</span>
                          <a 
                            href={googleSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm break-all flex items-center gap-2 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            {googleSearchUrl}
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    {/* Open in Google Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <a 
                        href={googleSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open in Google
                        </Button>
                      </a>
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
                        Search Again
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
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs text-slate-500 mb-2 font-medium">GoogleSearchServlet.java Logic:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`String name = request.getParameter("name");
String googleUrl = "https://www.google.com/search?q=" 
                   + name;

response.sendRedirect(googleUrl);`}
                </pre>
              </motion.div>

              {/* Key Concept */}
              <motion.div
                className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-blue-300 font-medium mb-1">Key Concept:</p>
                <p className="text-xs text-slate-400">
                  <code className="text-blue-400">response.sendRedirect()</code> sends a redirect 
                  response to the browser, causing it to navigate to a new URL (Google search in this case).
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GoogleSearchPage;

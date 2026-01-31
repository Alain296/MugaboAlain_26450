import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, ExternalLink, Loader2, Globe } from "lucide-react";

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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate servlet processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulating sendRedirect to Google
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    setRedirectUrl(googleUrl);
    setIsLoading(false);
    
    // Actually open Google in a new tab (simulating redirect)
    window.open(googleUrl, "_blank");
  };

  const resetForm = () => {
    setSearchQuery("");
    setRedirectUrl(null);
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
                <CardTitle className="text-2xl text-white">Assignment 2</CardTitle>
              </motion.div>
              <CardDescription className="text-slate-400">
                Send Redirect - Google Search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleFetch}
                className="space-y-6"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="space-y-2" variants={inputVariants}>
                  <Label htmlFor="search" className="text-slate-200">
                    Search Query
                  </Label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                      transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                    >
                      <Search className="w-4 h-4 text-slate-500" />
                    </motion.div>
                    <Input
                      id="search"
                      type="text"
                      placeholder="Enter search term..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pl-10 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
                    disabled={!searchQuery.trim() || isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirecting...
                      </motion.div>
                    ) : (
                      <>
                        <Globe className="w-4 h-4 mr-2" />
                        Fetch (Redirect to Google)
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <AnimatePresence>
                {redirectUrl && (
                  <motion.div
                    className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    <motion.p
                      className="text-sm text-emerald-300 mb-2 font-medium flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.span>
                      Redirected to:
                    </motion.p>
                    <motion.p
                      className="text-xs text-slate-400 break-all font-mono bg-slate-900/50 p-2 rounded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {redirectUrl}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        size="sm"
                        className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-200"
                      >
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
                <p className="text-xs text-slate-500 mb-2 font-medium">Equivalent Servlet Logic:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`String query = request.getParameter("q");
String url = "https://www.google.com/search?q=" 
  + URLEncoder.encode(query, "UTF-8");
response.sendRedirect(url);`}
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
                  <code className="text-blue-400">sendRedirect()</code> sends an HTTP 302 response,
                  causing the browser to navigate to a new URL. The URL changes in the address bar.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchPage;
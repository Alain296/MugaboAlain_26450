import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Loader2, ExternalLink } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);

    // Simulate servlet processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulating sendRedirect to Google
    // In Java: response.sendRedirect("https://www.google.com/search?q=" + query);
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    
    // Open Google search in new tab (simulates sendRedirect)
    window.open(googleUrl, "_blank");
    
    setIsLoading(false);
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
                Send Redirect - Redirect to Google Search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="space-y-2" variants={inputVariants}>
                  <Label htmlFor="query" className="text-slate-200 flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400" />
                    Enter search query:
                  </Label>
                  <Input
                    id="query"
                    type="text"
                    placeholder="Enter your search term"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                    required
                    disabled={isLoading}
                  />
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
                        Processing...
                      </motion.div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Fetch
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              {/* Servlet Code Reference */}
              <motion.div
                className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-slate-500 mb-2 font-medium">Equivalent Servlet Logic:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`String query = request.getParameter("query");

// sendRedirect to Google
response.sendRedirect(
  "https://www.google.com/search?q=" + query
);`}
                </pre>
              </motion.div>

              {/* Key Concept */}
              <motion.div
                className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs text-emerald-300 font-medium mb-1">Key Concept: sendRedirect()</p>
                <p className="text-xs text-slate-400">
                  <code className="text-emerald-400">response.sendRedirect(url)</code> sends an HTTP 302 
                  response to the client, telling the browser to make a <strong className="text-white">new request</strong> to 
                  the specified URL. The browser's address bar changes to show the new URL.
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

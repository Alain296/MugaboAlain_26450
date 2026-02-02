import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, ExternalLink, Loader2, Globe, RotateCcw } from "lucide-react";

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

const generateMockResults = (query: string): SearchResult[] => {
  const results: SearchResult[] = [
    {
      title: `${query} - Wikipedia`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      description: `${query} is a topic with extensive information available. Learn about the history, facts, and related content about ${query}.`,
    },
    {
      title: `Latest News about ${query}`,
      url: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
      description: `Get the latest news and updates about ${query}. Breaking stories, analysis, and in-depth coverage.`,
    },
    {
      title: `${query} - Official Website`,
      url: `https://www.${query.toLowerCase().replace(/\s+/g, '')}.com`,
      description: `Visit the official website for ${query}. Find official information, products, and services.`,
    },
    {
      title: `${query} Videos and Highlights`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      description: `Watch videos about ${query}. Highlights, tutorials, interviews, and more content.`,
    },
    {
      title: `${query} on Social Media`,
      url: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
      description: `See what people are saying about ${query}. Latest tweets, trends, and discussions.`,
    },
  ];
  return results;
};

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
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring" as const,
      stiffness: 100,
    },
  }),
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setHasSearched(false);
    
    // Simulate servlet processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Generate mock results based on query
    const results = generateMockResults(searchQuery);
    setSearchResults(results);
    setHasSearched(true);
    setIsLoading(false);
  };

  const resetForm = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="w-full max-w-2xl">
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
                Search Simulation - Displays Results (Simulates sendRedirect)
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

                <motion.div className="flex gap-3" variants={inputVariants}>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
                    disabled={!searchQuery.trim() || isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Fetching Results...
                      </motion.div>
                    ) : (
                      <>
                        <Globe className="w-4 h-4 mr-2" />
                        Fetch Results
                      </>
                    )}
                  </Button>
                  {hasSearched && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.form>

              {/* Search Results */}
              <AnimatePresence>
                {hasSearched && searchResults.length > 0 && (
                  <motion.div
                    className="mt-6 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="flex items-center gap-2 text-emerald-400 mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Showing {searchResults.length} results for "{searchQuery}"
                      </span>
                    </motion.div>

                    {searchResults.map((result, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={resultVariants}
                        initial="hidden"
                        animate="visible"
                        className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-all duration-200 hover:bg-slate-900/70 group"
                      >
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h3 className="text-blue-400 hover:text-blue-300 font-medium text-sm group-hover:underline">
                            {result.title}
                          </h3>
                          <p className="text-emerald-500 text-xs mt-1 truncate">
                            {result.url}
                          </p>
                          <p className="text-slate-400 text-xs mt-2 line-clamp-2">
                            {result.description}
                          </p>
                        </a>
                      </motion.div>
                    ))}
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
                  causing the browser to navigate to a new URL. Here we simulate displaying results instead.
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
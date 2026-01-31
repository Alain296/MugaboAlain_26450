import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    // Simulating sendRedirect to Google
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    setRedirectUrl(googleUrl);
    
    // Actually open Google in a new tab (simulating redirect)
    window.open(googleUrl, "_blank");
  };

  const resetForm = () => {
    setSearchQuery("");
    setRedirectUrl(null);
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
            <CardTitle className="text-2xl text-white">Assignment 2</CardTitle>
            <CardDescription className="text-slate-400">
              Send Redirect - Google Search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFetch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-slate-200">
                  Search Query
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Enter search term..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={!searchQuery.trim()}
              >
                <Search className="w-4 h-4 mr-2" />
                Fetch (Redirect to Google)
              </Button>
            </form>

            {redirectUrl && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <p className="text-sm text-emerald-300 mb-2 font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Redirected to:
                </p>
                <p className="text-xs text-slate-400 break-all font-mono">{redirectUrl}</p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="sm"
                  className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Search Again
                </Button>
              </div>
            )}

            {/* Servlet Code Reference */}
            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-2 font-medium">Equivalent Servlet Logic:</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
{`String query = request.getParameter("q");
String url = "https://www.google.com/search?q=" 
  + URLEncoder.encode(query, "UTF-8");
response.sendRedirect(url);`}
              </pre>
            </div>

            {/* Key Concept */}
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-300 font-medium mb-1">Key Concept:</p>
              <p className="text-xs text-slate-400">
                <code className="text-blue-400">sendRedirect()</code> sends an HTTP 302 response,
                causing the browser to navigate to a new URL. The URL changes in the address bar.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;

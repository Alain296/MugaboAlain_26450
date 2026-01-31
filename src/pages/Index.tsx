import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Web Technology Assignments
          </h1>
          <p className="text-slate-400 text-lg">
            Java Servlet Practice - Frontend UI Demo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Assignment 1 Card */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <LogIn className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white text-xl">Assignment 1</CardTitle>
              <CardDescription className="text-slate-400">
                Login Servlet - Password Validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-6">
                A login form that validates password strength. If password is less than 8 characters, shows a warning message.
              </p>
              <Link to="/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open Login Page
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Assignment 2 Card */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-emerald-400" />
              </div>
              <CardTitle className="text-white text-xl">Assignment 2</CardTitle>
              <CardDescription className="text-slate-400">
                Send Redirect - Google Search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-6">
                A search form that redirects to Google with the input value using sendRedirect concept.
              </p>
              <Link to="/search">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Open Search Page
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Built with React + TypeScript • Ready to export to VS Code
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

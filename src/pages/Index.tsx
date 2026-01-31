import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Search, Code2, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">React + TypeScript Demo</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Web Technology{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Assignments
            </span>
          </motion.h1>
          
          <motion.p
            className="text-slate-400 text-lg flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <Code2 className="w-5 h-5" />
            Java Servlet Practice - Frontend UI Demo
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {/* Assignment 1 Card */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors duration-300 h-full group">
              <CardHeader>
                <motion.div
                  className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <LogIn className="w-6 h-6 text-blue-400" />
                </motion.div>
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
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <span>Open Login Page</span>
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assignment 2 Card */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors duration-300 h-full group">
              <CardHeader>
                <motion.div
                  className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="w-6 h-6 text-emerald-400" />
                </motion.div>
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
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                    <span>Open Search Page</span>
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <p className="text-slate-500 text-sm">
            Built with React + TypeScript • Ready to export to VS Code
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
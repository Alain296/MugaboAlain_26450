import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Loader2, RotateCcw, User, Palette, Calendar } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  favoriteColor: string;
}

const colorOptions = [
  { value: "red", label: "Red", hex: "#ef4444" },
  { value: "blue", label: "Blue", hex: "#3b82f6" },
  { value: "green", label: "Green", hex: "#22c55e" },
  { value: "yellow", label: "Yellow", hex: "#eab308" },
  { value: "purple", label: "Purple", hex: "#a855f7" },
  { value: "orange", label: "Orange", hex: "#f97316" },
];

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

const AgeColorPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: "",
    favoriteColor: "red",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.age.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate servlet processing delay (like AgeColorServlet.java)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedData(formData);
    setShowResult(true);
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      favoriteColor: "red",
    });
    setShowResult(false);
    setSubmittedData(null);
  };

  const selectedColor = colorOptions.find(c => c.value === formData.favoriteColor);
  const resultColor = colorOptions.find(c => c.value === submittedData?.favoriteColor);

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
                Age & Favorite Color Validator
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
                    {/* First Name */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="firstName" className="text-slate-200 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name..."
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* Last Name */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="lastName" className="text-slate-200 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name..."
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* Age */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="age" className="text-slate-200 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="1"
                        max="150"
                        placeholder="Enter age..."
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20"
                        required
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* Favorite Color */}
                    <motion.div className="space-y-2" variants={inputVariants}>
                      <Label htmlFor="color" className="text-slate-200 flex items-center gap-2">
                        <Palette className="w-4 h-4 text-slate-400" />
                        Favorite Color
                      </Label>
                      <Select
                        value={formData.favoriteColor}
                        onValueChange={(value) => setFormData({ ...formData, favoriteColor: value })}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:ring-emerald-500">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {colorOptions.map((color) => (
                            <SelectItem 
                              key={color.value} 
                              value={color.value}
                              className="text-white hover:bg-slate-700 focus:bg-slate-700"
                            >
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded-full border border-slate-500"
                                  style={{ backgroundColor: color.hex }}
                                />
                                {color.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedColor && (
                        <motion.div 
                          className="flex items-center gap-2 text-xs text-slate-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                          Selected: {selectedColor.label}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={inputVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
                        disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.age.trim() || isLoading}
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
                            <Send className="w-4 h-4 mr-2" />
                            Submit
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  /* Result Display (simulating result.jsp) */
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
                        ✅ Form Submitted Successfully!
                      </h3>
                      <p className="text-xs text-slate-400">
                        Displaying result.jsp (forwarded from AgeColorServlet)
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 rounded-lg border-2"
                      style={{ 
                        backgroundColor: `${resultColor?.hex}15`,
                        borderColor: `${resultColor?.hex}50`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">First Name:</span>
                          <span className="text-white font-medium">{submittedData?.firstName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">Last Name:</span>
                          <span className="text-white font-medium">{submittedData?.lastName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-700">
                          <span className="text-slate-400 text-sm">Age:</span>
                          <span className="text-white font-medium">{submittedData?.age} years old</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-400 text-sm">Favorite Color:</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-5 h-5 rounded-full border border-white/30"
                              style={{ backgroundColor: resultColor?.hex }}
                            />
                            <span 
                              className="font-medium"
                              style={{ color: resultColor?.hex }}
                            >
                              {resultColor?.label}
                            </span>
                          </div>
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
                        Submit Another Form
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
                <p className="text-xs text-slate-500 mb-2 font-medium">AgeColorServlet.java Logic:</p>
                <pre className="text-xs text-slate-400 overflow-x-auto">
{`String firstName = request.getParameter("firstName");
String lastName = request.getParameter("lastName");
String age = request.getParameter("age");
String color = request.getParameter("color");

request.setAttribute("firstName", firstName);
request.setAttribute("lastName", lastName);
request.setAttribute("age", age);
request.setAttribute("color", color);

RequestDispatcher rd = request
  .getRequestDispatcher("result.jsp");
rd.forward(request, response);`}
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
                  <code className="text-blue-400">RequestDispatcher.forward()</code> forwards the request 
                  internally to another resource (like result.jsp). Unlike sendRedirect, 
                  the URL in the browser doesn't change.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgeColorPage;

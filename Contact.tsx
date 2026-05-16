import { useState } from "react";
import { Mail, Instagram, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "other",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          inquiryType: "other",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-8 animate-fade-in-slow">
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Get in Touch
              </h2>
              <p className="font-serif text-lg text-foreground/70">
                For commissions, gallery inquiries, or collaborations, I'd love
                to hear from you.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              {/* Instagram */}
              <div className="space-y-4">
                <p className="font-sans text-sm font-medium text-foreground/60 uppercase tracking-wide">
                  Follow
                </p>
                <a
                  href="https://instagram.com/mei.yu__art"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-3 font-sans text-foreground/70 hover:text-accent transition-colors duration-300 group"
                >
                  <Instagram size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span>@mei.yu__art</span>
                </a>
              </div>

              {/* Email */}
              <div className="space-y-4">
                <p className="font-sans text-sm font-medium text-foreground/60 uppercase tracking-wide">
                  Email
                </p>
                <div className="flex items-center gap-3 font-sans text-foreground/70">
                  <Mail size={20} />
                  <span>Use the form below →</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="space-y-4 pt-4">
                <p className="font-sans text-sm font-medium text-foreground/60 uppercase tracking-wide">
                  Response Time
                </p>
                <p className="font-serif text-foreground/70">
                  I typically respond within 2-3 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="animate-fade-in-slow animation-delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="font-sans text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 font-sans"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-sans text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 font-sans"
                  placeholder="your@email.com"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiryType"
                  className="font-sans text-sm font-medium text-foreground"
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 font-sans"
                >
                  <option value="other">General Inquiry</option>
                  <option value="commission">Commission Request</option>
                  <option value="gallery">Gallery Representation</option>
                  <option value="collaboration">Collaboration</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="font-sans text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 font-sans resize-none"
                  placeholder="Tell me about your inquiry..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-sm animate-fade-in-slow">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                  <p className="font-sans text-sm text-green-700">
                    Thank you! I'll be in touch soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-sm animate-fade-in-slow">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                  <p className="font-sans text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-foreground text-background font-sans font-medium rounded-sm hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

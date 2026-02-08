import React, { useEffect, useState } from "react";
import { useParallax } from "react-scroll-parallax";
import Star from "../../components/SVGs/Star";
import GitFork from "../../components/SVGs/GitFork";

const Contact = ({
  data: {
    label,
    heading,
    description,
    button,
    handleBuiltByClick,
    designAndBuiltBy,
  },
}) => {
  const [githubInfo, setGitHubInfo] = useState({ stars: null, forks: null });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot (anti-spam)
  });

  useEffect(() => {
    fetch("https://api.github.com/repos/Umar8206/my-portfolio")
      .then((response) => response.json())
      .then((json) => {
        const { stargazers_count, forks_count } = json;
        console.log("response of github info:");
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const { ref } = useParallax({
    easing: "easeIn",
    translateX: [-50, 0],
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setFeedback(data?.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback(
        "Thanks! I received your message — I’ll get back to you soon.",
      );
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  };

  return (
    <div className="ai-contact" id="contact">
      <div
        ref={ref}
        className="ai-contact-zebra-img"
        style={{ backgroundImage: `url(${"/assets/arrow-sample.svg"})` }}
      />

      <div className="ai-contact-box">
        <div className="container flex-center flex-column">
          <div className="ai-contact-box-width">
            <div className="ai-contact-label">{label}</div>
            <div className="ai-contact-title">{heading}</div>
            <div className="ai-contact-text">{description}</div>

            {/* CONTACT FORM */}
            <form onSubmit={onSubmit} className="ai-contact-form">
              {/* Honeypot (hidden) */}
              <div style={{ display: "none" }}>
                <label>Company</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  autoComplete="off"
                />
              </div>

              <div className="ai-contact-form-grid">
                <div className="ai-field">
                  <label className="ai-field-label">Name</label>
                  <input
                    className="ai-field-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="ai-field">
                  <label className="ai-field-label">Email</label>
                  <input
                    className="ai-field-input"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="ai-field">
                <label className="ai-field-label">Subject</label>
                <input
                  className="ai-field-input"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="If you have anything to discuss, let’s connect"
                />
              </div>

              <div className="ai-field">
                <label className="ai-field-label">Message</label>
                <textarea
                  className="ai-field-textarea"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Write your message..."
                  rows={5}
                  required
                />
              </div>

              <div className="ai-contact-button">
                <button
                  type="submit"
                  className="ai-button"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Sending..."
                    : button?.label || "Send Message"}
                </button>
              </div>

              {!!feedback && (
                <div className={`ai-contact-feedback ${status}`}>
                  {feedback}
                </div>
              )}
            </form>

            {/* Keep your Git section */}
            <div
              onClick={handleBuiltByClick}
              className="ai-contact-git-section"
            >
              <div>{designAndBuiltBy}</div>
              {/* {githubInfo.stars !== null && githubInfo.forks !== null && (
                <div>
                  <span>
                    <Star /> {githubInfo.stars.toLocaleString()}
                  </span>{" "}
                  <span>
                    <GitFork /> {githubInfo.forks.toLocaleString()}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

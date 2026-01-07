import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PrivacyPolicy() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-night min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-white/60 text-lg">
            Last updated: January 7, 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-white/80 leading-relaxed"
        >
          {/* 1. Introduction */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              1. Introduction
            </h2>
            <p>
              Welcome to Visam Solutions ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.visamsolulions.com (the "Site") and use our services.
            </p>
            <p className="mt-4">
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Site.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              2. Information We Collect
            </h2>
            
            <h3 className="text-xl font-bold mb-2 text-neon">2.1 Information You Provide Directly</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Form Data:</strong> Information submitted through contact forms</li>
              <li><strong>Project Details:</strong> Description of your project and requirements</li>
              <li><strong>Communication Data:</strong> Emails, messages, and inquiries</li>
            </ul>

            <h3 className="text-xl font-bold mb-2 text-neon mt-6">2.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Log Data:</strong> IP address, browser type, pages visited, time stamps</li>
              <li><strong>Device Information:</strong> Device type, operating system, unique identifiers</li>
              <li><strong>Usage Data:</strong> Interaction with our Site and services</li>
              <li><strong>Cookies:</strong> Information stored in cookies and similar technologies</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>To provide, maintain, and improve our services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send transactional and promotional emails</li>
              <li>To personalize and enhance your experience</li>
              <li>To analyze usage patterns and trends</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
              <li>To conduct business analytics and research</li>
            </ul>
          </section>

          {/* 4. Information Sharing */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              4. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li><strong>Service Providers:</strong> With vendors who assist us in operating our Site and conducting our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or asset sale</li>
              <li><strong>Your Consent:</strong> With your explicit permission</li>
            </ul>
          </section>

          {/* 5. Security */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical, administrative, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            <p className="mt-4">
              We use industry-standard SSL encryption, secure servers, and regular security audits. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          {/* 6. Cookies and Tracking */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              6. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of our Site.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li><strong>Essential Cookies:</strong> Required for Site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand user behavior</li>
              <li><strong>Marketing Cookies:</strong> Used for targeted advertising</li>
            </ul>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              7. Your Rights and Choices
            </h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li><strong>Access:</strong> Right to access your personal information</li>
              <li><strong>Correction:</strong> Right to correct inaccurate data</li>
              <li><strong>Deletion:</strong> Right to request deletion of your data</li>
              <li><strong>Opt-out:</strong> Right to opt-out of marketing communications</li>
              <li><strong>Data Portability:</strong> Right to receive your data in portable format</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at: privacy@visamsolulions.com
            </p>
          </section>

          {/* 8. Retention */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              8. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You can request deletion at any time, subject to legal requirements.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              9. Children's Privacy
            </h2>
            <p>
              Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we discover that a child has provided us with personal information, we will delete such information immediately.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-xl">
              <p><strong>Visam Solutions</strong></p>
              <p>Jodhpur, Rajasthan, India</p>
              <p>Email: privacy@visamsolulions.com</p>
              <p>Phone: +91 70737 85326</p>
            </div>
          </section>

          {/* 11. Changes */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              11. Changes to Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of our Site constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold hover:shadow-lg hover:shadow-neon/50 transition-all cursor-pointer"
          >
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}

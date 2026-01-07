import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function TermsOfService() {
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
            Terms of <span className="text-gradient">Service</span>
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
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website (www.visamsolulions.com) and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* 2. Use License */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              2. License to Use Website
            </h2>
            <p>
              Visam Solutions grants you a limited license to access and use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Reproduce or duplicate any content without permission</li>
              <li>Modify or alter our content or services</li>
              <li>Engage in any illegal or unauthorized use</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Transmit viruses or malicious code</li>
              <li>Reverse engineer or decompile our services</li>
            </ul>
          </section>

          {/* 3. Disclaimer of Warranties */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              3. Disclaimer of Warranties
            </h2>
            <p>
              Our website and services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the website or services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Absence of viruses or harmful code</li>
            </ul>
          </section>

          {/* 4. Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              4. Limitation of Liability
            </h2>
            <p>
              In no event shall Visam Solutions, its directors, employees, or agents be liable to you or any third party for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or services.
            </p>
            <p className="mt-4">
              Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim, if any.
            </p>
          </section>

          {/* 5. Indemnification */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              5. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless Visam Solutions, its officers, directors, employees, and agents from any and all claims, damages, losses, costs, and expenses (including attorney's fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your use of the website or services</li>
              <li>Your violation of these terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you provide or submit</li>
            </ul>
          </section>

          {/* 6. Intellectual Property Rights */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              6. Intellectual Property Rights
            </h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of Visam Solutions or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, or transmit any content without our prior written permission. Unauthorized use of our intellectual property is prohibited.
            </p>
          </section>

          {/* 7. User Content */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              7. User-Submitted Content
            </h2>
            <p>
              If you submit, post, or display content on our website, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content.
            </p>
            <p className="mt-4">
              You represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>You own or have rights to the content</li>
              <li>The content does not violate any laws</li>
              <li>The content does not infringe on third-party rights</li>
              <li>The content is accurate and not misleading</li>
            </ul>
          </section>

          {/* 8. Third-Party Links */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              8. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party websites is at your own risk and subject to their terms of service.
            </p>
            <p className="mt-4">
              We do not endorse or guarantee any third-party products or services.
            </p>
          </section>

          {/* 9. Service Modifications */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              9. Service Modifications
            </h2>
            <p>
              Visam Solutions reserves the right to modify, suspend, or discontinue our website and services at any time, with or without notice. We are not liable for any modification, suspension, or discontinuance of our services.
            </p>
          </section>

          {/* 10. Pricing and Payment */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              10. Pricing and Payment Terms
            </h2>
            <p>
              All prices are in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice. We accept various payment methods as indicated on our website.
            </p>
            <p className="mt-4">
              Payment is due upon receipt of invoice unless other terms are agreed upon. Late payments may result in suspension of services.
            </p>
          </section>

          {/* 11. Refund Policy */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              11. Refund Policy
            </h2>
            <p>
              Refunds are available within 7 days of purchase if the service has not been started. Custom projects are non-refundable once work has commenced.
            </p>
            <p className="mt-4">
              To request a refund, contact us at: billing@visamsolulions.com
            </p>
          </section>

          {/* 12. Limitation on Services */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              12. Limitation on Services
            </h2>
            <p>
              We do not provide legal, financial, or medical advice. Any information on our website is for informational purposes only. You should consult with qualified professionals for legal, financial, or medical matters.
            </p>
          </section>

          {/* 13. User Accounts */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              13. User Accounts
            </h2>
            <p>
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Maintaining the confidentiality of your credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Notifying us of unauthorized access</li>
              <li>Complying with these terms</li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          {/* 14. Prohibited Activities */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              14. Prohibited Activities
            </h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Harassing or abusing other users</li>
              <li>Transmitting spam or unsolicited messages</li>
              <li>Attempting to hack or gain unauthorized access</li>
              <li>Using bots or automated scripts without permission</li>
              <li>Collecting data without authorization</li>
              <li>Impersonating others</li>
              <li>Selling or transferring account access</li>
              <li>Circumventing security measures</li>
            </ul>
          </section>

          {/* 15. Dispute Resolution */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              15. Dispute Resolution
            </h2>
            <p>
              Any disputes arising from these terms shall be resolved through mutual negotiation. If resolution cannot be reached, disputes shall be subject to arbitration under the rules of the Indian Arbitration Act.
            </p>
            <p className="mt-4">
              Both parties agree to attempt good faith resolution before initiating legal proceedings.
            </p>
          </section>

          {/* 16. Governing Law */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              16. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Rajasthan, India, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* 17. Contact Information */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              17. Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-xl">
              <p><strong>Visam Solutions</strong></p>
              <p>Jodhpur, Rajasthan, India</p>
              <p>Email: support@visamsolulions.com</p>
              <p>Phone: +91 70737 85326</p>
            </div>
          </section>

          {/* 18. Changes to Terms */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              18. Changes to Terms
            </h2>
            <p>
              We may update these terms at any time. We will notify you of significant changes by updating the "Last updated" date. Your continued use of the website constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* 19. Severability */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              19. Severability
            </h2>
            <p>
              If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* 20. Entire Agreement */}
          <section>
            <h2 className="text-3xl font-black mb-4 text-white">
              20. Entire Agreement
            </h2>
            <p>
              These terms of service, along with our Privacy Policy, constitute the entire agreement between you and Visam Solutions regarding your use of the website and services.
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

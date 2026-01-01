import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex projects can take 6-12 weeks. We provide a detailed timeline during the initial consultation.',
    category: 'Process',
    color: '#00F5A0',
  },
  {
    id: 2,
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing based on project scope. We provide custom quotes after understanding your requirements. Options include project-based pricing, hourly rates, and retainer packages.',
    category: 'Pricing',
    color: '#0EA5E9',
  },
  {
    id: 3,
    question: 'Do you provide support after delivery?',
    answer: 'Absolutely! We provide 3-6 months of free support with every project. After that, we offer affordable maintenance and support packages to keep your digital assets running smoothly.',
    category: 'Support',
    color: '#8B5CF6',
  },
  {
    id: 4,
    question: 'Can you work with existing systems?',
    answer: 'Yes! We can integrate with your existing tools, platforms, and databases. We specialize in seamless integration with WordPress, Shopify, custom APIs, and third-party services.',
    category: 'Technical',
    color: '#F59E0B',
  },
  {
    id: 5,
    question: 'What if I need revisions?',
    answer: 'Revisions are part of our process! We include multiple revision rounds in our packages. Our goal is your complete satisfaction, so we work until you\'re happy with the results.',
    category: 'Process',
    color: '#EC4899',
  },
  {
    id: 6,
    question: 'How do you handle confidentiality?',
    answer: 'We take confidentiality seriously. All projects are covered by NDA agreements. Your data and project details are completely protected and never shared with third parties.',
    category: 'Trust',
    color: '#10B981',
  },
  {
    id: 7,
    question: 'Can you help with SEO?',
    answer: 'Yes! SEO is built into all our web development projects. We optimize on-page elements, performance, mobile responsiveness, and provide SEO best practices documentation.',
    category: 'Services',
    color: '#06B6D4',
  },
  {
    id: 8,
    question: 'Do you provide training for content management?',
    answer: 'Absolutely! We provide comprehensive training on using your new website or system. Documentation, video tutorials, and live training sessions are included with every project.',
    category: 'Support',
    color: '#A855F7',
  },
];

const categories = ['All', 'Process', 'Pricing', 'Support', 'Technical', 'Services', 'Trust'];

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all"
    >
      <motion.button
        onClick={onClick}
        className="w-full p-6 flex items-start justify-between gap-4 text-left"
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-neon transition-colors">
            {faq.question}
          </h3>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-black"
            style={{
              backgroundColor: `${faq.color}20`,
              color: faq.color,
            }}
          >
            {faq.category}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown size={24} style={{ color: faq.color }} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState(new Set());

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-white/60">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-neon to-blue text-night shadow-lg'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
              data-hover
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={index}
              isOpen={openItems.has(faq.id)}
              onClick={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60 text-lg">
              No FAQs found in this category.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mt-16 p-8 rounded-3xl bg-white/5 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-white/60 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold shadow-lg hover:shadow-neon/50 transition-all"
            data-hover
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

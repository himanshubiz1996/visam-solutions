import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Pencil, Code, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We understand your business, goals, and target audience',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Creating beautiful, user-centered designs that convert',
      icon: Pencil,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      number: '03',
      title: 'Development',
      description: 'Building scalable, high-performance solutions',
      icon: Code,
      color: 'from-teal-500 to-green-500',
    },
    {
      number: '04',
      title: 'Launch',
      description: 'Deploying and optimizing for maximum impact',
      icon: Rocket,
      color: 'from-green-500 to-blue-500',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider block mb-4">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How We Work With <span className="text-blue-600">You</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-lg border-2 border-slate-200 hover:border-blue-600 transition-all h-full">
                    {/* Number Badge */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${step.color} text-white font-bold text-xl mb-6`}>
                      {step.number}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 mb-4">{step.description}</p>

                    {/* Icon */}
                    <Icon className="w-12 h-12 text-blue-600 opacity-20" />
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-lg">
                        →
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

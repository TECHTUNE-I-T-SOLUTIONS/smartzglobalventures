"use client"

import { motion } from "framer-motion"
import { Users, Package, Award, Zap } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Happy Customers",
    value: "10,000+",
    color: "text-blue-500",
    description: "Satisfied customers nationwide",
  },
  {
    icon: Package,
    label: "Products Sold",
    value: "50,000+",
    color: "text-green-500",
    description: "Quality products delivered",
  },
  {
    icon: Award,
    label: "Years Experience",
    value: "8+",
    color: "text-purple-500",
    description: "Serving the community",
  },
  {
    icon: Zap,
    label: "Fast Delivery",
    value: "24hrs",
    color: "text-yellow-500",
    description: "Average delivery time",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and customer satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-muted-foreground font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"

interface BlogCardProps {
  blog: {
    id: number
    title: string
    publishedDate: string
    status: string
  }
  index: number
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function BlogCard({ blog, index, onEdit, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * index,
        ease: "easeOut",
      }}
      whileHover={{ y: -2 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Blog Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            blog.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {blog.status}
        </span>
      </div>

      {/* Blog Title */}
      <h3 className="text-lg font-semibold text-black mb-3 line-clamp-2">{blog.title}</h3>

      {/* Published Date */}
      <p className="text-sm text-gray-500 mb-4">Published: {formatDate(blog.publishedDate)}</p>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          onClick={() => onEdit(blog.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Edit
        </motion.button>
        <motion.button
          onClick={() => onDelete(blog.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  )
}

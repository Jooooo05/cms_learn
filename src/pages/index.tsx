"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { formatDate } from "../utils/dateTimeFormat"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime?: string
}

export default function HomePage() {

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/blog")
      const data = await res.json()
      console.log("Fetched blog posts:", data.data)
      setPosts(data.data)
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fet data blog
    fetchBlogPosts();
  }, [])


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">DevBlog</h1>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-4">Latest Articles</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover insights, tutorials, and best practices for modern web development
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: "easeOut",
              }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center text-black font-medium hover:underline cursor-pointer"
              >
                Read More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  )
}


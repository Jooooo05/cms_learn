"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"


type Blog = {
  id: number
  title: string
  publishedDate: string
  status: string
}

// Mock blog data
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    publishedDate: "2024-01-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Building Modern UIs with Tailwind CSS",
    publishedDate: "2024-01-12",
    status: "Published",
  },
  {
    id: 3,
    title: "Framer Motion: Animations Made Simple",
    publishedDate: "2024-01-10",
    status: "Draft",
  },
  {
    id: 4,
    title: "TypeScript Best Practices for React",
    publishedDate: "2024-01-08",
    status: "Published",
  },
  {
    id: 5,
    title: "State Management in Modern React",
    publishedDate: "2024-01-05",
    status: "Published",
  },
  {
    id: 6,
    title: "Optimizing Web Performance",
    publishedDate: "2024-01-03",
    status: "Draft",
  },
]

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState(mockBlogs)
  const router = useRouter()
    const [loading, setLoading] = useState(true)

  useEffect(() => {

    checkAuth()
  }, [router])

  const checkAuth = async () => {
    try {
      const res = await fetch ("http://localhost:3001/auth/me", {
        method: "GET",
        credentials: "include",
      })
      //console.log("debuging auth check", res)
      if (!res.ok) {
        router.replace("/auth/login") // ⛔ jika belum login, langsung keluar
      } else {
        setLoading(false)
      }
      console.log("Auth response:", res)
    } catch (error) {
      console.error("Authentication check failed:", error)
      // Redirect to login page if not authenticated
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    // Handle logout logic
    // console.log("Logout clicked")
    try {
      await fetch ("http://localhost:3001/auth/logout", {
        method: "get",
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          Swal.fire("SweetAlert2 is working!");
        }
        router.push("/auth/login") // Redirect to login page after logout
      })
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const handleAddNew = () => {
    // Handle add new blog
    console.log("Add new blog clicked")
  }

  const handleEdit = (id: number) => {
    // Handle edit blog
    console.log("Edit blog:", id)
  }

  const handleDelete = (id: number) => {
    // Handle delete blog
    setBlogs(blogs.filter((blog) => blog.id !== id))
    console.log("Delete blog:", id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) return <p>Loading...</p>
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-200 bg-white sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-black border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <h2 className="text-3xl font-bold text-black mb-4 sm:mb-0">Blog Posts</h2>
          <motion.button
            onClick={handleAddNew}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Blog
          </motion.button>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
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
                  onClick={() => handleEdit(blog.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(blog.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
              <motion.button
                onClick={handleAddNew}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Blog
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

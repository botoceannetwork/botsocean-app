"use client"

import { useState, useEffect } from 'react'
import { Loader2, WrenchIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function MaintenanceScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <WrenchIcon className="mx-auto h-12 w-12 text-yellow-500 animate-bounce" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">We&apos;ll be back soon!</h1>
        <p className="mt-2 text-gray-600">
          We&apos;re currently performing some maintenance on our site. We&apos;ll be back up shortly. Thank you for your patience!
        </p>
        <Progress value={progress} className="mt-4" />
        <p className="mt-2 text-sm text-gray-500">Estimated completion: {Math.round(progress)}%</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Check Status
          </Button>
          <Button asChild>
            <a href="mailto:support@example.com">Contact Support</a>
          </Button>
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        © 2024 Your Company Name. All rights reserved.
      </p>
    </div>
  )
}
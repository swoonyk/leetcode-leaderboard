"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Loader2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ManageUsersForm from "./ManageUsersForm"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setMessage("Username is required")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const response = await fetch("/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Successfully added ${username} to the leaderboard!`)
        setMessageType("success")
        setUsername("")
        setTimeout(() => {
          onClose()
          window.location.reload()
        }, 1500)
      } else {
        setMessage(data.error || "Failed to add user")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Failed to add user. Please try again.")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setUsername("")
    setMessage("")
    setMessageType("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Users</DialogTitle>
          <DialogDescription>
            Add or remove users from the leaderboard. Access code is required.
          </DialogDescription>
        </DialogHeader>
        <ManageUsersForm />
      </DialogContent>
    </Dialog>
  )
}

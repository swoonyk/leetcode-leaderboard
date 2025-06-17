"use client"

import { useState } from "react"
import { addUser, removeUser } from "../lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserPlus, Trash2, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function ManageUsersForm() {
  const [accessCode, setAccessCode] = useState("")
  const [loading, setLoading] = useState(false)

  const [addUserUsername, setAddUserUsername] = useState("")
  const [removeUserUsername, setRemoveUserUsername] = useState("")

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) {
      toast.error("Access code is required.");
      return;
    }
    setLoading(true);
    try {
      const result = await addUser(addUserUsername, accessCode);
      toast.success(result.message);
      setAddUserUsername("");
      window.dispatchEvent(new Event('userAdded'));
    } catch (error: any) {
      toast.error(error.message || "Failed to add user.");
    }
    setLoading(false);
  }

  const handleRemoveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) {
      toast.error("Access code is required.");
      return;
    }
    setLoading(true);
    try {
      const result = await removeUser(removeUserUsername, accessCode);
      toast.success(result.message);
      setRemoveUserUsername("");
      window.dispatchEvent(new Event('userRemoved'));
    } catch (error: any) {
      toast.error(error.message || "Failed to remove user.");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="space-y-2 mb-4">
          <label htmlFor="access-code" className="text-sm font-medium">Access Code</label>
          <Input
            id="access-code"
            type="password"
            placeholder="Enter access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
      </div>
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">
            <UserPlus className="h-4 w-4 mr-2" /> Add User
          </TabsTrigger>
          <TabsTrigger value="remove">
            <Trash2 className="h-4 w-4 mr-2" /> Remove User
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <form onSubmit={handleAddUser} className="space-y-4 pt-4">
            <Input
              placeholder="Enter LeetCode username to add"
              value={addUserUsername}
              onChange={(e) => setAddUserUsername(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="remove">
          <form onSubmit={handleRemoveUser} className="space-y-4 pt-4">
            <Input
              placeholder="Enter LeetCode username to remove"
              value={removeUserUsername}
              onChange={(e) => setRemoveUserUsername(e.target.value)}
            />
            <Button type="submit" variant="destructive" className="w-full" disabled={loading}>
              {loading ? "Removing..." : "Remove User"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
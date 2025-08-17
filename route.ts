import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const usersFilePath = path.join(process.cwd(), "data", "users.json")

// POST /api/auth/login - Check user credentials
export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json()

    if (!name || !password) {
      return NextResponse.json({ error: "Name and password required" }, { status: 400 })
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"))

    if (name in users) {
      if (users[name].password === password) {
        // Password matched - successful login
        return NextResponse.json(
          {
            status: "success",
            user: { name: users[name].name, created_on: users[name].created_on },
          },
          { status: 200 },
        )
      } else {
        // Password doesn't match
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
      }
    } else {
      // User doesn't exist
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

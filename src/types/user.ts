export type UserStatus = 'Active' | 'Pending' | 'Suspended'

export type UserRecord = {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Analyst'
  status: UserStatus
  department: string
  lastActive: string
}
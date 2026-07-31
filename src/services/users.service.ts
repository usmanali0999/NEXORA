import type { UserRecord } from '../types/user'

const usersMock: UserRecord[] = [
  {
    id: 'usr-101',
    name: 'Ali Khan',
    email: 'ali.khan@nexora.com',
    role: 'Admin',
    status: 'Active',
    department: 'Operations',
    lastActive: '2 min ago',
  },
  {
    id: 'usr-102',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@nexora.com',
    role: 'Manager',
    status: 'Active',
    department: 'Growth',
    lastActive: '8 min ago',
  },
  {
    id: 'usr-103',
    name: 'Hassan Raza',
    email: 'hassan.raza@nexora.com',
    role: 'Analyst',
    status: 'Pending',
    department: 'Data',
    lastActive: '32 min ago',
  },
  {
    id: 'usr-104',
    name: 'Areeba Noor',
    email: 'areeba.noor@nexora.com',
    role: 'Analyst',
    status: 'Suspended',
    department: 'Security',
    lastActive: '1 day ago',
  },
]

export async function getUsers(): Promise<UserRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersMock)
    }, 900)
  })
}
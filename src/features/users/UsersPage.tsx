function UsersPage() {
  const users = [
    { name: 'Ali Khan', role: 'Admin', status: 'Active' },
    { name: 'Sara Ahmed', role: 'Manager', status: 'Active' },
    { name: 'Hassan Raza', role: 'Analyst', status: 'Pending' },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="mt-2 text-zinc-400">
        Team management and role-based access overview.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 text-sm text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.name} className="border-t border-white/10">
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
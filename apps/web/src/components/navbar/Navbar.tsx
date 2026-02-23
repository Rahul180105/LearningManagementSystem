import ProfileDropdown from "@/components/ProfileDropdown"

export default function Navbar() {
  return (
    <div className="h-14 border-b bg-white flex items-center justify-between px-6">
      <div className="font-semibold text-lg">
        LMS Dashboard
      </div>

      <ProfileDropdown />
    </div>
  )
}
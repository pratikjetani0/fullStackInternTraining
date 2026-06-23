import { User, Mail, Shield } from "lucide-react";

import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-slate-100
            "
          >
            <User size={36} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{data?.name}</h1>

            <p className="text-slate-500">Account Information</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail size={18} />

            <div>
              <p className="text-sm text-slate-500">Email</p>

              <p>{data?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield size={18} />

            <div>
              <p className="text-sm text-slate-500">Role</p>

              <p>{data?.role}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">Joined</p>

            <p>{new Date(data?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

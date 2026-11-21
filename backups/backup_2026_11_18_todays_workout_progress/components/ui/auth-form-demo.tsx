"use client";

import AuthForm from "@/components/ui/auth-form";
import { Globe, Mail } from "lucide-react";
import { useState } from "react";

export default function Demo() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = () => {
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="flex w-full items-center justify-center p-8">
      <AuthForm
        mode={mode}
        onModeChange={setMode}
        onSubmit={handleSubmit}
        status={status}
        providers={[
          {
            id: "google",
            label: "Google",
            icon: <Globe className="h-4 w-4" />,
          },
          {
            id: "email",
            label: "Email link",
            icon: <Mail className="h-4 w-4" />,
          },
        ]}
      />
    </div>
  );
}

import SignUpForm from "./SignUpForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#121200] justify-center ">
      <div className="space-y-4">
        {children}
        <SignUpForm />
      </div>
    </div>
  );
}

import UserProvider from "@/components/auth/affiliate_auth_context";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}

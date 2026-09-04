import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="pt-6">
          {children}
        </main>

      </body>
    </html>
  );
}
export const metadata = {
  title: 'Admin Portal | RoughClick Digital',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminBlogLayout({ children }) {
  return children;
}

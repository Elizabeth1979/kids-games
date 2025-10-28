import { redirect } from 'next/navigation';

// Redirect root to Hebrew locale
export default function RootPage() {
  redirect('/he');
}

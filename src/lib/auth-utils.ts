import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'admin') {
    redirect('/auth/unauthorized');
  }

  return session;
}
'use client'

import {useClerk} from '@clerk/nextjs'
import {useRouter} from '@/i18n/routing'

export function useLogout() {
  const {signOut} = useClerk()
  const router = useRouter()

  const logout = async () => {
    await signOut()

    router.push('/')
  }

  return logout
}
type ButtonSkeletonProps = {
  size?: 'sm' | 'lg'
  variant?: 'outline' | 'primary'
}

export default function ButtonSkeleton({
  size = 'sm',
  variant = 'outline',
}: ButtonSkeletonProps) {
  const sizeClasses = {
    sm: 'h-10 w-24 rounded-xl',
    lg: 'h-[56px] w-[220px] rounded-2xl',
  }

  const variantClasses = {
    outline: 'from-blue-500/10 via-blue-400/20 to-blue-500/10 shadow-blue-500/10',
    primary: 'from-blue-500/20 via-blue-400/30 to-blue-500/20 shadow-blue-500/20',
  }

  return (
    <div
      className={[
        sizeClasses[size],
        variantClasses[variant],
        'animate-pulse border border-blue-400/40 bg-gradient-to-r shadow-lg',
      ].join(' ')}
    />
  )
}
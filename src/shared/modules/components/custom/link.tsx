import Link, { LinkProps } from 'next/link';
import { useLocale } from 'next-intl';

interface LocalizedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomLink({
  children,
  className,
  ...props
}: LocalizedLinkProps) {
  const locale = useLocale();

  const localizedHref =
    typeof props.href === 'string' && !props.href.startsWith(`/${locale}`)
      ? `/${locale}${props.href}`
      : props.href;

  return (
    <Link {...props} href={localizedHref} className={className}>
      {children}
    </Link>
  );
}

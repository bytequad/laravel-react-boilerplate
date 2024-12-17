import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconMenu } from '@tabler/icons-react';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
    links: {
        title: string;
        href: string;
        isActive: boolean;
        disabled?: boolean;
    }[];
}

export function TopNav({ className, links, ...props }: TopNavProps) {
    return (
        <>
            <div className="md:hidden">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                            <IconMenu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                        {links.map(({ title, href, isActive, disabled }) => (
                            <DropdownMenuItem key={`${title}-${href}`} asChild>
                                <Link
                                    href={route(href)}
                                    className={
                                        !isActive ? 'text-muted-foreground' : ''
                                    }
                                    disabled={disabled}
                                >
                                    {title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <nav
                className={cn(
                    'hidden items-center space-x-4 md:flex lg:space-x-6',
                    className,
                )}
                {...props}
            >
                {links.map(({ title, href, isActive, disabled }) => (
                    <Link
                        key={`${title}-${href}`}
                        href={route(href)}
                        disabled={disabled}
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`}
                    >
                        {title}
                    </Link>
                ))}
            </nav>
        </>
    );
}
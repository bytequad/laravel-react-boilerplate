import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useSearch } from '@/context/search-context';
import { useTheme } from '@/context/theme-context';
import {
    IconArrowRightDashed,
    IconDeviceLaptop,
    IconMoon,
    IconSun,
} from '@tabler/icons-react';
import React from 'react';
import { sidebarData } from '../core-layouts/data/sidebar-data';
import { ScrollArea } from './scroll-area';

export function CommandMenu() {
    const { setTheme } = useTheme();
    const { open, setOpen } = useSearch();

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen],
    );

    return (
        <CommandDialog modal open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <ScrollArea type="hover" className="h-72 pr-1">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sidebarData.navGroups.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items.map((navItem, i) => {
                                if (navItem.url)
                                    return (
                                        <CommandItem
                                            key={`${navItem.url}-${i}`}
                                            value={navItem.title}
                                            onSelect={() => {
                                                runCommand(() =>
                                                    route(navItem.url),
                                                );
                                            }}
                                        >
                                            <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                                            </div>
                                            {navItem.title}
                                        </CommandItem>
                                    );

                                return navItem.items?.map((subItem, i) => (
                                    <CommandItem
                                        key={`${subItem.url}-${i}`}
                                        value={subItem.title}
                                        onSelect={() => {
                                            runCommand(() =>
                                                route(subItem.url),
                                            );
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                                        </div>
                                        {subItem.title}
                                    </CommandItem>
                                ));
                            })}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme('light'))}
                        >
                            <IconSun /> <span>Light</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => setTheme('dark'))}
                        >
                            <IconMoon className="scale-90" />
                            <span>Dark</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() =>
                                runCommand(() => setTheme('system'))
                            }
                        >
                            <IconDeviceLaptop />
                            <span>System</span>
                        </CommandItem>
                    </CommandGroup>
                </ScrollArea>
            </CommandList>
        </CommandDialog>
    );
}
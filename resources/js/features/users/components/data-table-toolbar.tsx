import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router, usePage } from '@inertiajs/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import pickBy from 'lodash/pickBy';
import { useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import { DataTableViewOptions } from './data-table-view-options';
interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const { search } = usePage<{ search: string }>().props;

    const [values, setValues] = useState({
        search: search || '',
    });
    const prevValues = usePrevious(values);
    useEffect(() => {
        // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : {};

            router.get(route(route().current() as string), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    function reset() {
        setValues({
            search: '',
        });
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
        const name = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    }
    const isFiltered = values.search;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Filter tasks..."
                    value={values.search}
                    name="search"
                    onChange={handleChange}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={reset}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}

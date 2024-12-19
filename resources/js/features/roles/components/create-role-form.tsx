import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function CreateRoleForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        display_name: '',
        is_active: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('register'), {
        //     onFinish: () => reset('password', 'password_confirmation'),
        // });
    };
    const permissions = [
        { module: 'User Management' },
        { module: 'Content Management' },
        { module: 'Financial Management' },
        { module: 'Reporting' },
        { module: 'Payroll' },
        { module: 'Disputes Management' },
    ];
    return (
        <Card className="p-6">
            <div className={cn('grid gap-6')}>
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <InputLabel
                                    htmlFor="display_name"
                                    value="Display name"
                                />

                                <TextInput
                                    id="display_name"
                                    name="display_name"
                                    value={data.display_name}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('display_name', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.display_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="space-y-1">
                                <InputLabel
                                    htmlFor="is_active"
                                    value="Status"
                                />
                                <Switch
                                    id="is_active"
                                    name="is_active"
                                    className="mt-1 block"
                                    value={data.is_active ? 'on' : 'off'}
                                    onCheckedChange={(isChecked) => {
                                        setData('is_active', isChecked);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            {/* Header */}
                            <div className="flex flex-col">
                                <InputLabel value="Role Permissions" />
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                                <InputLabel value="All access" />
                                <span className="text-sm text-gray-400">
                                    (i)
                                </span>
                                <Checkbox id="all_access" />
                            </div>
                            {/* Table */}
                            <Table className="mt-4">
                                <TableHeader>
                                    <TableRow className="border-dashed">
                                        <TableHead className="">
                                            Module
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Read
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Write
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Create
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission, index) => (
                                        <TableRow
                                            className="border-dashed"
                                            key={index}
                                        >
                                            <TableCell className="">
                                                {permission.module}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <Button
                                className="justify-center"
                                disabled={processing}
                            >
                                Save changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default CreateRoleForm;

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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { usePermissions } from '../context/permissions-context';

function CreateRoleForm({ initialData }: { initialData?: any }) {
    const permissions = usePermissions();
    const isEdit = !!initialData;
    const assignedPermissions: Record<string, string[]> = {};

    if (initialData) {
        initialData.permissions.forEach(
            (permission: { module_name: string; id: string }) => {
                if (assignedPermissions[permission.module_name]) {
                    assignedPermissions[permission.module_name].push(
                        permission.id,
                    );
                } else {
                    assignedPermissions[permission.module_name] = [
                        permission.id,
                    ];
                }
            },
        );
    }
    const { data, setData, post, put, processing, errors } = useForm<{
        name: string;
        display_name: string;
        is_active: boolean;
        description: string;
        permissions: Record<string, string[]>; // Changed to store permission IDs as arrays
    }>(
        isEdit
            ? {
                  name: initialData.name,
                  display_name: initialData.display_name,
                  description: initialData.description,
                  is_active: initialData.is_active,
                  permissions: assignedPermissions,
              }
            : {
                  name: '',
                  display_name: '',
                  description: '',
                  is_active: false,
                  permissions: {},
              },
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.roles.update', initialData.id), {
                onSuccess(res) {
                    toast({
                        title: 'Role has been updated!',
                    });
                },
            });
        } else {
            post(route('admin.roles.store'), {
                onSuccess(res) {
                    toast({
                        title: 'Role has been created!',
                    });
                },
            });
        }
    };

    const handlePermissionChange = (module: string, permissionId: string) => {
        setData((prevData) => {
            const updatedPermissions = {
                ...prevData.permissions,
                [module]: prevData.permissions[module]
                    ? prevData.permissions[module].includes(permissionId)
                        ? prevData.permissions[module].filter(
                              (id) => id !== permissionId,
                          )
                        : [...prevData.permissions[module], permissionId]
                    : [permissionId],
            };

            return { ...prevData, permissions: updatedPermissions };
        });
    };

    const handleSelectAll = (module: string) => {
        const allChecked =
            Object.values(data.permissions[module] || {}).length ===
            permissions[module].length;

        const updatedPermissions = permissions[module].reduce(
            (acc, permission) => {
                if (!allChecked) {
                    acc.push(permission.id); // Store permission ID
                }
                return acc;
            },
            [] as string[],
        );

        setData((prevData) => ({
            ...prevData,
            permissions: {
                ...prevData.permissions,
                [module]: updatedPermissions,
            },
        }));
    };

    const handleAllAccess = (isChecked: boolean) => {
        const updatedPermissions = modules.reduce(
            (acc, moduleName) => {
                acc[moduleName] = permissions[moduleName].reduce(
                    (perms, perm) => {
                        if (isChecked) {
                            perms.push(perm.id); // Store permission ID
                        }
                        return perms;
                    },
                    [] as string[],
                );
                return acc;
            },
            {} as Record<string, string[]>, // Changed to array of permission IDs
        );

        setData((prevData) => ({
            ...prevData,
            permissions: updatedPermissions,
        }));
    };

    const modules = Object.keys(permissions);
    const isModulePermissionsChecked = (moduleName: string) => {
        // Get the permissions for the given module, defaulting to an empty array if not available
        const permissionsList = data.permissions[moduleName] || [];

        // Check if there are any permissions for the module and if all permissions are selected
        const allPermissionsChecked = permissions[moduleName].every(
            (permission) => permissionsList.includes(permission.id),
        );

        return allPermissionsChecked;
    };

    const isAllAccess = modules.every((moduleName) =>
        permissions[moduleName].every((permission) =>
            (data.permissions[moduleName] || []).includes(permission.id),
        ),
    );

    return (
        <Card className="p-6">
            <form onSubmit={submit}>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-4 gap-6">
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
                            />
                            <InputError
                                message={errors.display_name}
                                className="mt-2"
                            />
                        </div>

                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="space-y-1">
                            <InputLabel htmlFor="is_active" value="Status" />
                            <Switch
                                id="is_active"
                                name="is_active"
                                className="mt-1 block"
                                value={data.is_active ? 'on' : 'off'}
                                onCheckedChange={(isChecked) =>
                                    setData('is_active', isChecked)
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col">
                            <InputLabel value="Role Permissions" />
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                            <InputLabel
                                value="All access"
                                htmlFor="all_access"
                            />
                            <Checkbox
                                id="all_access"
                                checked={isAllAccess}
                                onCheckedChange={(isChecked) =>
                                    handleAllAccess(isChecked)
                                }
                            />
                        </div>

                        <Table className="mt-4">
                            <TableHeader>
                                <TableRow className="border-dashed">
                                    <TableHead>Module</TableHead>
                                    <TableHead className="text-center">
                                        All
                                    </TableHead>
                                    {['Read', 'Create', 'Update', 'Delete'].map(
                                        (action) => (
                                            <TableHead
                                                className="text-center"
                                                key={action}
                                            >
                                                {action}
                                            </TableHead>
                                        ),
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {modules.map((moduleName) => (
                                    <TableRow
                                        className="border-dashed"
                                        key={moduleName}
                                    >
                                        <TableCell>{moduleName}</TableCell>
                                        <TableCell className="text-center">
                                            <Checkbox
                                                checked={isModulePermissionsChecked(
                                                    moduleName,
                                                )}
                                                onCheckedChange={() =>
                                                    handleSelectAll(moduleName)
                                                }
                                            />
                                        </TableCell>
                                        {permissions[moduleName].map(
                                            (permission) => (
                                                <TableCell
                                                    className="text-center"
                                                    key={permission.id}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            data.permissions[
                                                                moduleName
                                                            ]?.includes(
                                                                permission.id,
                                                            ) || false
                                                        }
                                                        onCheckedChange={() =>
                                                            handlePermissionChange(
                                                                moduleName,
                                                                permission.id,
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                            ),
                                        )}
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
        </Card>
    );
}

export default CreateRoleForm;

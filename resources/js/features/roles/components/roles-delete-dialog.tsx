'use client';

import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { WEB_ROUTES } from '@/config/web.routes';
import { toast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { User } from '../data/schema';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: User;
}

export function RolesDeleteDialog({ open, onOpenChange, currentRow }: Props) {
    const handleDelete = () => {
        router.visit(route(WEB_ROUTES.roles_destroy, currentRow.id), {
            method: 'delete',
            onFinish() {
                toast({
                    title: 'User has been deleted!',
                });
                onOpenChange(false);
            },
        });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            title={
                <span className="text-destructive">
                    <IconAlertTriangle
                        className="mr-1 inline-block stroke-destructive"
                        size={18}
                    />{' '}
                    Delete User
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Are you sure you want to delete{' '}
                        <span className="font-bold">{currentRow.name}</span>
                        ?
                        <br />
                        This action will permanently remove the user.
                    </p>

                    {/* <Label className="my-2">
                        Username:
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter username to confirm deletion."
                        />
                    </Label> */}

                    {/* <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Please be carefull, this operation can not be rolled
                            back.
                        </AlertDescription>
                    </Alert> */}
                </div>
            }
            confirmText="Delete"
            destructive
        />
    );
}

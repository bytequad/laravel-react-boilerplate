import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { useForm } from 'react-hook-form';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import { MultiSelect } from '@/components/ui/multiselect';
import { PasswordInput } from '@/components/ui/password-input';
import { WEB_ROUTES } from '@/config/web.routes';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { z } from 'zod';
import { Admin } from '../admins.type';
import { useAdminsContext } from '../context/admins-context';

const formSchema = z
    .object({
        name: z.string().min(1, { message: 'Name is required.' }),
        email: z
            .string()
            .min(1, { message: 'Email is required.' })
            .email({ message: 'Email must be a valid email address.' }),
        password: z.string().min(1, { message: 'Password is required.' }),
        password_confirmation: z
            .string()
            .min(1, { message: 'Password confirmation is required.' }),
        role: z
            .array(z.string())
            .nonempty({ message: 'At least one role is required.' }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match.",
        path: ['password_confirmation'],
    });

type AdminForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: Admin;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
const frameworksList = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
];

export function AdminsActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    const { roles } = useAdminsContext();
    // const form = useForm<AdminForm>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: isEdit
    //         ? {
    //               ...currentRow,
    //               password: '',
    //               confirmPassword: '',
    //               isEdit,
    //           }
    //         : {
    //               firstName: '',
    //               lastName: '',
    //               adminname: '',
    //               email: '',
    //               role: '',
    //               phoneNumber: '',
    //               password: '',
    //               confirmPassword: '',
    //               isEdit,
    //           },
    // });

    const { data, setData, post, processing, put, errors, reset, setError } =
        useForm<AdminForm>(
            !isEdit
                ? {
                      name: '',
                      email: '',
                      password: '',
                      password_confirmation: '',
                      role: [],
                  }
                : {
                      name: currentRow.name,
                      email: currentRow.email,
                      password: '',
                      password_confirmation: '',
                      role: currentRow?.roles.map((i) => i.id.toString()) || '',
                  },
        );

    const handleValidationErrors = (errors) => {
        const errorMap = {};

        // Iterate through the errors and map each path to its corresponding message
        errors.forEach((error) => {
            const field = error.path[0]; // Get the field name from the path
            if (!errorMap[field]) {
                errorMap[field] = error.message; // Map the field to its message
            }
        });

        // Dynamically set the errors
        setError(errorMap);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route(WEB_ROUTES.admins_update, currentRow.id), {
                onFinish: () => {
                    toast({
                        title: 'Admin updated!',
                    });
                    onOpenChange(false);
                    return reset(
                        'password',
                        'name',
                        'email',
                        'password_confirmation',
                    );
                },
            });
        } else {
            // try {
            //     // Validate data
            //     console.log('🚀 ~ AdminsActionDialog ~ data:', data);
            //     const result = formSchema.parse(data);
            //     console.log('Validation succeeded:', result);
            // } catch (e) {
            //     if (e instanceof z.ZodError) {
            //         console.error('Validation failed:', e.errors);
            //         handleValidationErrors(e.errors);
            //     }
            // }
            post(route(WEB_ROUTES.admins_store), {
                onSuccess: () => {
                    reset(
                        'password',
                        'name',
                        'email',
                        'password_confirmation',
                        'role',
                    );
                    toast({
                        title: 'Admin created!',
                    });
                    onOpenChange(false);
                },
            });
        }
    };
    useEffect(() => {
        return () => {
            reset('password', 'name', 'email', 'password_confirmation', 'role');
        };
    }, []);

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                onOpenChange(state);
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="text-left">
                    <DialogTitle>
                        {isEdit ? 'Edit Admin' : 'Add New Admin'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Update the admin here. '
                            : 'Create new admin here. '}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
                    {/* <Form {...form}> */}
                    <form
                        id="admin-form"
                        onSubmit={submit}
                        className="space-y-4 p-0.5"
                    >
                        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                            <InputLabel
                                value="First Name"
                                className="col-span-2 text-right"
                            />
                            {/* <Slot id={'formItemId'} className='col-span-4'> */}
                            <TextInput
                                name="name"
                                value={data.name}
                                className="col-span-4"
                                autoComplete="name"
                                placeholder="John doe"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {/* </Slot> */}
                            <InputError
                                message={errors.name}
                                className="col-span-4 col-start-3"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                            <InputLabel
                                value="Email"
                                className="col-span-2 text-right"
                            />
                            {/* <Slot id={'formItemId'} className='col-span-4'> */}
                            <TextInput
                                name="email"
                                value={data.email}
                                className="col-span-4"
                                autoComplete="email"
                                placeholder="name@example.com"
                                onBlur={(e) => {}}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            {/* </Slot> */}
                            <InputError
                                message={errors.email}
                                className="col-span-4 col-start-3"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                            <InputLabel
                                value="Role"
                                className="col-span-2 text-right"
                            />
                            {/* <Slot id={'formItemId'} className='col-span-4'> */}
                            {/* <Select
                                onValueChange={(e) => {
                                    console.log(
                                        '🚀 ~ AdminsActionDialog ~ e:',
                                        e,
                                    );
                                    setData('role', e);
                                }}
                                // defaultValue={data.role}
                            >
                                <SelectTrigger
                                    className="col-span-4 w-full"
                                    value={data.role}
                                >
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={role.id.toString()}
                                        >
                                            {role.display_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */}
                            <MultiSelect
                                className="col-span-4 w-full"
                                options={roles.map((role) => ({
                                    label: role.display_name || '',
                                    value: role.id.toString(),
                                }))}
                                onValueChange={(val) => {
                                    // console.log('🚀 ~ val:', val);
                                    setData('role', val);
                                }}
                                value={data.role}
                                defaultValue={data.role}
                                placeholder="Select options"
                                variant="inverted"
                                maxCount={3}
                            />

                            {/* </Slot> */}
                            <InputError
                                message={errors.role}
                                className="col-span-4 col-start-3"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                            <InputLabel
                                value="Password"
                                className="col-span-2 text-right"
                            />
                            {/* <Slot id={'formItemId'} className='col-span-4'> */}
                            <PasswordInput
                                placeholder="********"
                                name="password"
                                value={data.password}
                                className="col-span-4"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            {/* </Slot> */}
                            <InputError
                                message={errors.password}
                                className="col-span-4 col-start-3"
                            />
                        </div>
                        <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="col-span-2 text-right"
                            />
                            {/* <Slot id={'formItemId'} className='col-span-4'> */}
                            <PasswordInput
                                placeholder="********"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="col-span-4"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                            {/* </Slot> */}
                            <InputError
                                message={errors.password_confirmation}
                                className="col-span-4 col-start-3"
                            />
                        </div>
                        {/* <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                                        <FormLabel className="col-span-2 text-right">
                                            First Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John"
                                                className="col-span-4"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            /> */}
                    </form>
                </ScrollArea>
                <DialogFooter>
                    <Button
                        type="button"
                        variant={'outline'}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form="admin-form">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

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
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { z } from 'zod';
import { User } from '../data/schema';

const formSchema = z
    .object({
        firstName: z.string().min(1, { message: 'First Name is required.' }),
        lastName: z.string().min(1, { message: 'Last Name is required.' }),
        username: z.string().min(1, { message: 'Username is required.' }),
        phoneNumber: z
            .string()
            .min(1, { message: 'Phone number is required.' }),
        email: z
            .string()
            .min(1, { message: 'Email is required.' })
            .email({ message: 'Email is invalid.' }),
        password: z.string().transform((pwd) => pwd.trim()),
        role: z.string().min(1, { message: 'Role is required.' }),
        confirmPassword: z.string().transform((pwd) => pwd.trim()),
        isEdit: z.boolean(),
    })
    .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
        if (!isEdit || (isEdit && password !== '')) {
            if (password === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password is required.',
                    path: ['password'],
                });
            }

            if (password.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must be at least 8 characters long.',
                    path: ['password'],
                });
            }

            if (!password.match(/[a-z]/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        'Password must contain at least one lowercase letter.',
                    path: ['password'],
                });
            }

            if (!password.match(/\d/)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must contain at least one number.',
                    path: ['password'],
                });
            }

            if (password !== confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Passwords don't match.",
                    path: ['confirmPassword'],
                });
            }
        }
    });
type UserForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    // const form = useForm<UserForm>({
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
    //               username: '',
    //               email: '',
    //               role: '',
    //               phoneNumber: '',
    //               password: '',
    //               confirmPassword: '',
    //               isEdit,
    //           },
    // });

    const { data, setData, post, processing, put, errors, reset } = useForm(
        !isEdit
            ? {
                  name: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
              }
            : {
                  name: currentRow.name,
                  email: currentRow.email,
                  password: '',
                  password_confirmation: '',
              },
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('users.update', currentRow.id), {
                onFinish: () => {
                    toast({
                        title: 'User updated!',
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
            post(route('users.store'), {
                onFinish: () => {
                    reset('password', 'name', 'email', 'password_confirmation');
                    toast({
                        title: 'User created!',
                    });
                    onOpenChange(false);
                },
            });
        }
    };

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
                        {isEdit ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Update the user here. '
                            : 'Create new user here. '}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
                    {/* <Form {...form}> */}
                    <form
                        id="user-form"
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
                    <Button type="button" variant={'outline'} onClick={()=> onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" form="user-form">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

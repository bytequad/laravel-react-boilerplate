import InputError from '@/components/InputError';
import TextInput from '@/components/TextInput';
import { Card } from '@/components/ui/card';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import { cn } from '@/lib/utils';
import { FormEventHandler } from 'react';
import { WEB_BE_ROUTES } from '@/config/web.be.routes';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route(WEB_BE_ROUTES.password_email));
    };

    return (
        <GuestLayout>
            <Card className="p-6">
                <div className="mb-2 flex flex-col space-y-2 text-left">
                    <Head title="Forgot Password" />

                    <h1 className="text-md font-semibold tracking-tight">
                        Forgot Password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your registered email and <br /> we will send you
                        a link to reset your password.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}
                </div>
                <div className={cn('grid gap-6')}>
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <div className="space-y-1">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="mt-2 justify-center"
                                disabled={processing}
                            >
                                Continue
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </Card>
        </GuestLayout>
    );
}

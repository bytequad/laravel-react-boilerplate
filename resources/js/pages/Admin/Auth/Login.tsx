import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Card } from '@/components/ui/card';
import { PasswordInput } from '@/components/ui/password-input';
import { PAGE_ROUTES } from '@/config/page.routes';
import GuestLayout from '@/layouts/GuestLayout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route(PAGE_ROUTES.login), {
            onFinish: () => reset('password'),
        });
    };
    return (
        <GuestLayout>
            <Card className="p-6">
                <div className="flex flex-col space-y-2 text-left">
                    <Head title="Log in" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below <br />
                        to log into your account
                    </p>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
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
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <Link
                                        href={route(
                                            PAGE_ROUTES.password_request,
                                        )}
                                        className="text-sm font-medium text-muted-foreground hover:opacity-75"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <PasswordInput
                                    placeholder="********"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                className="mt-2 justify-center"
                                disabled={processing}
                            >
                                Login
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                    By clicking login, you agree to our{' '}
                    <a
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </Card>
        </GuestLayout>
    );
}

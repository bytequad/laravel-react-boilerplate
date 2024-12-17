import PrimaryButton from '@/components/PrimaryButton';
import { Card } from '@/components/ui/card';
import GuestLayout from '@/layouts/GuestLayout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <Card className="p-6">
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you?
                    <br />
                    <br /> If you didn't receive the email, we will gladly send
                    you another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}
                <div className={cn('grid gap-6')}>
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <div className="mt-4 flex items-center justify-between">
                                <PrimaryButton disabled={processing}>
                                    Resend Verification Email
                                </PrimaryButton>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Card>
        </GuestLayout>
    );
}
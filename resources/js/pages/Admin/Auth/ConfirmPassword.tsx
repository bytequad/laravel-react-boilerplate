import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import { Card } from '@/components/ui/card';
import { PasswordInput } from '@/components/ui/password-input';
import { PAGE_ROUTES } from '@/config/page.routes';
import GuestLayout from '@/layouts/GuestLayout';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route(PAGE_ROUTES.password_confirm), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Card className="p-6">
                <div className="flex flex-col space-y-2 text-left">
                    <Head title="Confirm Password" />
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </div>
                </div>

                <div className={cn('grid gap-6')}>
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <div className="space-y-1">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
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
                                Confirm
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Card>
        </GuestLayout>
    );
}

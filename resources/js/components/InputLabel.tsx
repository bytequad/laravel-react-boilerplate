import { LabelHTMLAttributes } from 'react';
import { Label } from './ui/label';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <Label
            {...props}
            className={className}
            // className={cn(error && 'text-destructive', className)}
        >
            {value ? value : children}
        </Label>
    );
}

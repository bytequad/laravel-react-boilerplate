import React, { createContext, ReactNode, useContext } from 'react';
import { PermissionsGrouped } from '../roles.type';


// Create the context
const PermissionsContext = createContext<PermissionsGrouped | undefined>(
    undefined,
);

// Define the provider's props type
interface PermissionsProviderProps {
    permissions: PermissionsGrouped;
    children: ReactNode;
}

// Context Provider
export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({
    permissions,
    children,
}) => {
    return (
        <PermissionsContext.Provider value={permissions}>
            {children}
        </PermissionsContext.Provider>
    );
};

// Custom Hook for accessing permissions
export const usePermissions = (): PermissionsGrouped => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error(
            'usePermissions must be used within a PermissionsProvider',
        );
    }
    return context;
};

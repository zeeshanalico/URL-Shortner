'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useRouteLoader = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const pathname = usePathname(); // This hook helps to track route changes

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300); 

        return () => clearTimeout(timer);
    }, [pathname]);

    return loading;
};

export default useRouteLoader;

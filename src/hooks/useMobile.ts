import { useEffect, useState } from "react";


const useIsMobile = () : boolean => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    useEffect(() => {

        const handler = () => setIsMobile(window.innerWidth < 800);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);

    }, []);

    return isMobile;
}

export default useIsMobile;
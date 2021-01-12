import { useRouter } from "next/router";
import { useEffect } from "react";
import globalHook from "../hooks/global.hook";

export default function Home() {
    const { useGlobalState, logout } = globalHook();
    const { user } = useGlobalState();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            logout();
            typeof window !== "undefined" && router.push("/");
        }
    }, [user]);
    return null;
}

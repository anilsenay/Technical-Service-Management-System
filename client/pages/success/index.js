import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

import styles from './success.module.scss';

export default function Success() {
    const router = useRouter()
    return (
        <Layout title="Success">
            <div>
                <h3>Your request created succesfully!</h3>
                <div className={styles.button} onClick={() => { router.back() }}>Go Back Previous Page</div>
            </div>
        </Layout>
    );
}

import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import Auth from "../Apis/Base";

export const ProtectedAdmin = () => {

    return (
        <>
            {Auth.auth === 'true' && Auth.admin === 'true'
                ? <Outlet/> :

                (
                    <Navigate
                        to={{
                            pathname: "/signUp"
                        }}
                    />

                )
            }

        </>
    );
};

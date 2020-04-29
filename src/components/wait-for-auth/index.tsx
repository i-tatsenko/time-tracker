import {inject, observer} from "mobx-react"
import {AuthStore} from "../../store/auth";
import {CircularProgress} from "@material-ui/core";
import React from "react";

interface Props {
    authStore?: AuthStore,
    children?: any,
}

const Root: React.FC<Props> = ({authStore, children}: Props) => {
    if (authStore?.updating) {
        return (<CircularProgress color="secondary"/>)
    }
    return (
        <div>{children}</div>
    )
}

export default inject('authStore')(observer(Root))
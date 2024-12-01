import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useUser } from "../../contexts/useUser"

export default function ProtectedRoute() {
    const { user } = useUser();

    if(!user || !user.token) return <Navigate to="/login" />
    return <Outlet />
}


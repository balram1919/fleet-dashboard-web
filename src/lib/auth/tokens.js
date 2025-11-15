"use client";

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};

export const refreshToken = async () => {
    try {
        const token = getAccessToken()
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/refresh-token", { token: token });
        const data = await res.json();

        if (data?.accessToken) {
            setAccessToken(data.accessToken);
            return data.accessToken;
        }
        return null;
    } catch (e) {
        logout();
        window.location.href = "/login"
        return null;
    }
};
